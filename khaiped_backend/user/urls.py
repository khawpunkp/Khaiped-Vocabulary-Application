from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('logout', views.UserLogOutView.as_view(), name='logout'),
    path('register', views.UserRegisterView.as_view(), name='register'),
    path('login', views.UserLogInView.as_view(), name='login'),    
    path('', views.UserView.as_view(), name='user'),
    # path('session', views.SessionDataView.as_view(), name='session_data'),
    path('store-word-learned', views.WordLearnedView.as_view(), name='word_learned'),
    path('leaderboard', views.LeaderboardAPIView.as_view(), name='leaderboard'),
    path('token-refresh', jwt_views.TokenRefreshView.as_view(), name ='token_refresh')
]