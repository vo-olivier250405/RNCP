from django.contrib.auth import login, logout

from knox.views import LoginView as KnoxLoginView
from knox.views import LogoutView as KnoxLogoutView

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.serializers import AuthTokenSerializer
from api.serializers import UserSerializer
from api.models import User

class LoginView(KnoxLoginView):
    permission_classes = (AllowAny,)
    
    def get_user_serializer_class(self): return UserSerializer
    
    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data.get("user", None)
        print(user)
        login(request, user)
        return super().post(request, format)


class LogoutView(KnoxLogoutView):
    permission_classes = (IsAuthenticated,)
    
    def post(self, request, format=None):
        logout(request)
        return super().post(request, format)
        