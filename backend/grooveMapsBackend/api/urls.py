from django.urls import path, include
from . import views


urlpatterns = [
    path('test/', views.TestApiView.as_view(), name='test_api'),
]
