from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MascotaViewSet, VeterinariaViewSet, TurnoViewSet

router = DefaultRouter()
router.register(r'mascotas', MascotaViewSet)
router.register(r'veterinarias', VeterinariaViewSet)
router.register(r'turnos', TurnoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]