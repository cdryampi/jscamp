import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());

// Servir archivos estáticos
app.use('/assets', express.static(join(__dirname, '../public/assets')));

// Importar handlers
import indexHandler from '../api/index.js';
import eventosHandler from '../api/eventos.js';
import categoriasHandler from '../api/categorias.js';
import ubicacionesHandler from '../api/ubicaciones.js';

// Rutas
app.get('/', (req, res) => indexHandler(req, res));
app.get('/api/eventos', (req, res) => eventosHandler(req, res));
app.get('/api/eventos/categorias', (req, res) => categoriasHandler(req, res));
app.get('/api/eventos/ubicaciones', (req, res) => ubicacionesHandler(req, res));
app.get('/api/categorias', (req, res) => categoriasHandler(req, res));
app.get('/api/ubicaciones', (req, res) => ubicacionesHandler(req, res));

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint no encontrado' });
});

// Start server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊 API disponible en http://localhost:${PORT}/api/eventos`);
  });
}

export default app;
