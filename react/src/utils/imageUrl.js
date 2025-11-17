/**
 * Construye la URL completa de una imagen desde el servidor de Vercel
 * @param {string} imagePath - Ruta relativa de la imagen (ej: "assets/images/eventos/evento1.jpg")
 * @returns {string} URL completa de la imagen
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // Si ya es una URL completa (http/https), retornarla tal cual
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Obtener la URL base del API de Vercel
  const API_URL = import.meta.env.VITE_VERCEL_API_URL || 'http://localhost:3001';
  
  // Eliminar barras al inicio si las tiene
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Construir la URL completa
  return `${API_URL}/${cleanPath}`;
};

/**
 * Construye la URL de una imagen de evento
 * @param {string} filename - Nombre del archivo de imagen
 * @returns {string} URL completa de la imagen
 */
export const getEventImageUrl = (filename) => {
  if (!filename) return '';
  
  // Si ya incluye la ruta completa, usar getImageUrl directamente
  if (filename.includes('/')) {
    return getImageUrl(filename);
  }
  
  // Si es solo el nombre del archivo, construir la ruta
  return getImageUrl(`assets/images/eventos/${filename}`);
};
