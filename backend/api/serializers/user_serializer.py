from api.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserPatchSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=200)
    game_session = serializers.JSONField()
    
    class Meta:
        model = User
        fields = ["username", "game_session"]
        
