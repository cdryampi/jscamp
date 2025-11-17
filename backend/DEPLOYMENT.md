# Deployment en Vercel - Backend El Día del Indio

## 🚀 Deployment Rápido

### Opción 1: Desde la UI de Vercel (Recomendado)

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Add New" → "Project"
3. Importa tu repositorio GitHub
4. Configura:
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: (dejar vacío)
   - **Output Directory**: (dejar vacío)

5. Click en "Deploy"

### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desde el directorio backend
cd backend

# Deploy
vercel

# Deploy a producción
vercel --prod
```

## 📁 Estructura para Vercel

```
backend/
├── api/                    # Serverless functions
│   ├── index.js           # GET /
│   ├── eventos.js         # GET /api/eventos
│   ├── categorias.js      # GET /api/categorias
│   └── ubicaciones.js     # GET /api/ubicaciones
├── data/
│   └── eventos.json       # Datos de eventos
├── public/
│   └── assets/           # Imágenes estáticas
└── vercel.json           # Configuración de Vercel
```

## 🔧 Configuración

### vercel.json

El archivo `vercel.json` configura:
- **Rewrites**: Rutas de la API
- **Headers**: CORS habilitado para todas las peticiones

### Variables de entorno (opcional)

No son necesarias para el deployment básico, pero puedes configurarlas en Vercel Dashboard si lo necesitas.

## 📡 Endpoints Disponibles

Una vez deployado, tendrás:

```
https://tu-proyecto.vercel.app/
https://tu-proyecto.vercel.app/api/eventos
https://tu-proyecto.vercel.app/api/eventos?id=1
https://tu-proyecto.vercel.app/api/eventos?slug=festival-musica-andina-fusion
https://tu-proyecto.vercel.app/api/eventos?categoria=cultural
https://tu-proyecto.vercel.app/api/eventos?ubicacion=Madrid
https://tu-proyecto.vercel.app/api/eventos?destacado=true
https://tu-proyecto.vercel.app/api/categorias
https://tu-proyecto.vercel.app/api/ubicaciones
```

## 🧪 Probar el Deployment

Después de deployar, prueba los endpoints:

```bash
# Reemplaza YOUR_DEPLOYMENT_URL con tu URL de Vercel
curl https://YOUR_DEPLOYMENT_URL/api/eventos

# O en PowerShell
Invoke-RestMethod -Uri "https://YOUR_DEPLOYMENT_URL/api/eventos"
```

## 🔄 Actualizar Datos

Si necesitas actualizar los eventos:

1. Modifica `data/eventos.json`
2. Haz commit y push a GitHub
3. Vercel re-deployará automáticamente

O desde CLI:

```bash
# Actualizar datos
# (modifica data/eventos.json)

# Re-deploy
vercel --prod
```

## ⚠️ Notas Importantes

1. **Solo lectura**: Esta configuración es solo para operaciones GET (lectura)
2. **CORS**: Configurado para aceptar peticiones desde cualquier origen (`*`)
3. **Imágenes**: Las imágenes en `public/assets/` se sirven automáticamente
4. **Serverless**: Cada endpoint es una función serverless independiente

## 🐛 Troubleshooting

### Error: Cannot find module

Verifica que `data/eventos.json` exista y tenga el formato correcto.

### Error: CORS

Los headers CORS ya están configurados en `vercel.json` y en cada función.

### Error: 404

Verifica que las rutas en `vercel.json` coincidan con los archivos en `/api/`.

### Los cambios no se reflejan

Haz force redeploy:
```bash
vercel --prod --force
```

## 📊 Monitoreo

En el dashboard de Vercel puedes ver:
- Logs de las funciones
- Uso de ancho de banda
- Tiempo de respuesta
- Errores

---

¿Necesitas ayuda? Revisa la [documentación de Vercel](https://vercel.com/docs)
