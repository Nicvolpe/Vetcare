import { ChevronLeft, Phone, Video, MessageCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";

export default function VirtualGuard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="bg-destructive text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <button onClick={() => navigate("/home")} className="mb-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          <h1 className="text-xl">Guardia Virtual</h1>
        </div>
        <p className="text-white/90 text-sm mt-2">
          Atención de emergencia las 24 horas
        </p>
      </div>

      <div className="p-6">
        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-red-900 mb-1">¿Es una emergencia grave?</h3>
              <p className="text-sm text-red-700">
                Si tu mascota presenta dificultad para respirar, sangrado abundante,
                convulsiones o pérdida de conciencia, llama inmediatamente al{" "}
                <span className="font-semibold">0800-VET-URGENCIA</span>
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-foreground mb-4">Opciones de contacto</h2>

        <div className="space-y-3">
          <button className="w-full bg-green-600 text-white p-5 rounded-3xl hover:bg-green-700 transition-colors shadow-md flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div className="text-left flex-1">
              <div className="text-base">Llamada de emergencia</div>
              <div className="text-sm text-green-100">
                Habla con un veterinario ahora
              </div>
            </div>
          </button>

          <button className="w-full bg-blue-600 text-white p-5 rounded-3xl hover:bg-blue-700 transition-colors shadow-md flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <div className="text-left flex-1">
              <div className="text-base">Videollamada</div>
              <div className="text-sm text-blue-100">
                Consulta virtual en vivo
              </div>
            </div>
          </button>

          <button className="w-full bg-primary text-white p-5 rounded-3xl hover:opacity-90 transition-opacity shadow-md flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="text-left flex-1">
              <div className="text-base">Chat en línea</div>
              <div className="text-sm text-primary-foreground/80">
                Consulta por mensaje
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 bg-secondary rounded-3xl p-5">
          <h3 className="text-foreground mb-3">Veterinarias de guardia 24hs</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-foreground text-sm">Vet Care Recoleta</p>
                <p className="text-xs text-muted-foreground">Av. Las Heras 2102</p>
              </div>
              <button className="text-primary text-sm hover:underline">
                Llamar
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-foreground text-sm">Clínica 24hs Palermo</p>
                <p className="text-xs text-muted-foreground">Av. Santa Fe 3950</p>
              </div>
              <button className="text-primary text-sm hover:underline">
                Llamar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
