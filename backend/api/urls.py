from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, LoginView


router  = DefaultRouter()
router.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='knox_login'),
]

