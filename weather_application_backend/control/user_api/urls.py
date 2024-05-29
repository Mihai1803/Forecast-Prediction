from django.urls import path
from .views import login, register, test_token
from . import views


urlpatterns = [
  path('register/', views.register),
  path('login/', views.login),
  path('test_token/', views.test_token),
]
