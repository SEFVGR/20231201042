from django.urls import path
from . import views

urlpatterns = [
    path('', views.singlepage, name='singlepage'),
    path('singlepage/', views.singlepage, name='singlepage_alt'),
]