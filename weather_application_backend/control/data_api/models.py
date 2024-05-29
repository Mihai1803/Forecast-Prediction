from django.db import models


class Forecast(models.Model):
  location = models.CharField(max_length=30)
  date = models.CharField(max_length=30)
  maximum_temperature = models.IntegerField(default=0)
  minimum_temperature = models.IntegerField(default=0)
  humidity = models.IntegerField(default=0)

  def __str__(self):
    return "Date: " +  str(self.location) 