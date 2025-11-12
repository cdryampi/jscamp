import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar la paginación
 * @param {Array} items - Array de items a paginar
 * @param {number} itemsPerPage - Número de items por página
 * @returns {Object} - Objeto con estado y funciones de paginación
 */
export const usePagination = (items = [], itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular total de páginas
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Calcular índices
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Obtener items de la página actual
  const currentItems = items.slice(startIndex, endIndex);

  // Resetear a página 1 cuando cambian los items (por filtros)
  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  // Función para cambiar de página
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Función para ir a la página siguiente
  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Función para ir a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Función para ir a la primera página
  const firstPage = () => {
    goToPage(1);
  };

  // Función para ir a la última página
  const lastPage = () => {
    goToPage(totalPages);
  };

  // Resetear a página 1 manualmente
  const reset = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    currentItems,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    reset,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    itemsCount: items.length,
    showing: {
      from: items.length > 0 ? startIndex + 1 : 0,
      to: Math.min(endIndex, items.length),
      total: items.length
    }
  };
};