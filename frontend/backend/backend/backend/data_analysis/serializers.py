from rest_framework import serializers
from backend.data_analysis.models import (
    TransactionRecordModel
)


class TransactionRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionRecordModel
        fields = "__all__"
