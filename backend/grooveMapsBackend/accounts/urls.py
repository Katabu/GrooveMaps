from django.urls import path
from . import views

urlpatterns = [
    path('register', views.RegisterApiView.as_view(), name='register_api'),
    path('login', views.LoginApiView.as_view(), name='login_api'),
    path('logout', views.LogoutApiView.as_view(), name='logout_api'),
    path('refresh', views.RefreshTokenApiView.as_view(), name='refresh_token_api'),
]
