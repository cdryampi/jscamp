import { getDatabase } from '../db/database.js';

/**
 * Modelo para gestionar eventos en la base de datos
 */
class EventoModel {
  constructor() {
    this.db = null;
  }

  async init() {
    this.db = await getDatabase();
  }

  /**
   * Obtiene todos los eventos con filtros opcionales
   * @param {Object} filters - Filtros de búsqueda
   * @returns {Array} Lista de eventos
   */
  async getAll(filters = {}) {
    await this.init();
    
    let query = `
      SELECT 
        e.*,
        GROUP_CONCAT(DISTINCT ei.url) as imagenes,
        GROUP_CONCAT(DISTINCT et.tipo) as tipos,
        GROUP_CONCAT(DISTINCT etg.tag) as tags,
        GROUP_CONCAT(DISTINCT er.requisito) as requisitos,
        GROUP_CONCAT(DISTINCT einc.item) as incluye,
        GROUP_CONCAT(DISTINCT eid.idioma) as idiomas,
        ec.email as contacto_email,
        ec.telefono as contacto_telefono,
        ec.web as contacto_web
      FROM eventos e
      LEFT JOIN evento_imagenes ei ON e.id = ei.evento_id
      LEFT JOIN evento_tipos et ON e.id = et.evento_id
      LEFT JOIN evento_tags etg ON e.id = etg.evento_id
      LEFT JOIN evento_requisitos er ON e.id = er.evento_id
      LEFT JOIN evento_incluye einc ON e.id = einc.evento_id
      LEFT JOIN evento_idiomas eid ON e.id = eid.evento_id
      LEFT JOIN evento_contacto ec ON e.id = ec.evento_id
      WHERE e.activo = 1
    `;

    if (filters.categoria) {
      query += ` AND e.categoria = '${filters.categoria.replace(/'/g, "''")}'`;
    }

    if (filters.ubicacion) {
      query += ` AND e.ubicacion LIKE '%${filters.ubicacion.replace(/'/g, "''")}%'`;
    }

    if (filters.destacado !== undefined) {
      query += ` AND e.destacado = ${filters.destacado ? 1 : 0}`;
    }

    query += ' GROUP BY e.id';
    query += ' ORDER BY e.fecha ASC, e.hora ASC';

    const result = this.db.exec(query);
    
    if (result.length === 0 || !result[0].values || result[0].values.length === 0) return [];
    
    const eventos = this.resultToObjects(result[0]);
    return eventos.map(e => this.formatEvento(e));
  }

  /**
   * Obtiene un evento por su ID
   * @param {number} id - ID del evento
   * @returns {Object|null} Evento o null si no existe
   */
  async getById(id) {
    await this.init();
    
    const query = `
      SELECT 
        e.*,
        GROUP_CONCAT(DISTINCT ei.url) as imagenes,
        GROUP_CONCAT(DISTINCT et.tipo) as tipos,
        GROUP_CONCAT(DISTINCT etg.tag) as tags,
        GROUP_CONCAT(DISTINCT er.requisito) as requisitos,
        GROUP_CONCAT(DISTINCT einc.item) as incluye,
        GROUP_CONCAT(DISTINCT eid.idioma) as idiomas,
        ec.email as contacto_email,
        ec.telefono as contacto_telefono,
        ec.web as contacto_web
      FROM eventos e
      LEFT JOIN evento_imagenes ei ON e.id = ei.evento_id
      LEFT JOIN evento_tipos et ON e.id = et.evento_id
      LEFT JOIN evento_tags etg ON e.id = etg.evento_id
      LEFT JOIN evento_requisitos er ON e.id = er.evento_id
      LEFT JOIN evento_incluye einc ON e.id = einc.evento_id
      LEFT JOIN evento_idiomas eid ON e.id = eid.evento_id
      LEFT JOIN evento_contacto ec ON e.id = ec.evento_id
      WHERE e.id = ${parseInt(id)} AND e.activo = 1
      GROUP BY e.id
    `;

    const result = this.db.exec(query);
    
    if (result.length === 0 || !result[0].values || result[0].values.length === 0) return null;
    
    const eventos = this.resultToObjects(result[0]);
    return this.formatEvento(eventos[0]);
  }

  /**
   * Obtiene un evento por su slug
   * @param {string} slug - Slug del evento
   * @returns {Object|null} Evento o null si no existe
   */
  async getBySlug(slug) {
    await this.init();
    
    const query = `
      SELECT 
        e.*,
        GROUP_CONCAT(DISTINCT ei.url) as imagenes,
        GROUP_CONCAT(DISTINCT et.tipo) as tipos,
        GROUP_CONCAT(DISTINCT etg.tag) as tags,
        GROUP_CONCAT(DISTINCT er.requisito) as requisitos,
        GROUP_CONCAT(DISTINCT einc.item) as incluye,
        GROUP_CONCAT(DISTINCT eid.idioma) as idiomas,
        ec.email as contacto_email,
        ec.telefono as contacto_telefono,
        ec.web as contacto_web
      FROM eventos e
      LEFT JOIN evento_imagenes ei ON e.id = ei.evento_id
      LEFT JOIN evento_tipos et ON e.id = et.evento_id
      LEFT JOIN evento_tags etg ON e.id = etg.evento_id
      LEFT JOIN evento_requisitos er ON e.id = er.evento_id
      LEFT JOIN evento_incluye einc ON e.id = einc.evento_id
      LEFT JOIN evento_idiomas eid ON e.id = eid.evento_id
      LEFT JOIN evento_contacto ec ON e.id = ec.evento_id
      WHERE e.slug = '${slug.replace(/'/g, "''")}' AND e.activo = 1
      GROUP BY e.id
    `;

    const result = this.db.exec(query);
    
    if (result.length === 0 || !result[0].values || result[0].values.length === 0) return null;
    
    const eventos = this.resultToObjects(result[0]);
    return this.formatEvento(eventos[0]);
  }

  /**
   * Convierte resultado de sql.js a array de objetos
   * @param {Object} result - Resultado de la consulta
   * @returns {Array} Array de objetos
   */
  resultToObjects(result) {
    const { columns, values } = result;
    return values.map(row => {
      const obj = {};
      columns.forEach((col, i) => {
        obj[col] = row[i];
      });
      return obj;
    });
  }

  /**
   * Formatea un evento para la respuesta de la API
   * @param {Object} evento - Evento desde la base de datos
   * @returns {Object} Evento formateado
   */
  formatEvento(evento) {
    return {
      id: evento.id,
      titulo: evento.titulo,
      slug: evento.slug,
      descripcion: evento.descripcion,
      descripcionLarga: evento.descripcion_larga,
      imagen: evento.imagen,
      imagenes: evento.imagenes ? evento.imagenes.split(',') : [],
      fecha: evento.fecha,
      fechaFormateada: evento.fecha_formateada,
      hora: evento.hora,
      horaFin: evento.hora_fin,
      tipo: evento.tipos ? evento.tipos.split(',') : [],
      categoria: evento.categoria,
      ubicacion: evento.ubicacion,
      ubicacionDetalle: evento.ubicacion_detalle,
      direccion: evento.direccion,
      coordenadas: evento.lat && evento.lng ? {
        lat: evento.lat,
        lng: evento.lng
      } : null,
      precio: evento.precio,
      precioNumerico: evento.precio_numerico,
      capacidad: evento.capacidad,
      inscritos: evento.inscritos,
      organizador: evento.organizador,
      contacto: evento.contacto_email ? {
        email: evento.contacto_email,
        telefono: evento.contacto_telefono,
        web: evento.contacto_web
      } : null,
      tags: evento.tags ? evento.tags.split(',') : [],
      requisitos: evento.requisitos ? evento.requisitos.split(',') : [],
      incluye: evento.incluye ? evento.incluye.split(',') : [],
      idiomas: evento.idiomas ? evento.idiomas.split(',') : [],
      accesibilidad: Boolean(evento.accesibilidad),
      destacado: Boolean(evento.destacado),
      activo: Boolean(evento.activo),
      visitado: Boolean(evento.visitado)
    };
  }

  /**
   * Obtiene las categorías disponibles
   * @returns {Array} Lista de categorías únicas
   */
  async getCategorias() {
    await this.init();
    
    const query = 'SELECT DISTINCT categoria FROM eventos WHERE activo = 1 AND categoria IS NOT NULL';
    const result = this.db.exec(query);
    
    if (result.length === 0) return [];
    
    return result[0].values.map(row => row[0]);
  }

  /**
   * Obtiene las ubicaciones disponibles
   * @returns {Array} Lista de ubicaciones únicas
   */
  async getUbicaciones() {
    await this.init();
    
    const query = 'SELECT DISTINCT ubicacion FROM eventos WHERE activo = 1 AND ubicacion IS NOT NULL';
    const result = this.db.exec(query);
    
    if (result.length === 0) return [];
    
    return result[0].values.map(row => row[0]);
  }
}

export default EventoModel;
