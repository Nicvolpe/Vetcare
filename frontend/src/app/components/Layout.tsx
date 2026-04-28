import { Outlet, useNavigate, useLocation } from "react-router";
import { Home, MapPin, User, Heart } from "lucide-react";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/home", icon: Home, label: "Inicio" },
    { path: "/home/map", icon: MapPin, label: "Mapa" },
    { path: "/home/pets", icon: Heart, label: "Mascotas" },
    { path: "/home/profile", icon: User, label: "Perfil" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 overflow-auto pb-20">
        <Outlet />
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg">
        <div className="flex items-center justify-around h-16 max-w-2xl mx-auto px-2">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-xl transition-colors flex-1"
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={`text-xs ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
