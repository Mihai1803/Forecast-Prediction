from sklearn.linear_model import LinearRegression
import numpy

def extract_data(data):
  date = []
  max_temp = []
  min_temp = []
  humidity = []

  day = 1
  for item in data:
    date.append([day])
    max_temp.append(item['maximum_temperature'])
    min_temp.append(item['minimum_temperature'])
    humidity.append(item['humidity'])
    day += 1

  return numpy.array(date), numpy.array(max_temp), numpy.array(min_temp), numpy.array(humidity), day

def regresion_line(serializer_data):
  date, max_temp, min_temp, humidity, days = extract_data(serializer_data)

  model = LinearRegression()
  next_week_days = numpy.arange(days - 1, days + 6).reshape(-1, 1)

  model.fit(date, max_temp)
  predicted_max_temp = model.predict(next_week_days)
  
  model.fit(date, min_temp)
  predicted_min_temp = model.predict(next_week_days)
  
  model.fit(date, humidity)
  predicted_humidty = model.predict(next_week_days)
 
  predicted_max_temp_foramted = [f"{temp:.2f}" for temp in predicted_max_temp]
  predicted_min_temp_foramted = [f"{temp:.2f}" for temp in predicted_min_temp]
  predicted_humidity_foramted = [f"{humidity:.2f}" for humidity in predicted_humidty]

  forecast_prediction = {
    'predicted_max_temp': predicted_max_temp_foramted,
    'predicted_min_temp': predicted_min_temp_foramted,
    'predicted_humidity': predicted_humidity_foramted
  }

  return forecast_prediction

  



