from rest_framework import viewsets
from .models import Mascota, Veterinaria, Turno
from .serializers import MascotaSerializer, VeterinariaSerializer, TurnoSerializer

class MascotaViewSet(viewsets.ModelViewSet):
    queryset = Mascota.objects.all()
    serializer_class = MascotaSerializer

class VeterinariaViewSet(viewsets.ModelViewSet):
    queryset = Veterinaria.objects.all()
    serializer_class = VeterinariaSerializer

class TurnoViewSet(viewsets.ModelViewSet):
    queryset = Turno.objects.all()
    serializer_class = TurnoSerializer