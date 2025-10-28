/**
 * Módulo para renderizar eventos
 */


const EVENTOS_POR_PAGINA = 6;
let actualizarEstadoCallback = null;

/**
 * Renderiza los eventos en el DOM
 * @param {Array} eventos - Array de eventos a renderizar
 * @param {number} pagina - Número de página actual
 * @param {Function} onEstadoVisitadoChange - Callback para actualizar estado
 */

export const renderizarEventos = (eventos, pagina = 1, onEstadoVisitadoChange = null) => {
  console.log('📋 Renderizando', eventos.length, 'eventos - página:', pagina);
  
  // Guardar el callback para usarlo en el listener
  if (onEstadoVisitadoChange) {
    actualizarEstadoCallback = onEstadoVisitadoChange;
  }
  
  const contenedor = document.getElementById('eventos-container');
  
  if (!contenedor) {
    console.error('❌ No se encontró el contenedor #eventos-container');
    return;
  }

  const inicio = (pagina - 1) * EVENTOS_POR_PAGINA;
  const fin = inicio + EVENTOS_POR_PAGINA;
  const eventosPagina = eventos.slice(inicio, fin);

  console.log(`Mostrando eventos ${inicio + 1} a ${Math.min(fin, eventos.length)} de ${eventos.length}`);

  if (eventosPagina.length === 0) {
    contenedor.innerHTML = '<div class="no-results"><p>No se encontraron eventos que coincidan con los filtros.</p></div>';
    
    const paginacionContainer = document.getElementById('pagination');
    if (paginacionContainer) {
      paginacionContainer.innerHTML = '';
    }
    return;
  }

  contenedor.innerHTML = eventosPagina.map(evento => `
    <indio-card
      id="${evento.id}"
      imageUrl="${evento.imagen}"
      titulo="${evento.nombre || evento.titulo}"
      fecha="${evento.fecha}"
      tipo="${evento.categoria || evento.tipo}"
      descripcion="${evento.descripcion}"
      ubicacion="${evento.ubicacion}"
      precio="${evento.precio}"
      visitado="${evento.visitado || false}"
      viewmode="card"
    ></indio-card>
  `).join('');

  console.log('✓', eventosPagina.length, 'eventos renderizados');
  
  // Configurar listener para eventos visitado-changed
  configurarListenerVisitado(contenedor);
  
  actualizarPaginacion(eventos.length, pagina);
};

/**
 * Configura el listener para eventos visitado-changed
 * @param {HTMLElement} contenedor - Contenedor de eventos
 */
const configurarListenerVisitado = (contenedor) => {
  // Remover listener anterior si existe
  contenedor.removeEventListener('visitado-changed', handleVisitadoChanged);
  
  // Agregar nuevo listener
  contenedor.addEventListener('visitado-changed', handleVisitadoChanged);
};

/**
 * Manejador del evento visitado-changed.
 * @param {CustomEvent} e - Evento custom
 */
const handleVisitadoChanged = (e) => {
  const { id } = e.detail;
  console.log(`📢 Evento visitado-changed recibido para ID: ${id}`);
  if (actualizarEstadoCallback) {
    actualizarEstadoCallback(id);
  } else {
    console.warn('⚠ No hay callback configurado para actualizar estado');
  }
};

/**
 * Carga el estado de visitados desde localStorage
 * @param {Array} eventos - Array de eventos a actualizar
 */
export const cargarEstadoVisitados = (eventos) => {
  const visitados = JSON.parse(localStorage.getItem('eventosVisitados') || '[]');
  
  eventos.forEach(evento => {
    if (visitados.includes(evento.id)) {
      evento.visitado = true;
    }
  });
  
  console.log('📂 Cargados', visitados.length, 'eventos visitados desde localStorage');
  return eventos;
};

/**
 * Actualiza los controles de paginación
 * @param {number} totalEventos - Total de eventos
 * @param {number} paginaActual - Página actual
 */
const actualizarPaginacion = (totalEventos, paginaActual) => {
  const totalPaginas = Math.ceil(totalEventos / EVENTOS_POR_PAGINA);
  const paginacionContainer = document.getElementById('pagination');
  
  if (!paginacionContainer) {
    console.warn('⚠ No se encontró #pagination');
    return;
  }

  paginacionContainer.innerHTML = '';

  if (totalPaginas <= 1) {
    console.log('Solo 1 página, ocultando paginador');
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'pagination-wrapper';

  const btnAnterior = document.createElement('button');
  btnAnterior.className = 'btn-pagination';
  btnAnterior.disabled = paginaActual === 1;
  btnAnterior.innerHTML = '<span class="icon">←</span> Anterior';
  btnAnterior.dataset.pagina = paginaActual - 1;
  wrapper.appendChild(btnAnterior);

  const maxBotones = 5;
  let inicio = Math.max(1, paginaActual - Math.floor(maxBotones / 2));
  let fin = Math.min(totalPaginas, inicio + maxBotones - 1);
  
  if (fin - inicio < maxBotones - 1) {
    inicio = Math.max(1, fin - maxBotones + 1);
  }

  if (inicio > 1) {
    const btn1 = document.createElement('button');
    btn1.className = 'pagination-number';
    btn1.textContent = '1';
    btn1.dataset.pagina = '1';
    wrapper.appendChild(btn1);

    if (inicio > 2) {
      const dots = document.createElement('span');
      dots.className = 'pagination-dots';
      dots.textContent = '...';
      wrapper.appendChild(dots);
    }
  }

  for (let i = inicio; i <= fin; i++) {
    const btnNum = document.createElement('button');
    btnNum.className = 'pagination-number';
    if (i === paginaActual) {
      btnNum.classList.add('active');
    }
    btnNum.textContent = i;
    btnNum.dataset.pagina = i;
    wrapper.appendChild(btnNum);
  }

  if (fin < totalPaginas) {
    if (fin < totalPaginas - 1) {
      const dots = document.createElement('span');
      dots.className = 'pagination-dots';
      dots.textContent = '...';
      wrapper.appendChild(dots);
    }

    const btnUltimo = document.createElement('button');
    btnUltimo.className = 'pagination-number';
    btnUltimo.textContent = totalPaginas;
    btnUltimo.dataset.pagina = totalPaginas;
    wrapper.appendChild(btnUltimo);
  }

  const info = document.createElement('span');
  info.className = 'pagination-info';
  info.innerHTML = `Página <strong>${paginaActual}</strong> de <strong>${totalPaginas}</strong>`;
  wrapper.appendChild(info);

  const btnSiguiente = document.createElement('button');
  btnSiguiente.className = 'btn-pagination';
  btnSiguiente.disabled = paginaActual === totalPaginas;
  btnSiguiente.innerHTML = 'Siguiente <span class="icon">→</span>';
  btnSiguiente.dataset.pagina = paginaActual + 1;
  wrapper.appendChild(btnSiguiente);

  paginacionContainer.appendChild(wrapper);
  
  console.log(`✓ Paginación renderizada: ${paginaActual} de ${totalPaginas}`);
};

/**
 * Configura los event listeners de paginación
 * @param {Function} onPageChange - Callback cuando cambia la página
 */
export const configurarPaginacion = (onPageChange) => {
  const paginacionContainer = document.getElementById('pagination');
                              
  if (!paginacionContainer) {
    console.warn('⚠ No se encontró #pagination');
    return;
  }

  paginacionContainer.addEventListener('click', (e) => {
    const button = e.target.closest('button[data-pagina]');
    if (button && !button.disabled) {
      const nuevaPagina = parseInt(button.dataset.pagina);
      console.log('📄 Cambiando a página:', nuevaPagina);
      onPageChange(nuevaPagina);
      
      const contenedor = document.getElementById('eventos-container');
      if (contenedor) {
        contenedor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
  
  console.log('✓ Listener de paginación configurado');
};