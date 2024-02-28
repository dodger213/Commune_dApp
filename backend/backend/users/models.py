from django.contrib.auth.models import AbstractUser
from django.db.models import CharField, EmailField
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

from backend.users.managers import UserManager
from django.contrib.auth.models import BaseUserManager

class EncryptedUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)

class Company(models.Model):
    company_id = models.AutoField(primary_key=True)
    company_email = models.EmailField(unique=True)
    company_name = models.CharField(max_length=255)
    company_logo = models.ImageField(upload_to="company_logos/", null=True, blank=True)

    def __str__(self):
        return self.company_name


class User(AbstractUser):
    """
    Default custom user model for backend.
    If adding fields that need to be filled at user signup,
    check forms.SignupForm and forms.SocialSignupForms accordingly.
    """

    USER_TYPE_CHOICES = (
        ("Data Engineer", "Data Engineer"),
        ("Data Analyst", "Data Analyst"),
        ("Data Scientist", "Data Scientist"),
        ("Subject Matter Expert", "Subject Matter Expert"),
    )

    # First and last name do not cover name patterns around the globe
    fullname = CharField(max_length=255, default="John Doe")
    name = CharField(_("Name of User"), blank=True, max_length=255)
    first_name = None  # type: ignore
    last_name = None  # type: ignore
    email = EmailField(_("email address"), unique=True)
    username = None  # type: ignore
    user_type = CharField(max_length=50, choices=USER_TYPE_CHOICES)
    profile_info = models.TextField(blank=True)
    company_id = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True)
    user_logo = models.ImageField(upload_to="user_logos/", null=True, blank=True)
    mail_verify = models.BooleanField(default=False)
    path = models.FileField(_("upload Field"), upload_to="dataurl", null=True, blank=True)
    data_url = models.CharField(max_length=255, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def get_absolute_url(self) -> str:
        """Get URL for user's detail view.

        Returns:
            str: URL for user detail.

        """
        return reverse("users:detail", kwargs={"pk": self.id})
