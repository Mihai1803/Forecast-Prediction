from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('control.user_api.urls')),
    path('api/data/', include('control.data_api.urls')),

]
