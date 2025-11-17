# Backend - El Día del Indio

Backend API REST para la gestión de eventos culturales del proyecto "El Día del Indio".

## 🚀 Tecnologías

- **Node.js** (v18+)
- **Express** - Framework web
- **SQLite** (better-sqlite3) - Base de datos
- **Vercel** - Plataforma de deployment

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── controllers/      # Controladores de las rutas
│   ├── db/              # Configuración de base de datos
│   ├── models/          # Modelos de datos
│   ├── routes/          # Definición de rutas
│   └── index.js         # Punto de entrada
├── public/
│   └── assets/
│       └── images/
│           └── eventos/ # Imágenes de eventos
├── data/
│   └── eventos.json     # Datos fuente para seed
├── package.json
├── vercel.json          # Configuración de Vercel
└── .env.example         # Variables de entorno de ejemplo
```

## 🛠️ Instalación

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` según tus necesidades:

```env
PORT=3001
NODE_ENV=development
DATABASE_PATH=./database.sqlite
CORS_ORIGIN=http://localhost:5173
```

### 3. Poblar la base de datos

El archivo `eventos.json` ya está copiado en `backend/data/`. Para crear la base de datos y poblarla con datos:

```bash
npm run seed
```

Este comando:
- Crea las tablas en SQLite
- Lee el archivo `data/eventos.json`
- Migra todos los eventos a la base de datos

## 🏃 Ejecutar el servidor

### Modo desarrollo (con auto-reload)

```bash
npm run dev
```

### Modo producción

```bash
npm start
```

El servidor estará disponible en `http://localhost:3001`

## 📡 Endpoints de la API

### Base URL
`http://localhost:3001`

### Endpoints disponibles

#### 1. Información de la API
```http
GET /
```

**Respuesta:**
```json
{
  "message": "API El Día del Indio - Backend",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

#### 2. Obtener todos los eventos
```http
GET /api/eventos
```

**Query Parameters:**
- `categoria` (string, opcional) - Filtrar por categoría
- `ubicacion` (string, opcional) - Filtrar por ubicación
- `destacado` (boolean, opcional) - Filtrar eventos destacados

**Ejemplo:**
```http
GET /api/eventos?categoria=cultural&destacado=true
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "titulo": "Festival de Música Andina Fusión",
      "slug": "festival-musica-andina-fusion",
      "descripcion": "...",
      "imagen": "/assets/images/eventos/evento_01_1.png",
      "fecha": "2024-12-15",
      "categoria": "cultural",
      ...
    }
  ],
  "count": 10
}
```

#### 3. Obtener evento por ID
```http
GET /api/eventos/:id
```

**Ejemplo:**
```http
GET /api/eventos/1
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "titulo": "Festival de Música Andina Fusión",
    ...
  }
}
```

#### 4. Obtener evento por slug
```http
GET /api/eventos/slug/:slug
```

**Ejemplo:**
```http
GET /api/eventos/slug/festival-musica-andina-fusion
```

#### 5. Obtener categorías
```http
GET /api/eventos/categorias
```

**Respuesta:**
```json
{
  "success": true,
  "data": ["cultural", "educativo", "deportivo", ...]
}
```

#### 6. Obtener ubicaciones
```http
GET /api/eventos/ubicaciones
```

**Respuesta:**
```json
{
  "success": true,
  "data": ["Madrid", "Barcelona", "Valencia", ...]
}
```

#### 7. Servir imágenes
```http
GET /assets/images/eventos/:filename
```

**Ejemplo:**
```http
GET /assets/images/eventos/evento_01_1.png
```

## 🗄️ Esquema de Base de Datos

### Tabla: `eventos`
Tabla principal que almacena la información básica de cada evento.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER | ID único del evento |
| titulo | TEXT | Título del evento |
| slug | TEXT | URL-friendly identifier |
| descripcion | TEXT | Descripción corta |
| descripcion_larga | TEXT | Descripción detallada |
| imagen | TEXT | URL de la imagen principal |
| fecha | DATE | Fecha del evento |
| categoria | TEXT | Categoría del evento |
| ubicacion | TEXT | Ciudad/ubicación |
| precio | TEXT | Precio (texto) |
| precio_numerico | REAL | Precio numérico |
| destacado | BOOLEAN | Si es evento destacado |
| activo | BOOLEAN | Si está activo |

### Tablas relacionadas:
- `evento_imagenes` - Imágenes adicionales
- `evento_tipos` - Tipos del evento
- `evento_tags` - Tags/etiquetas
- `evento_requisitos` - Requisitos
- `evento_incluye` - Qué incluye
- `evento_idiomas` - Idiomas disponibles
- `evento_contacto` - Información de contacto

## 🚀 Deployment en Vercel

### 1. Instalar Vercel CLI (opcional)

```bash
npm i -g vercel
```

### 2. Deploy desde la línea de comandos

```bash
vercel
```

### 3. Deploy desde GitHub

1. Conecta tu repositorio en [vercel.com](https://vercel.com)
2. Configura el directorio raíz como `backend`
3. Vercel detectará automáticamente la configuración de `vercel.json`

### Variables de entorno en Vercel

En el dashboard de Vercel, configura:
- `NODE_ENV=production`
- Otras variables necesarias

## 📝 Notas Importantes

### SQLite en Vercel

⚠️ **Importante**: Vercel usa un sistema de archivos de solo lectura en funciones serverless. Para producción en Vercel, considera:

1. **Opción 1**: Usar Vercel Postgres o Vercel KV
2. **Opción 2**: Usar Turso (SQLite edge)
3. **Opción 3**: Incluir la base de datos pre-poblada en el deploy (solo lectura)

Para la opción 3 (actual configuración):
- La base de datos se crea con el seed localmente
- Se incluye en el deploy
- Solo permite operaciones SELECT

### Imágenes

Las imágenes se sirven como archivos estáticos desde `public/assets/`. En Vercel, asegúrate de que esta carpeta esté incluida en el deployment.

## 🧪 Testing local

```bash
# Probar endpoint de eventos
curl http://localhost:3001/api/eventos

# Probar evento específico
curl http://localhost:3001/api/eventos/1

# Probar filtros
curl "http://localhost:3001/api/eventos?categoria=cultural"
```

## 📄 Licencia

MIT
