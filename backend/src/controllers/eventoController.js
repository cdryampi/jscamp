import EventoModel from '../models/Evento.js';

/**
 * Controlador para gestionar endpoints de eventos
 */
class EventoController {
  constructor() {
    this.eventoModel = new EventoModel();
  }

  /**
   * GET /api/eventos
   * Obtiene todos los eventos con filtros opcionales
   */
  getEventos = async (req, res) => {
    try {
      const { categoria, ubicacion, destacado } = req.query;
      
      const filters = {};
      if (categoria) filters.categoria = categoria;
      if (ubicacion) filters.ubicacion = ubicacion;
      if (destacado !== undefined) filters.destacado = destacado === 'true';
      
      const eventos = await this.eventoModel.getAll(filters);
      
      res.json({
        success: true,
        data: eventos,
        count: eventos.length
      });
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener eventos'
      });
    }
  };

  /**
   * GET /api/eventos/:id
   * Obtiene un evento por su ID
   */
  getEventoById = async (req, res) => {
    try {
      const { id } = req.params;
      const evento = await this.eventoModel.getById(parseInt(id));
      
      if (!evento) {
        return res.status(404).json({
          success: false,
          error: 'Evento no encontrado'
        });
      }
      
      res.json({
        success: true,
        data: evento
      });
    } catch (error) {
      console.error('Error al obtener evento:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener evento'
      });
    }
  };

  /**
   * GET /api/eventos/slug/:slug
   * Obtiene un evento por su slug
   */
  getEventoBySlug = async (req, res) => {
    try {
      const { slug } = req.params;
      const evento = await this.eventoModel.getBySlug(slug);
      
      if (!evento) {
        return res.status(404).json({
          success: false,
          error: 'Evento no encontrado'
        });
      }
      
      res.json({
        success: true,
        data: evento
      });
    } catch (error) {
      console.error('Error al obtener evento:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener evento'
      });
    }
  };

  /**
   * GET /api/eventos/categorias
   * Obtiene las categorías disponibles
   */
  getCategorias = async (req, res) => {
    try {
      const categorias = await this.eventoModel.getCategorias();
      
      res.json({
        success: true,
        data: categorias
      });
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener categorías'
      });
    }
  };

  /**
   * GET /api/eventos/ubicaciones
   * Obtiene las ubicaciones disponibles
   */
  getUbicaciones = async (req, res) => {
    try {
      const ubicaciones = await this.eventoModel.getUbicaciones();
      
      res.json({
        success: true,
        data: ubicaciones
      });
    } catch (error) {
      console.error('Error al obtener ubicaciones:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener ubicaciones'
      });
    }
  };
}

export default EventoController;
