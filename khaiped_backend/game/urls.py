from django.urls import path
from . import views

urlpatterns = [
    path('getWord', views.GameAPIView.as_view(), name='game'),
]