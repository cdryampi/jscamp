import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let eventosData = null;

function loadEventos() {
  if (eventosData) return eventosData;
  
  try {
    const dataPath = path.join(__dirname, '../data/eventos.json');
    if (fs.existsSync(dataPath)) {
      const rawData = fs.readFileSync(dataPath, 'utf8');
      const parsed = JSON.parse(rawData);
      eventosData = parsed.eventos || parsed;
      return eventosData;
    }
  } catch (error) {
    console.error('Error cargando datos:', error);
  }
  
  return [];
}

export default function handler(req, res) {
  const { method, query } = req;
  const { id, slug, categoria, ubicacion, destacado } = query;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const eventos = loadEventos();

  // Buscar por ID
  if (id) {
    const evento = eventos.find(e => e.id === parseInt(id));
    return res.status(evento ? 200 : 404).json({
      success: !!evento,
      data: evento || null,
      error: evento ? undefined : 'Evento no encontrado'
    });
  }

  // Buscar por slug
  if (slug) {
    const evento = eventos.find(e => e.slug === slug);
    return res.status(evento ? 200 : 404).json({
      success: !!evento,
      data: evento || null,
      error: evento ? undefined : 'Evento no encontrado'
    });
  }

  // Filtrar eventos
  let result = eventos.filter(e => e.activo !== false);

  if (categoria) {
    result = result.filter(e => e.categoria?.toLowerCase() === categoria.toLowerCase());
  }

  if (ubicacion) {
    result = result.filter(e => e.ubicacion?.toLowerCase().includes(ubicacion.toLowerCase()));
  }

  if (destacado !== undefined) {
    const isDestacado = destacado === 'true' || destacado === '1';
    result = result.filter(e => e.destacado === isDestacado);
  }

  // Ordenar por fecha
  result.sort((a, b) => {
    if (a.fecha === b.fecha) {
      return (a.hora || '').localeCompare(b.hora || '');
    }
    return a.fecha.localeCompare(b.fecha);
  });

  return res.status(200).json({
    success: true,
    data: result,
    count: result.length
  });
}
