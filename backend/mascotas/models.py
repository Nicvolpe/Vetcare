from django.db import models
from django.contrib.auth.models import User

class Mascota(models.Model):
    nombre = models.CharField(max_length=100)
    raza = models.CharField(max_length=100)
    edad = models.IntegerField()
    peso = models.FloatField()
    dueno = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mascotas')
    
    def __str__(self):
        return f"{self.nombre} ({self.raza})"

class Veterinaria(models.Model):
    nombre = models.CharField(max_length=200)
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre

class Turno(models.Model):
    mascota = models.ForeignKey(Mascota, on_delete=models.CASCADE, related_name='turnos')
    veterinaria = models.ForeignKey(Veterinaria, on_delete=models.CASCADE, related_name='turnos')
    fecha_hora = models.DateTimeField()
    motivo = models.CharField(max_length=255)
    
    class Meta:
        unique_together = ['veterinaria', 'fecha_hora']

    def __str__(self):
        return f"Turno: {self.mascota.nombre} en {self.veterinaria.nombre}"