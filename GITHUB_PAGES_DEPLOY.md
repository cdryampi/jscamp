# Deploy a GitHub Pages - El Día del Indio

Este proyecto está configurado para deployarse automáticamente a GitHub Pages mediante GitHub Actions.

## 🚀 Configuración Inicial

### 1. Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. En "Source" selecciona: **GitHub Actions**

### 2. Configurar Secrets

Ve a Settings → Secrets and variables → Actions → New repository secret

Agrega los siguientes secrets:

| Secret Name | Value | Descripción |
|-------------|-------|-------------|
| `VITE_MAX_EVENTS_INDEX` | `5` | Número máximo de eventos en index |
| `VITE_VERCEL_API_URL` | `https://jscamp-mu.vercel.app` | URL del backend en Vercel |

### 3. Verificar el nombre del repositorio

El `base` en `vite.config.js` debe coincidir con el nombre de tu repositorio:

```javascript
base: "/jscamp/"  // Cambiar "jscamp" por el nombre de tu repo
```

Si tu repo se llama diferente, actualiza esta línea.

## 📁 Estructura

```
.github/
  workflows/
    deploy-react.yml    # CI/CD workflow
react/
  dist/                 # Build output (generado)
  src/                  # Código fuente
  vite.config.js        # Configuración de Vite para producción
```

## 🔄 Workflow de Deployment

El workflow se ejecuta automáticamente cuando:

- Haces push a la rama `main`
- Hay cambios en la carpeta `react/`
- Se ejecuta manualmente desde GitHub Actions

### Pasos del workflow:

1. **Build**
   - Checkout del código
   - Setup Node.js 20
   - Instalar dependencias (`npm ci`)
   - Build con variables de entorno
   - Upload del artifact

2. **Deploy**
   - Deploy a GitHub Pages
   - URL disponible en el output

## 🧪 Probar localmente antes de deployar

```bash
cd react

# Build de producción
npm run build

# Preview del build
npm run preview
```

Esto iniciará un servidor local con el build de producción en `http://localhost:4173`

## 📊 Verificar el Deployment

Después del primer deployment exitoso:

1. Ve a Actions en GitHub
2. Verifica que el workflow esté ✅ verde
3. Ve a Settings → Pages
4. Verás la URL: `https://tuusuario.github.io/jscamp/`

## 🔧 Configuración de Vite

El `vite.config.js` está configurado con:

```javascript
{
  base: "/jscamp/",              // Ruta base para GitHub Pages
  build: {
    outDir: "dist",              // Carpeta de salida
    assetsDir: "assets",         // Carpeta de assets
    sourcemap: false,            // Sin sourcemaps en producción
    minify: "terser",            // Minificación con terser
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          axios: ['axios']
        }
      }
    }
  }
}
```

## 🐛 Troubleshooting

### Error: 404 al navegar

Si obtienes 404 al navegar entre rutas:

**Solución**: Agrega un archivo `public/404.html` que redirija a `index.html`

### Error: Assets no cargan

Verifica que el `base` en `vite.config.js` coincida con el nombre del repositorio.

### Error: Variables de entorno no funcionan

1. Verifica que los secrets estén configurados en GitHub
2. Los nombres deben empezar con `VITE_`
3. Deben estar en el paso `Build project` del workflow

### Build falla

```bash
# Localmente, verificar que el build funcione
cd react
npm run build
```

Si falla localmente, revisa los errores antes de hacer push.

## 🔄 Actualizar el sitio

Simplemente haz push a `main`:

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

GitHub Actions se encargará automáticamente del deployment.

## 📝 Logs y Debugging

1. Ve a Actions en GitHub
2. Click en el último workflow
3. Revisa los logs de cada paso
4. Si hay errores, aparecerán en rojo

## 🎯 URL Final

Tu aplicación estará disponible en:

```
https://cdryampi.github.io/jscamp/
```

(Reemplaza `cdryampi` con tu usuario de GitHub y `jscamp` con el nombre de tu repositorio)

## ⚙️ Optimizaciones Aplicadas

- ✅ Code splitting (vendor, axios)
- ✅ Minificación con Terser
- ✅ Assets optimizados
- ✅ Sin sourcemaps (más ligero)
- ✅ Cache de Node.js en CI
- ✅ Variables de entorno desde secrets

## 🔐 Seguridad

- Las variables de entorno se inyectan en build time
- Los secrets de GitHub nunca se exponen en logs
- El código se minifica en producción

---

**Nota**: Asegúrate de que tu repositorio sea público o tengas GitHub Pro/Team para usar GitHub Pages con repos privados.
