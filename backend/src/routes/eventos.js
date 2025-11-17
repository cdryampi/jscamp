import express from 'express';
import EventoController from '../controllers/eventoController.js';

const router = express.Router();
const eventoController = new EventoController();

/**
 * @route GET /api/eventos
 * @desc Obtiene todos los eventos
 * @query {string} categoria - Filtrar por categoría
 * @query {string} ubicacion - Filtrar por ubicación
 * @query {boolean} destacado - Filtrar por eventos destacados
 * @access Public
 */
router.get('/', eventoController.getEventos);

/**
 * @route GET /api/eventos/categorias
 * @desc Obtiene las categorías disponibles
 * @access Public
 */
router.get('/categorias', eventoController.getCategorias);

/**
 * @route GET /api/eventos/ubicaciones
 * @desc Obtiene las ubicaciones disponibles
 * @access Public
 */
router.get('/ubicaciones', eventoController.getUbicaciones);

/**
 * @route GET /api/eventos/slug/:slug
 * @desc Obtiene un evento por su slug
 * @param {string} slug - Slug del evento
 * @access Public
 */
router.get('/slug/:slug', eventoController.getEventoBySlug);

/**
 * @route GET /api/eventos/:id
 * @desc Obtiene un evento por su ID
 * @param {number} id - ID del evento
 * @access Public
 */
router.get('/:id', eventoController.getEventoById);

export default router;
