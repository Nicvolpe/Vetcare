import { useState } from "react";
import { Dog, Cat, Calendar, Weight, Palette, Ruler, Bell, FileText, ChevronRight, Plus } from "lucide-react";
import { useNavigate } from "react-router";

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  furType: string;
  furColor: string;
  photo?: string;
}

interface Reminder {
  id: number;
  petId: number;
  type: string;
  description: string;
  date: string;
  daysUntil: number;
  priority: "high" | "medium" | "low";
}

interface Visit {
  id: number;
  petId: number;
  date: string;
  location: string;
  reason: string;
  notes: string;
}

export default function MisMascotas() {
  const navigate = useNavigate();

  const [pets] = useState<Pet[]>([
    {
      id: 1,
      name: "Max",
      species: "Perro",
      breed: "Golden Retriever",
      age: 3,
      weight: 28,
      furType: "Largo",
      furColor: "Dorado",
    },
  ]);

  const [reminders] = useState<Reminder[]>([
    {
      id: 1,
      petId: 1,
      type: "Análisis de sangre",
      description: "Control anual de análisis de sangre completo",
      date: "2026-05-26",
      daysUntil: 30,
      priority: "high",
    },
    {
      id: 2,
      petId: 1,
      type: "Vacuna antirrábica",
      description: "Refuerzo anual de vacuna antirrábica",
      date: "2026-09-15",
      daysUntil: 142,
      priority: "medium",
    },
    {
      id: 3,
      petId: 1,
      type: "Desparasitación",
      description: "Desparasitación interna trimestral",
      date: "2026-05-10",
      daysUntil: 14,
      priority: "high",
    },
  ]);

  const [visits] = useState<Visit[]>([
    {
      id: 1,
      petId: 1,
      date: "15 Abr 2026",
      location: "Vet Care Recoleta",
      reason: "Control de rutina",
      notes: "Peso: 28kg. Estado general: excelente. Próxima vacuna: septiembre.",
    },
    {
      id: 2,
      petId: 1,
      date: "02 Mar 2026",
      location: "Veterinaria Palermo",
      reason: "Vacunación antirrábica",
      notes: "Aplicación de vacuna antirrábica. Próxima dosis en 1 año.",
    },
    {
      id: 3,
      petId: 1,
      date: "18 Ene 2026",
      location: "Clínica Veterinaria Belgrano",
      reason: "Consulta general",
      notes: "Revisión de piel y pelaje. Todo en orden.",
    },
  ]);

  const [selectedPet, setSelectedPet] = useState<Pet | null>(pets[0] || null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Urgente";
      case "medium":
        return "Próximamente";
      case "low":
        return "Planificado";
      default:
        return "";
    }
  };

  const petReminders = selectedPet
    ? reminders.filter((r) => r.petId === selectedPet.id).sort((a, b) => a.daysUntil - b.daysUntil)
    : [];

  const petVisits = selectedPet
    ? visits.filter((v) => v.petId === selectedPet.id)
    : [];

  if (!selectedPet) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background flex flex-col items-center justify-center p-6">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
          <Dog className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-xl text-foreground mb-2">No tienes mascotas registradas</h2>
        <p className="text-muted-foreground text-center mb-6">
          Agrega tu primera mascota para comenzar a llevar su historial
        </p>
        <button
          onClick={() => navigate("/home/profile")}
          className="bg-primary text-white px-6 py-3 rounded-2xl hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Agregar mascota
        </button>
      </div>
    );
  }

  const SpeciesIcon = selectedPet.species === "Gato" ? Cat : Dog;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background pb-8">
      <div className="bg-primary text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <h1 className="text-xl mb-4">Mis mascotas</h1>

        {pets.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {pets.map((pet) => (
              <button
                key={pet.id}
                onClick={() => setSelectedPet(pet)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl transition-colors ${
                  selectedPet?.id === pet.id
                    ? "bg-white text-primary"
                    : "bg-white/20 text-white"
                }`}
              >
                {pet.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <SpeciesIcon className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl text-foreground mb-1">{selectedPet.name}</h2>
              <p className="text-muted-foreground">{selectedPet.breed}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary rounded-2xl p-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Edad</span>
              </div>
              <p className="text-foreground text-lg">
                {selectedPet.age} {selectedPet.age === 1 ? "año" : "años"}
              </p>
            </div>

            <div className="bg-secondary rounded-2xl p-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Weight className="w-4 h-4" />
                <span className="text-sm">Peso</span>
              </div>
              <p className="text-foreground text-lg">{selectedPet.weight} kg</p>
            </div>

            <div className="bg-secondary rounded-2xl p-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Ruler className="w-4 h-4" />
                <span className="text-sm">Pelaje</span>
              </div>
              <p className="text-foreground text-lg">{selectedPet.furType}</p>
            </div>

            <div className="bg-secondary rounded-2xl p-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Palette className="w-4 h-4" />
                <span className="text-sm">Color</span>
              </div>
              <p className="text-foreground text-lg">{selectedPet.furColor}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-lg text-foreground">Recordatorios</h2>
            {petReminders.length > 0 && (
              <span className="bg-destructive text-white text-xs px-2 py-1 rounded-full">
                {petReminders.filter(r => r.daysUntil <= 30).length}
              </span>
            )}
          </div>

          {petReminders.length === 0 ? (
            <div className="bg-secondary rounded-2xl p-6 text-center">
              <p className="text-muted-foreground">No hay recordatorios pendientes</p>
            </div>
          ) : (
            <div className="space-y-3">
              {petReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={`rounded-2xl p-4 border-2 ${getPriorityColor(reminder.priority)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{reminder.type}</h3>
                        <span className="text-xs px-2 py-0.5 bg-white/50 rounded-full">
                          {getPriorityLabel(reminder.priority)}
                        </span>
                      </div>
                      <p className="text-sm opacity-80">{reminder.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-80">📅 {reminder.date}</span>
                    <span className="font-medium">
                      {reminder.daysUntil === 0
                        ? "¡Hoy!"
                        : reminder.daysUntil === 1
                        ? "Mañana"
                        : `En ${reminder.daysUntil} días`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-lg text-foreground">Historial de visitas</h2>
            </div>
            <button
              onClick={() => navigate("/home/history")}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Ver todo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {petVisits.length === 0 ? (
            <div className="bg-secondary rounded-2xl p-6 text-center">
              <p className="text-muted-foreground">No hay visitas registradas</p>
            </div>
          ) : (
            <div className="space-y-3">
              {petVisits.slice(0, 3).map((visit) => (
                <div
                  key={visit.id}
                  className="bg-white border border-border rounded-2xl p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-foreground font-medium">{visit.reason}</h3>
                      <p className="text-sm text-muted-foreground">{visit.location}</p>
                    </div>
                    <span className="text-sm text-primary">{visit.date}</span>
                  </div>
                  <div className="bg-secondary rounded-xl p-3 mt-2">
                    <p className="text-sm text-foreground">{visit.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => navigate("/home/book")}
          className="w-full bg-primary text-white py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          Reservar turno para {selectedPet.name}
        </button>
      </div>
    </div>
  );
}
