from django.urls import path
from . import views

urlpatterns = [
    path('logout', views.UserLogOutView.as_view(), name='logout'),
    path('register', views.UserRegisterView.as_view(), name='register'),
    path('login', views.UserLogInView.as_view(), name='login'),    
    path('user', views.UserView.as_view(), name='user'),
    path('session', views.SessionDataView.as_view(), name='session_data'),
    path('store-word-learned', views.WordLearnedView.as_view(), name='word_learned'),
]