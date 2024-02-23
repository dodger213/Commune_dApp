import os
import requests
from django.http import JsonResponse

from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import generics
from rest_framework.exceptions import NotFound

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

# import mysql.connector

from backend.data_analysis.models import (
    TransactionRecordModel,
)
from backend.data_analysis.serializers import (
    TransactionRecordSerializer,
)


def send_mail(email, content):
    email_params = {
        "apikey": os.getenv("MAIL_KEY"),
        "from": email,
        "to": "tunki1201@gmail.com",
        "subject": "This is the content",
        "body": f"{content}",
        "isTransactional": True,
    }

    response = requests.post(
        "https://api.elasticemail.com/v2/email/send",
        data=email_params,
    )
    return response

class SaveTransaction(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        payType = request.data.get("payType")
        amount = request.data.get("amount")
        destinationAddress = request.data.get("destinationAddress")
        txHash = request.data.get("txHash")
        # Create a new TransactionRecordModel instance and save it
        try:
            transaction_record = TransactionRecordModel.objects.create(
                payType=payType,
                amount=amount,
                destinationAddress=destinationAddress,
                txHash=txHash,
            )

            saved_transactionRecord = TransactionRecordSerializer(transaction_record)

            return Response({"message": "Transaction saved successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
