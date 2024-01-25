from django.contrib import admin
from backend.users.models import Company
from .models import TransactionRecordModel
# Register your models here.
admin.site.register(TransactionRecordModel)
