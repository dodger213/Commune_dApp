from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from backend.users.api.views import UserViewSet
from django.urls import include, path

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)

sub_urls = [
    path('data-analysis/', include("data_analysis.urls")),
    path('authentication/', include("users.api.urls")),
]

app_name = "api"
urlpatterns = router.urls + sub_urls
