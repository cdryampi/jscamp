/**
 * Módulo para filtrar eventos
 */

/**
 * Aplica filtros a los eventos
 * @param {Array} eventos - Array de eventos
 * @param {Object} filtros - Objeto con los filtros a aplicar
 * @returns {Array} Eventos filtrados
 */
export const aplicarFiltros = (eventos, filtros) => {
  console.log('Aplicando filtros:', filtros, 'a', eventos.length, 'eventos');
  
  // ⚠️ NO usar [...eventos], usar filter directo para mantener referencias
  let resultado = eventos.filter(evento => {
    // Filtro por búsqueda
    if (filtros.busqueda && filtros.busqueda.trim() !== '') {
      const busqueda = filtros.busqueda.toLowerCase().trim();
      const coincide = 
        evento.nombre?.toLowerCase().includes(busqueda) ||
        evento.descripcion?.toLowerCase().includes(busqueda) ||
        evento.titulo?.toLowerCase().includes(busqueda) ||
        evento.ubicacion?.toLowerCase().includes(busqueda);
      
      if (!coincide) return false;
    }

    // Filtro por tipo de evento
    if (filtros.tipo.length > 0 && filtros.tipo !== '') {
      const tiposFiltro = filtros.tipo.split(',');
      const tiposEvento = evento.tipo || [];
      
      const coincide = tiposFiltro.some(tipoFiltro =>
        tiposEvento.some(t => t.toLowerCase() === tipoFiltro.toLowerCase())
      );
      
      if (!coincide) return false;
    }

    // Filtro por ubicación
    if (filtros.ubicacion && filtros.ubicacion !== '') {
      if (!evento.ubicacion?.toLowerCase().includes(filtros.ubicacion.toLowerCase())) {
        return false;
      }
    }

    // Filtro por fecha/mes
    if (filtros.fecha && filtros.fecha !== '') {
      const coincide = 
        evento.fecha?.toLowerCase().includes(filtros.fecha.toLowerCase()) ||
        evento.mes?.toLowerCase() === filtros.fecha.toLowerCase();
      
      if (!coincide) return false;
    }

    return true;
  });

  console.log('Eventos filtrados:', resultado.length);
  return resultado;
};

/**
 * Configura los event listeners de los filtros
 * @param {Array} eventosData - Array de eventos original
 * @param {Function} onFilter - Callback cuando se aplica un filtro
 */
export const configurarFiltros = (eventosData, onFilter) => {
  console.log('Configurando filtros con', eventosData.length, 'eventos');
  
  // Obtener elementos del DOM con los IDs correctos del HTML
  const searchInput = document.getElementById('search-input');
  const tipoSelect = document.getElementById('filter-tipo');
  const ubicacionSelect = document.getElementById('filter-ubicacion');
  const fechaSelect = document.getElementById('filter-fecha');
  const clearButton = document.getElementById('clear-filters');
  const searchButton = document.getElementById('search-button');

  console.log('Elementos encontrados:', {
    searchInput: !!searchInput,
    tipoSelect: !!tipoSelect,
    ubicacionSelect: !!ubicacionSelect,
    fechaSelect: !!fechaSelect,
    clearButton: !!clearButton,
    searchButton: !!searchButton
  });

  const aplicarFiltrosActuales = () => {
    const filtros = {
      busqueda: searchInput?.value || '',
      tipo: tipoSelect?.value || '',
      ubicacion: ubicacionSelect?.value || '',
      fecha: fechaSelect?.value || ''
    };

    console.log('Filtros aplicados:', filtros);
    const filtrados = aplicarFiltros(eventosData, filtros);
    onFilter(filtrados);
  };

  // Event listeners
  if (searchInput) {
    searchInput.addEventListener('input', aplicarFiltrosActuales);
    console.log('✓ Listener de búsqueda configurado');
  }

  if (searchButton) {
    searchButton.addEventListener('click', aplicarFiltrosActuales);
    console.log('✓ Listener de botón búsqueda configurado');
  }

  if (tipoSelect) {
    tipoSelect.addEventListener('change', aplicarFiltrosActuales);
    console.log('✓ Listener de tipo configurado');
  }

  if (ubicacionSelect) {
    ubicacionSelect.addEventListener('change', aplicarFiltrosActuales);
    console.log('✓ Listener de ubicación configurado');
  }

  if (fechaSelect) {
    fechaSelect.addEventListener('change', aplicarFiltrosActuales);
    console.log('✓ Listener de fecha configurado');
  }

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      console.log('Limpiando filtros...');
      if (searchInput) searchInput.value = '';
      if (tipoSelect) tipoSelect.value = '';
      if (ubicacionSelect) ubicacionSelect.value = '';
      if (fechaSelect) fechaSelect.value = '';
      aplicarFiltrosActuales();
    });
    console.log('✓ Listener de limpiar filtros configurado');
  }
};