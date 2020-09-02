from rest_framework import viewsets
from ..models import Angka
from .serial import serial_angka

class AngkaViewSet(viewsets.ModelViewSet):
    serializer_class = serial_angka
    queryset = Angka.objects.all()
