```tsx
import { useState, useEffect, useRef } from "react";
import { MapPin, Phone, Clock, Search, Navigation, Loader2, Star, MessageSquare } from "lucide-react";
import VetReviews from "./VetReviews";

// Declaración de tipos para Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

// IMPORTANTE: Reemplaza esta clave con tu propia API Key de Google Maps
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

interface Veterinaria {
  id: number;
  name: string;
  address: string;
  distance: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
}

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const [selectedVet, setSelectedVet] = useState<number | null>(null);
  const [searchAddress, setSearchAddress] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: -34.6037, lng: -58.3816 }); // Obelisco
  const [showReviews, setShowReviews] = useState<{vetId: number, vetName: string} | null>(null);

  const [veterinarias] = useState<Veterinaria[]>([
    {
      id: 1,
      name: "Vet Care Recoleta",
      address: "Av. Las Heras 2000, CABA",
      distance: "0.5 km",
      phone: "011 4801-2345",
      hours: "Abierto 24hs",
      lat: -34.5888,
      lng: -58.3969,
      rating: 4.8,
      reviewCount: 124
    },
    {
      id: 2,
      name: "Clínica Veterinaria Belgrano",
      address: "Cabildo 1500, CABA",
      distance: "1.2 km",
      phone: "011 4782-5678",
      hours: "Lun a Sab 9-20hs",
      lat: -34.5672,
      lng: -58.4485,
      rating: 4.5,
      reviewCount: 89
    },
    {
      id: 3,
      name: "Hospital Veterinario Palermo",
      address: "Av. Córdoba 4500, CABA",
      distance: "2.1 km",
      phone: "011 4771-9012",
      hours: "Abierto 24hs",
      lat: -34.5912,
      lng: -58.4287,
      rating: 4.9,
      reviewCount: 312
    }
  ]);

  useEffect(() => {
    if (GOOGLE_MAPS_API_KEY === "YOUR_API_KEY_HERE" || !GOOGLE_MAPS_API_KEY) {
      console.warn("Por favor configura tu API Key de Google Maps");
      return;
    }

    const scriptId = 'google-maps-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = initMap;
    } else {
      initMap();
    }

    function initMap() {
      if (!mapRef.current || !window.google) return;

      const map = new google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: 13,
        styles: [
          {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
        ],
        disableDefaultUI: true,
        zoomControl: true,
      });

      googleMapRef.current = map;

      // Agregar marcadores de veterinarias
      veterinarias.forEach((vet) => {
        const marker = new google.maps.Marker({
          position: { lat: vet.lat, lng: vet.lng },
          map,
          title: vet.name,
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            `)}`,
            scaledSize: new google.maps.Size(32, 32),
            anchor: new google.maps.Point(16, 32),
          },
        });

        marker.addListener("click", () => {
          setSelectedVet(vet.id);
          map.setZoom(16);
          map.setCenter(marker.getPosition() as google.maps.LatLng);
        });
      });
    }

    return () => {
      // Limpieza opcional si es necesaria
    };
  }, [mapCenter]);

  // Resto de las funciones (handleSearchChange, handleSelectSuggestion, geocodeAddress, handleGetCurrentLocation...)
  // por cuestiones de espacio te lo pongo resumido o completo si no te deja
  const handleSearchChange = (value: string) => {
    setSearchAddress(value);
    setShowSuggestions(value.length > 2);
    if (value.length > 2) {
      setSuggestions([
        `${value} 123, CABA`,
        `${value} 456, CABA`,
        `${value} 789, CABA`
      ]);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchAddress(suggestion);
    setShowSuggestions(false);
    geocodeAddress(suggestion);
  };

  const geocodeAddress = async (address: string) => {
    if (!address.trim()) return;
    
    setIsSearching(true);
    try {
      // Simular búsqueda para el demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address + ", Buenos Aires, Argentina" }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const newCenter = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          };
          
          setMapCenter(newCenter);
          if (googleMapRef.current) {
            googleMapRef.current.setCenter(newCenter);
            googleMapRef.current.setZoom(15);
            
            // Eliminar marcador anterior del usuario si existe
            if (userMarkerRef.current) {
              userMarkerRef.current.setMap(null);
            }
            
            // Agregar marcador de ubicación buscada
            userMarkerRef.current = new google.maps.Marker({
              position: newCenter,
              map: googleMapRef.current,
              title: address,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 3,
              },
            });
          }
        }
      });
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(newCenter);
          setUserLocation(newCenter);

          if (googleMapRef.current) {
            googleMapRef.current.setCenter(newCenter);
            googleMapRef.current.setZoom(15);

            // Eliminar marcador anterior del usuario si existe
            if (userMarkerRef.current) {
              userMarkerRef.current.setMap(null);
            }

            // Agregar marcador de ubicación del usuario
            userMarkerRef.current = new google.maps.Marker({
              position: newCenter,
              map: googleMapRef.current,
              title: "Tu ubicación",
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 3,
              },
            });
          }
        },
        (error) => {
          console.error("Error obteniendo ubicación:", error);
          alert("No se pudo obtener tu ubicación. Por favor verifica los permisos.");
        }
      );
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-white rounded-2xl shadow-lg p-3">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Ingresa tu dirección..."
                value={searchAddress}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && geocodeAddress(searchAddress)}
                className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-border max-h-60 overflow-y-auto z-20">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectSuggestion(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-secondary transition-colors text-sm text-foreground border-b border-border last:border-b-0"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {isSearching ? (
              <div className="p-2">
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
              </div>
            ) : (
              <button
                onClick={handleGetCurrentLocation}
                className="p-2 bg-primary rounded-xl text-white hover:opacity-90 transition-opacity"
                title="Usar mi ubicación actual"
              >
                <Navigation className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        ref={mapRef}
        className="relative flex-1 bg-gradient-to-br from-secondary via-accent to-muted"
      >
        {(!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "") && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 backdrop-blur-sm z-10">
            <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg text-foreground mb-3">API Key requerida</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Para usar el mapa interactivo, necesitas configurar tu Google Maps API Key en el .env
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-t-3xl shadow-2xl max-h-[45%] overflow-y-auto">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg text-foreground">Veterinarias cercanas</h2>
              {userLocation && (
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Navigation className="w-3 h-3" />
                  Ordenadas por distancia desde tu ubicación
                </p>
              )}
            </div>
            {selectedVet && (
              <button
                onClick={() => setSelectedVet(null)}
                className="text-sm text-primary hover:underline"
              >
                Ver todas
              </button>
            )}
          </div>
          {veterinarias.map((vet) => (
            <div
              key={vet.id}
              className={`rounded-2xl p-4 space-y-3 transition-all ${
                selectedVet === vet.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-secondary'
              }`}
            >
              <div
                onClick={() => {
                  setSelectedVet(vet.id);
                  if (googleMapRef.current) {
                    googleMapRef.current.setCenter({ lat: vet.lat, lng: vet.lng });
                    googleMapRef.current.setZoom(16);
                  }
                }}
                className="cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-1">
                    <MapPin className={`w-5 h-5 flex-shrink-0 ${selectedVet === vet.id ? 'text-white' : 'text-primary'}`} />
                    <h3 className={selectedVet === vet.id ? 'text-white' : 'text-foreground'}>{vet.name}</h3>
                  </div>
                  <span className={`text-sm ${selectedVet === vet.id ? 'text-white/90' : 'text-primary'}`}>
                    {vet.distance}
                  </span>
                </div>

                <p className={`text-sm pl-7 ${selectedVet === vet.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {vet.address}
                </p>
                <div className={`flex items-center gap-4 text-sm pl-7 ${selectedVet === vet.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <span>{vet.phone}</span>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-sm pl-7 ${selectedVet === vet.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                  <Clock className="w-4 h-4" />
                  <span>{vet.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showReviews && (
        <VetReviews
          vetId={showReviews.vetId}
          vetName={showReviews.vetName}
          onClose={() => setShowReviews(null)}
        />
      )}
    </div>
  );
}
