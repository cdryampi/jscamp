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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const eventos = loadEventos();
  const ubicaciones = [...new Set(eventos.map(e => e.ubicacion).filter(Boolean))];
  
  return res.status(200).json({
    success: true,
    data: ubicaciones
  });
}
