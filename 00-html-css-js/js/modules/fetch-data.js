/**
 * Módulo para obtener datos de eventos
 */

const API_URL = './js/data/eventos.json';



/**
 * Obtiene los eventos desde el archivo JSON
 * @returns {Promise<Array>} Array de eventos
 */
export const fetchEventos = async () => {
  try {
    console.log('Intentando cargar eventos desde:', API_URL);
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Eventos cargados:', data);
    return data.eventos || data || [];
  } catch (error) {
    console.error('Error al cargar eventos:', error);
    return [];
  }
};

/**
 * Obtiene un evento por su ID
 * @param {number|string} id - ID del evento
 * @returns {Promise<Object|null>} Evento encontrado o null si no existe
 */
export const fetchEventoById = async (id) => {
  try {
    const eventos = await fetchEventos();
    const evento = eventos.find(ev => ev.id.toString() === id.toString());
    return evento || null;
  } catch (error) {
    console.error(`Error al obtener evento con ID ${id}:`, error);
    return null;
  }
};