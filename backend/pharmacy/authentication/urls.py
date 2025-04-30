from django.urls import path
from . import views

urlpatterns = [
    path('login', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair' ),
    path('register', views.register, name = 'register' ),
]