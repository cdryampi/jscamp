
/**
 * Clave para almacenar el ID del evento en localStorage
 * @type {string}
 */

export const KEY_EVENTO = 'evento_id';
/**
 * Módulo para setear y obtener datos del localStorage especialmente para el ID del evento clickado como úlitimo, esto nos ayudará a poder obtener datos del evento en detalle_evento.html
 * @param {string} key - La clave bajo la cual se almacenan los datos
 * @param {any} value - El valor a almacenar
 */
export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(`💾 LocalStorage: Datos guardados bajo la clave "${key}"`)
    } catch (error) {
    console.error(`❌ LocalStorage: Error al guardar datos bajo la clave "${key}":`, error);
    }
};

export const getLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    console.log(`💾 LocalStorage: Datos obtenidos bajo la clave "${key} : ${value}"`)
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`❌ LocalStorage: Error al obtener datos bajo la clave "${key}":`, error);
    return null;
  }
};