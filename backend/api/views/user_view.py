from rest_framework.viewsets import ModelViewSet
from api.models import User
from knox.auth import TokenAuthentication
from api.serializers.user_serializer import UserSerializer, UserPatchSerializer

class UserViewSet(ModelViewSet):
    authentication_classes = [TokenAuthentication]

    def get_serializer_class(self):
        print(self.action)
        if self.action == "update":
            return UserPatchSerializer
        return UserSerializer

    def get_queryset(self): return User.objects.all()

        

        
    
