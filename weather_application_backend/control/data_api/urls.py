from django.urls import path
from .views import forecast, predict_forecast
from . import views


urlpatterns = [
  path('forecast/', views.forecast),
  path('predict_forecast/', views.predict_forecast),
]
