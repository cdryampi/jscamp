/**
 * Módulo para renderizar eventos
 */

const EVENTOS_POR_PAGINA = 6;

/**
 * Renderiza los eventos en el DOM
 * @param {Array} eventos - Array de eventos a renderizar
 * @param {number} pagina - Número de página actual
 */
export const renderizarEventos = (eventos, pagina = 1) => {
  console.log('📋 Renderizando', eventos.length, 'eventos - página:', pagina);
  
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
    
    // Limpiar paginación
    const paginacionContainer = document.getElementById('pagination');
    if (paginacionContainer) {
      paginacionContainer.innerHTML = '';
    }
    return;
  }

  contenedor.innerHTML = eventosPagina.map(evento => `
    <article class="evento-card">
      ${evento.imagen ? `
        <div class="card-image">
          <img src="${evento.imagen}" alt="${evento.nombre || evento.titulo}" loading="lazy">
        </div>
      ` : ''}
      <div class="evento-info">
        <h3 class="evento-titulo">${evento.nombre || evento.titulo}</h3>
        <div class="evento-meta">
          ${evento.fecha ? `<p class="evento-fecha">📅 ${evento.fecha}</p>` : ''}
          ${evento.categoria || evento.tipo ? `<span class="evento-categoria">${evento.categoria || evento.tipo}</span>` : ''}
        </div>
        ${evento.descripcion ? `<p class="evento-descripcion">${evento.descripcion}</p>` : ''}
        ${evento.ubicacion ? `<p class="evento-ubicacion">📍 ${evento.ubicacion}</p>` : ''}
        ${evento.precio !== undefined ? `<p class="evento-precio">${evento.precio === 0 || evento.precio === 'Gratis' ? 'Gratis' : `${evento.precio}€`}</p>` : ''}
        <div class="card-actions">
          <button class="btn-detalles" data-id="${evento.id}">Ver detalles</button>
        </div>
      </div>
    </article>
  `).join('');

  console.log('✓', eventosPagina.length, 'eventos renderizados');
  actualizarPaginacion(eventos.length, pagina);
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

  // Limpiar contenedor
  paginacionContainer.innerHTML = '';

  if (totalPaginas <= 1) {
    console.log('Solo 1 página, ocultando paginador');
    return;
  }

  // Crear wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'pagination-wrapper';

  // Botón Anterior
  const btnAnterior = document.createElement('button');
  btnAnterior.className = 'btn-pagination';
  btnAnterior.disabled = paginaActual === 1;
  btnAnterior.innerHTML = '<span class="icon">←</span> Anterior';
  btnAnterior.dataset.pagina = paginaActual - 1;
  wrapper.appendChild(btnAnterior);

  // Números de página
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

  // Info de página
  const info = document.createElement('span');
  info.className = 'pagination-info';
  info.innerHTML = `Página <strong>${paginaActual}</strong> de <strong>${totalPaginas}</strong>`;
  wrapper.appendChild(info);

  // Botón Siguiente
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
      
      // Scroll suave al contenedor de eventos
      const contenedor = document.getElementById('eventos-container');
      if (contenedor) {
        contenedor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
  
  console.log('✓ Listener de paginación configurado');
};