from django.urls import path
from .views.client_view import query_sparql

urlpatterns = [
    path('sparql/', query_sparql, name='sparql'),
]