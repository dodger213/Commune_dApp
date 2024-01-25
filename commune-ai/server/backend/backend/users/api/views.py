import os
import requests
from django.contrib.auth import get_user_model, authenticate, login
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserSerializer, LoginSerializer

User = get_user_model()


def send_mail(email, content):
    email_params = {
        "apikey": os.getenv("MAIL_KEY"),
        "from": "tunki1201@gmail.com",
        "to": email,
        "subject": "Email Verify - Metricloop Account",
        "body": f"{content}",
        "isTransactional": True,
    }

    response = requests.post(
        "https://api.elasticemail.com/v2/email/send",
        data=email_params,
    )
    return response


class UserViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = "pk"

    def get_queryset(self, *args, **kwargs):
        assert isinstance(self.request.user.id, int)
        return self.queryset.filter(id=self.request.user.id)

    @action(detail=False)
    def me(self, request):
        serializer = UserSerializer(request.user, context={"request": request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)


class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            data = request.data
            username = data["fullName"]
            email = data["email"]
            password = data["password"]
            confirmPassword = data["confirmPassword"]

            if password == confirmPassword:
                if len(password) >= 6:
                    if not User.objects.filter(email=email).exists():
                        user = User.objects.create_user(
                            email=email,
                            fullname=username,
                            password=password,
                        )
                        if User.objects.filter(email=email).exists():
                            # mail verify
                            refresh = RefreshToken.for_user(user)
                            response = send_mail(
                                email, f"{os.getenv('FRONT_URL')}/mail-verify/?token={str(refresh.access_token)}"
                            )
                            if response.status_code == 200:
                                return Response(
                                    {"success": "User created successfully and sent verification link."},
                                    status=status.HTTP_201_CREATED,
                                )
                            else:
                                return Response(
                                    {"success": "Resend verification link."},
                                    status=status.HTTP_201_CREATED,
                                )
                        else:
                            return Response(
                                {"error": "Something went wrong creating user"},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            )
                    else:
                        return Response(
                            {"error": "Username already exists"},
                            status=status.HTTP_400_BAD_REQUEST,
                        )
                else:
                    return Response(
                        {"error": "Password must be at least 6 characters long"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            else:
                return Response(
                    {"error": "Passwords do not match"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            print(e)
            return Response(
                {"error": "Something went wrong"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class MailVerifyView(APIView):
    def post(self, request):
        user = request.user
        user.mail_verify = True
        user.save()
        return Response({"success": "Email verified"}, status=status.HTTP_200_OK)


class ForgetPasswordView(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = ()

    def post(self, request):
        # email = request.data.get("email")
        email = request.data["email"]
        try:
            user = User.objects.get(email=email)
            refresh = RefreshToken.for_user(user)
            response = send_mail(email, f"{os.getenv('FRONT_URL')}/reset-password/?token={str(refresh.access_token)}")
            if response.status_code == 200:
                return Response(
                    {"success": "sent verification link."},
                    status=status.HTTP_201_CREATED,
                )
            else:
                return Response(
                    {"success": "Resend verification link."},
                    status=status.HTTP_201_CREATED,
                )
        except Exception as e:
            print(e)
            return Response({"error": "user does not exist"}, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(APIView):
    def post(self, request):
        user = request.user
        password = request.data["password"]
        confirm_password = request.data["confirmPassword"]
        if password == confirm_password:
            user.password = password
            user.save()
            return Response({"success": "reset password"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "password not matched"})


class LoginView(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = ()

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.validated_data)
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]
            user = authenticate(request, email=email, password=password)
            print(user)
            if user is not None:
                if user.mail_verify:
                    login(request, user)
                    refresh = RefreshToken.for_user(user)

                    return Response(
                        {
                            "status": {
                                "type": "success",
                                "message": "Welcome back! You have successfully logged in.",
                            },
                            "result": {
                                "token": str(refresh.access_token),
                                "user": {
                                    "username": user.fullname,
                                    "email": user.email,
                                    # Include any other user fields as needed
                                },
                            },
                            "navigate": "/home",
                        },
                    )
                else:
                    return Response(
                        {
                            "error": "Email not verified",
                        },
                        status=status.HTTP_401_UNAUTHORIZED,
                    )
            else:
                return Response(
                    {
                        "error": "Invalid email or password",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            return Response(serializer.error_messages)


class GetUserView(APIView):
    def post(self, request):
        user = request.user
        print(user)
        find_user = User.objects.get(email=user)

        if find_user:
            refresh = RefreshToken.for_user(find_user)
            return Response(
                {
                    "result": {
                        "token": str(refresh.access_token),
                        "user": {
                            "username": user.fullname,
                            "email": user.email,
                            # Include any other user fields as needed
                        },
                    }
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response({"error": "User does not exist. Please login"}, status=status.HTTP_400_BAD_REQUEST)


class GetUserInfo(APIView):
    def post(self, request):
        # Retrieve all users from the database
        all_users = User.objects.all()

        # Extract relevant information (username and email) from each user object
        users_info = [{"username": user.fullname, "email": user.email} for user in all_users]

        return Response({"user": users_info}, status=status.HTTP_200_OK)


class loginWithGoogle(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = ()

    def post(self, request):
        name = request.data.get("name")
        email = request.data.get("email")

        # Check if the user already exists
        user, created = User.objects.get_or_create(fullname=name, email=email)
        if created:
            user.fullname = name
            user.mail_verify = True
            user.save()

        return Response("User saved successfully", status=status.HTTP_200_OK)
