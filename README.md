En la raíz de tu proyecto (junto a las carpetas frontend y backend), crea un archivo llamado README.md y pega lo siguiente:

# Vetcare - Sistema de Gestión Veterinaria

Vetcare es un sistema integral de gestión para clínicas veterinarias y dueños de mascotas. Está construido con **Django (Backend)** y **React + Vite (Frontend)**.

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:
- [Node.js](https://nodejs.org/es) y [pnpm](https://pnpm.io/) (para el Frontend)
- [Python 3.10+](https://www.python.org/downloads/) (para el Backend)
- [PostgreSQL](https://www.postgresql.org/download/) instalado y en ejecución

---

## ⚙️ Configuración del Backend (Django)

1. **Navegar a la carpeta del backend:**
   ```bash
   cd backend
Crear y activar un entorno virtual:

python3 -m venv venv
source venv/bin/activate  # En Windows usa: venv\Scripts\activate
Instalar las dependencias:

pip install -r requirements.txt
pip install psycopg2-binary django-cors-headers
Configurar la base de datos (PostgreSQL): Abre una terminal de PostgreSQL (psql) y crea la base de datos y el usuario:

CREATE DATABASE vetcare_bd;
CREATE USER postgres WITH PASSWORD 'cachetes';
ALTER ROLE postgres SET client_encoding TO 'utf8';
ALTER ROLE postgres SET default_transaction_isolation TO 'read committed';
ALTER ROLE postgres SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE vetcare_bd TO postgres;
Aplicar las migraciones:

python manage.py migrate
Ejecutar el servidor de desarrollo:

python manage.py runserver
El backend estará disponible en http://localhost:8000/

🎨 Configuración del Frontend (React + Vite)
Navegar a la carpeta del frontend:

cd frontend
Instalar las dependencias (incluye Axios):

pnpm add axios
pnpm install
Configurar variables de entorno:

Crea un archivo .env en la carpeta frontend:
VITE_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
VITE_API_URL=http://localhost:8000/api/
Ejecutar el entorno de desarrollo:

pnpm dev
El frontend estará disponible en http://localhost:5173/
