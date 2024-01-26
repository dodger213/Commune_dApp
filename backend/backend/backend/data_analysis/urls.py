from django.urls import path

from backend.data_analysis.views import (
    SaveTransaction,
)

urlpatterns = [
    path("saveTransaction/", view=SaveTransaction.as_view(), name="SaveTransaction"),
]
