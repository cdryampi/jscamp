import api from './axiosConfig';

/**
 * Servicio para gestionar eventos
 */
const eventosService = {
  /**
   * Obtener todos los eventos con filtros opcionales
   * @param {Object} params - Parámetros de filtrado
   * @returns {Promise<Array>} Lista de eventos
   */
  getEventos: async (params = {}) => {
    try {
      const response = await api.get('/api/eventos', { params });
      return response.data || [];
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      throw error;
    }
  },

  /**
   * Obtener un evento por ID
   * @param {number} id - ID del evento
   * @returns {Promise<Object>} Evento
   */
  getEventoById: async (id) => {
    try {
      const response = await api.get('/api/eventos', { 
        params: { id } 
      });
      return response.data;
    } catch (error) {
      console.error(`Error al obtener evento ${id}:`, error);
      throw error;
    }
  },

  /**
   * Obtener un evento por slug
   * @param {string} slug - Slug del evento
   * @returns {Promise<Object>} Evento
   */
  getEventoBySlug: async (slug) => {
    try {
      const response = await api.get('/api/eventos', { 
        params: { slug } 
      });
      return response.data;
    } catch (error) {
      console.error(`Error al obtener evento ${slug}:`, error);
      throw error;
    }
  },

  /**
   * Obtener eventos por categoría
   * @param {string} categoria - Categoría
   * @returns {Promise<Array>} Lista de eventos
   */
  getEventosPorCategoria: async (categoria) => {
    try {
      const response = await api.get('/api/eventos', { 
        params: { categoria } 
      });
      return response.data || [];
    } catch (error) {
      console.error(`Error al obtener eventos de categoría ${categoria}:`, error);
      throw error;
    }
  },

  /**
   * Obtener eventos por ubicación
   * @param {string} ubicacion - Ubicación
   * @returns {Promise<Array>} Lista de eventos
   */
  getEventosPorUbicacion: async (ubicacion) => {
    try {
      const response = await api.get('/api/eventos', { 
        params: { ubicacion } 
      });
      return response.data || [];
    } catch (error) {
      console.error(`Error al obtener eventos de ubicación ${ubicacion}:`, error);
      throw error;
    }
  },

  /**
   * Obtener eventos destacados
   * @returns {Promise<Array>} Lista de eventos destacados
   */
  getEventosDestacados: async () => {
    try {
      const response = await api.get('/api/eventos', { 
        params: { destacado: true } 
      });
      return response.data || [];
    } catch (error) {
      console.error('Error al obtener eventos destacados:', error);
      throw error;
    }
  },

  /**
   * Obtener todas las categorías disponibles
   * @returns {Promise<Array>} Lista de categorías
   */
  getCategorias: async () => {
    try {
      const response = await api.get('/api/categorias');
      return response.data || [];
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error;
    }
  },

  /**
   * Obtener todas las ubicaciones disponibles
   * @returns {Promise<Array>} Lista de ubicaciones
   */
  getUbicaciones: async () => {
    try {
      const response = await api.get('/api/ubicaciones');
      return response.data || [];
    } catch (error) {
      console.error('Error al obtener ubicaciones:', error);
      throw error;
    }
  },
};

export default eventosService;
