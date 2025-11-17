import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../../database.sqlite');

let db;
let SQL;

/**
 * Inicializa la conexión a la base de datos SQLite
 * @returns {Object} Instancia de la base de datos
 */
export async function initDatabase() {
  if (db) return db;
  
  if (!SQL) {
    SQL = await initSqlJs();
  }
  
  // Intentar cargar base de datos existente
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    // Crear nueva base de datos
    db = new SQL.Database();
  }
  
  createTables();
  
  return db;
}

/**
 * Guarda la base de datos en el disco
 */
export function saveDatabase() {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

/**
 * Crea las tablas necesarias si no existen
 */
function createTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS eventos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      descripcion TEXT NOT NULL,
      descripcion_larga TEXT,
      imagen TEXT,
      fecha DATE NOT NULL,
      fecha_formateada TEXT,
      hora TEXT,
      hora_fin TEXT,
      categoria TEXT,
      ubicacion TEXT,
      ubicacion_detalle TEXT,
      direccion TEXT,
      lat REAL,
      lng REAL,
      precio TEXT,
      precio_numerico REAL DEFAULT 0,
      capacidad INTEGER,
      inscritos INTEGER DEFAULT 0,
      organizador TEXT,
      accesibilidad BOOLEAN DEFAULT 0,
      destacado BOOLEAN DEFAULT 0,
      activo BOOLEAN DEFAULT 1,
      visitado BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS evento_imagenes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      url TEXT NOT NULL,
      orden INTEGER DEFAULT 0,
      FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS evento_tipos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      tipo TEXT NOT NULL,
      FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS evento_tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      tag TEXT NOT NULL,
      FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS evento_requisitos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      requisito TEXT NOT NULL,
      FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS evento_incluye (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      item TEXT NOT NULL,
      FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS evento_idiomas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      idioma TEXT NOT NULL,
      FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS evento_contacto (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER UNIQUE NOT NULL,
      email TEXT,
      telefono TEXT,
      web TEXT,
      FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_eventos_slug ON eventos(slug);
    CREATE INDEX IF NOT EXISTS idx_eventos_categoria ON eventos(categoria);
    CREATE INDEX IF NOT EXISTS idx_eventos_fecha ON eventos(fecha);
    CREATE INDEX IF NOT EXISTS idx_eventos_activo ON eventos(activo);
    CREATE INDEX IF NOT EXISTS idx_eventos_destacado ON eventos(destacado);
  `);
}

/**
 * Obtiene la instancia de la base de datos
 * @returns {Object} Instancia de la base de datos
 */
export async function getDatabase() {
  if (!db) {
    return await initDatabase();
  }
  return db;
}

/**
 * Cierra la conexión a la base de datos
 */
export function closeDatabase() {
  if (db) {
    saveDatabase();
    db.close();
    db = null;
  }
}

export default {
  initDatabase,
  getDatabase,
  closeDatabase,
  saveDatabase
};
