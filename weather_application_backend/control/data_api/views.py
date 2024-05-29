from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests

from .models import Forecast
from .serializers import ForecastSerializer

from .line_regresion import regresion_line


@api_view(['POST'])
def forecast(request):
  location = request.data.get('location')
  api_url = 'http://api.weatherapi.com/v1/forecast.json?key=469f5fe5cbb4446190c100905241005&q=' + str(location) + '&days=10&aqi=no&alerts=no'
  response = requests.get(api_url)

  if response.status_code == 200:
    data = response.json()
    weekly_forecast = []

    for i in range(7):
      daily_forecast = {
        'date': data['forecast']['forecastday'][i]['date'],
        'maxTemperature': data['forecast']['forecastday'][i]['day']['maxtemp_c'],
        'minTemperature': data['forecast']['forecastday'][i]['day']['mintemp_c'],
        'humidity': data['forecast']['forecastday'][i]['day']['avghumidity'],
      }

      forecast = Forecast.objects.filter(date=data['forecast']['forecastday'][i]['date'], location=location).first()

      if not forecast:
        db_data = Forecast(
          location=location,
          date=data['forecast']['forecastday'][i]['date'],
          maximum_temperature=data['forecast']['forecastday'][i]['day']['maxtemp_c'],
          minimum_temperature=data['forecast']['forecastday'][i]['day']['mintemp_c'],
          humidity=data['forecast']['forecastday'][i]['day']['avghumidity']
        )
        db_data.save();
      else:
        if (forecast.maximum_temperature != data['forecast']['forecastday'][i]['day']['maxtemp_c'] or
            forecast.minimum_temperature != data['forecast']['forecastday'][i]['day']['mintemp_c'] or
            forecast.humidity != data['forecast']['forecastday'][i]['day']['avghumidity']  ):
          
          forecast.maximum_temperature = data['forecast']['forecastday'][i]['day']['maxtemp_c']
          forecast.minimum_temperature = data['forecast']['forecastday'][i]['day']['mintemp_c']
          forecast.humidity = data['forecast']['forecastday'][i]['day']['avghumidity']
          forecast.save()
        
      weekly_forecast.append(daily_forecast)
    
    return Response({'forecast': weekly_forecast}, status=status.HTTP_200_OK)
  else:
    return Response({'message': 'Failed to fetch data'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def predict_forecast(request):
  location = request.data.get('location')
  forecasts = Forecast.objects.filter(location=location).order_by('date')[:7]
  serializer = ForecastSerializer(forecasts, many=True)
  forecast_prediction = regresion_line(serializer.data)
  return Response(forecast_prediction)


  










  


