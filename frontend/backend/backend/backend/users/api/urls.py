from django.urls import path
from .views import LoginView, RegisterView, GetUserView, MailVerifyView, ForgetPasswordView, ResetPasswordView, loginWithGoogle, GetUserInfo
# from .views import *

urlpatterns = [
    path("login/", view=LoginView.as_view(), name="login"),
    path("register/", view=RegisterView.as_view(), name="register"),
    path("mail-verify/", view=MailVerifyView.as_view(), name="mailverify"),
    path("forget-password/", view=ForgetPasswordView.as_view(), name="forgetpassword"),
    path("reset-password/", view=ResetPasswordView.as_view(), name="resetpassword"),
    path("getUser/", view=GetUserView.as_view(), name="getUserInfo"),
    path("getUserInfo/", view=GetUserInfo.as_view(), name="getUserInfoData"),
    path("getUserName/", view=GetUserInfo.as_view(), name="getUserInfoData"),
    path("loginWithGoogle/", view=loginWithGoogle.as_view(), name="loginWithGoogle")
]
