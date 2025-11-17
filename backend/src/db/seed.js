import { getDatabase, saveDatabase } from './database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script para migrar datos desde el JSON a SQLite
 */
async function seed() {
  const db = await getDatabase();
  
  console.log('🌱 Iniciando seed de datos...');
  
  try {
    // Leer el archivo JSON de eventos
    const jsonPath = path.join(__dirname, '../../data/eventos.json');
    
    if (!fs.existsSync(jsonPath)) {
      console.error('❌ No se encontró el archivo eventos.json');
      console.log('📋 Copia el archivo desde react/src/data/eventos.json a backend/data/eventos.json');
      return;
    }
    
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const eventos = jsonData.eventos || jsonData;
    
    console.log(`📦 Se encontraron ${eventos.length} eventos para migrar`);
    
    // Limpiar tablas existentes
    db.exec(`
      DELETE FROM evento_contacto;
      DELETE FROM evento_idiomas;
      DELETE FROM evento_incluye;
      DELETE FROM evento_requisitos;
      DELETE FROM evento_tags;
      DELETE FROM evento_tipos;
      DELETE FROM evento_imagenes;
      DELETE FROM eventos;
    `);
    
    console.log('🧹 Tablas limpiadas');
    
    // Insertar eventos
    for (const evento of eventos) {
      // Insertar evento principal
      db.run(`
        INSERT INTO eventos (
          id, titulo, slug, descripcion, descripcion_larga, imagen,
          fecha, fecha_formateada, hora, hora_fin, categoria,
          ubicacion, ubicacion_detalle, direccion, lat, lng,
          precio, precio_numerico, capacidad, inscritos, organizador,
          accesibilidad, destacado, activo, visitado
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        evento.id,
        evento.titulo,
        evento.slug,
        evento.descripcion,
        evento.descripcionLarga || null,
        evento.imagen || null,
        evento.fecha,
        evento.fechaFormateada || null,
        evento.hora || null,
        evento.horaFin || null,
        evento.categoria || null,
        evento.ubicacion || null,
        evento.ubicacionDetalle || null,
        evento.direccion || null,
        evento.coordenadas?.lat || null,
        evento.coordenadas?.lng || null,
        evento.precio || null,
        evento.precioNumerico || 0,
        evento.capacidad || null,
        evento.inscritos || 0,
        evento.organizador || null,
        evento.accesibilidad ? 1 : 0,
        evento.destacado ? 1 : 0,
        evento.activo !== false ? 1 : 0,
        evento.visitado ? 1 : 0
      ]);
      
      // Insertar imágenes
      if (evento.imagenes && Array.isArray(evento.imagenes)) {
        evento.imagenes.forEach((url, index) => {
          db.run(`INSERT INTO evento_imagenes (evento_id, url, orden) VALUES (?, ?, ?)`, [evento.id, url, index]);
        });
      }
      
      // Insertar tipos
      if (evento.tipo && Array.isArray(evento.tipo)) {
        evento.tipo.forEach(tipo => {
          db.run(`INSERT INTO evento_tipos (evento_id, tipo) VALUES (?, ?)`, [evento.id, tipo]);
        });
      }
      
      // Insertar tags
      if (evento.tags && Array.isArray(evento.tags)) {
        evento.tags.forEach(tag => {
          db.run(`INSERT INTO evento_tags (evento_id, tag) VALUES (?, ?)`, [evento.id, tag]);
        });
      }
      
      // Insertar requisitos
      if (evento.requisitos && Array.isArray(evento.requisitos)) {
        evento.requisitos.forEach(requisito => {
          db.run(`INSERT INTO evento_requisitos (evento_id, requisito) VALUES (?, ?)`, [evento.id, requisito]);
        });
      }
      
      // Insertar incluye
      if (evento.incluye && Array.isArray(evento.incluye)) {
        evento.incluye.forEach(item => {
          db.run(`INSERT INTO evento_incluye (evento_id, item) VALUES (?, ?)`, [evento.id, item]);
        });
      }
      
      // Insertar idiomas
      if (evento.idiomas && Array.isArray(evento.idiomas)) {
        evento.idiomas.forEach(idioma => {
          db.run(`INSERT INTO evento_idiomas (evento_id, idioma) VALUES (?, ?)`, [evento.id, idioma]);
        });
      }
      
      // Insertar contacto
      if (evento.contacto) {
        db.run(`
          INSERT INTO evento_contacto (evento_id, email, telefono, web) VALUES (?, ?, ?, ?)
        `, [
          evento.id,
          evento.contacto.email || null,
          evento.contacto.telefono || null,
          evento.contacto.web || null
        ]);
      }
    }
    
    // Guardar la base de datos
    saveDatabase();
    
    console.log(`✅ Se migraron ${eventos.length} eventos exitosamente`);
    
    // Mostrar estadísticas
    const result = db.exec('SELECT COUNT(*) as total FROM eventos');
    const total = result[0]?.values[0]?.[0] || 0;
    console.log(`📊 Total de eventos en la base de datos: ${total}`);
    
  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    throw error;
  }
}

// Ejecutar si se llama directamente
const isMainModule = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'));

if (isMainModule || process.argv[1]?.includes('seed.js')) {
  seed()
    .then(() => {
      console.log('🎉 Seed completado!');
      process.exit(0);
    })
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}

export default seed;
