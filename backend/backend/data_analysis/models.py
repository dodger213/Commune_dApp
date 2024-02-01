from django.db import models
from django.utils.translation import gettext_lazy as _

from backend.users.models import User
from django_cryptography.fields import encrypt
from cryptography.fernet import Fernet
from backend.data_analysis import utils
from django.contrib.postgres.fields import ArrayField
from django.db.models import JSONField
from datetime import datetime

class TransactionRecordModel(models.Model):
    transactionId = models.AutoField(primary_key=True)
    payType = models.CharField(max_length=255)
    amount = models.FloatField()  # Change from Decimal to FloatField
    destinationAddress = models.CharField(max_length=100)
    txHash = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return str(self.transactionId)
