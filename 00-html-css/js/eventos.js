// Función para renderizar eventos
const renderizarEventos = () => {
  const container = document.querySelector('.event-cards-container');
  if (!container) return;

  // Calcular índices
  const inicio = (paginaActual - 1) * eventosPorPagina;
  const fin = inicio + eventosPorPagina;
  console.log('Eventos filtrados:', eventosFiltrados);
  const eventosAPaginar = eventosFiltrados.slice(inicio, fin);

  // Limpiar contenedor
  container.innerHTML = '';

  // Renderizar eventos
  eventosAPaginar.forEach(evento => {
    const card = crearTarjetaEvento(evento);
    container.appendChild(card);
  });

  // Actualizar paginador
  actualizarPaginador();
}

// Función para crear tarjeta de evento
const crearTarjetaEvento = (evento) => {
  const card = document.createElement('div');
  card.className = 'event-card';
  card.innerHTML = `
    <img src="${evento.imagen}" alt="${evento.titulo}">
    <h4>${evento.titulo}</h4>
    <p>${evento.descripcion}</p>
    <button>Ver detalles</button>
  `;
  return card;
}

// Función para actualizar paginador
const actualizarPaginador = () => {
  const totalPaginas = Math.ceil(eventosFiltrados.length / eventosPorPagina);
  const paginador = document.querySelector('.pagination');
  if (!paginador) return;

  // Limpiar paginador
  paginador.innerHTML = '';

  // Botón anterior
  const btnPrev = document.createElement('button');
  btnPrev.className = 'pagination-btn';
  btnPrev.id = 'prev-page';
  btnPrev.disabled = paginaActual === 1;
  btnPrev.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `;
  btnPrev.addEventListener('click', () => {
    if (paginaActual > 1) {
      paginaActual--;
      renderizarEventos();
      scrollToSection();
    }
  });
  paginador.appendChild(btnPrev);

  // Botones de número de página
  for (let i = 1; i <= totalPaginas; i++) {
    const btnNum = document.createElement('button');
    btnNum.className = 'pagination-number';
    if (i === paginaActual) {
      btnNum.classList.add('active');
    }
    btnNum.textContent = i;
    btnNum.addEventListener('click', () => {
      paginaActual = i;
      renderizarEventos();
      scrollToSection();
    });
    paginador.appendChild(btnNum);
  }

  // Botón siguiente
  const btnNext = document.createElement('button');
  btnNext.className = 'pagination-btn';
  btnNext.id = 'next-page';
  btnNext.disabled = paginaActual === totalPaginas;
  btnNext.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `;
  btnNext.addEventListener('click', () => {
    if (paginaActual < totalPaginas) {
      paginaActual++;
      renderizarEventos();
      scrollToSection();
    }
  });
  paginador.appendChild(btnNext);
}

// Función para scroll suave a la sección
const scrollToSection = () => {
  const section = document.querySelector('.event-cards-container');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Función para filtrar eventos
const filtrarEventos = () => {
  if (eventosData.length === 0) {
    console.warn('No hay eventos disponibles para filtrar');
    return;
  }

  eventosFiltrados = eventosData.filter(evento => {
    // Filtro de búsqueda
    if (filtroActivo.busqueda) {
      const busqueda = filtroActivo.busqueda.toLowerCase();
      const coincide = evento.titulo.toLowerCase().includes(busqueda) || evento.descripcion.toLowerCase().includes(busqueda);
      if (!coincide) return false;
    }

    // Filtro de tipo
    if (filtroActivo.tipo && evento.tipo !== filtroActivo.tipo) {
      return false;
    }

    // Filtro de ubicación
    if (filtroActivo.ubicacion && evento.ubicacion !== filtroActivo.ubicacion) {
      return false;
    }

    // Filtro de fecha (mes)
    if (filtroActivo.fecha) {
      const fechaEvento = new Date(evento.fecha);
      const mes = fechaEvento.toLocaleDateString('es-ES', { month: 'long' });
      if (!mes.includes(filtroActivo.fecha)) {
        return false;
      }
    }

    return true;
  });

  paginaActual = 1; // Resetear a la primera página
  renderizarEventos();
}

// Función para limpiar filtros
const limpiarFiltros = () => {
  filtroActivo = {
    busqueda: "",
    fecha: null,
    tipo: null,
    ubicacion: null
  };
  
  // Limpiar inputs
  const searchInput = document.getElementById('search-input');
  const filterTipo = document.getElementById('filter-tipo');
  const filterUbicacion = document.getElementById('filter-ubicacion');
  const filterFecha = document.getElementById('filter-fecha');
  
  if (searchInput) searchInput.value = '';
  if (filterTipo) filterTipo.value = '';
  if (filterUbicacion) filterUbicacion.value = '';
  if (filterFecha) filterFecha.value = '';
  
  filtrarEventos();
}

// Variables de estado
let paginaActual = 1;
const eventosPorPagina = 6;
let eventosData = [];
let eventosFiltrados = [];

let filtroActivo = {
  busqueda: "",
  fecha: null,
  tipo: null,
  ubicacion: null
};

// Función para recuperar los eventos desde el archivo data.json
const fetchEventos = async () => {
  try {
    const response = await fetch("./js/data.json");
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar los eventos:', error);
    return [];
  }
};

// Inicializar datos y renderizar
const inicializarEventos = async () => {
  eventosData = await fetchEventos();
  eventosFiltrados = [...eventosData];
  paginaActual = 1;
  renderizarEventos();
  configurarEventListeners();
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar eventos (cargar desde JSON)
  inicializarEventos();
});

// Configurar event listeners de búsqueda y filtros
const configurarEventListeners = () => {
  // Búsqueda
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      filtroActivo.busqueda = searchInput.value;
      filtrarEventos();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        filtroActivo.busqueda = searchInput.value;
        filtrarEventos();
      }
    });
  }

  // Filtros rápidos con select
  const filterTipo = document.getElementById('filter-tipo');
  const filterUbicacion = document.getElementById('filter-ubicacion');
  const filterFecha = document.getElementById('filter-fecha');
  const clearFiltersBtn = document.getElementById('clear-filters');

  if (filterTipo) {
    filterTipo.addEventListener('change', (e) => {
      filtroActivo.tipo = e.target.value || null;
      filtrarEventos();
    });
  }

  if (filterUbicacion) {
    filterUbicacion.addEventListener('change', (e) => {
      filtroActivo.ubicacion = e.target.value || null;
      filtrarEventos();
    });
  }

  if (filterFecha) {
    filterFecha.addEventListener('change', (e) => {
      filtroActivo.fecha = e.target.value || null;
      filtrarEventos();
    });
  }

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', limpiarFiltros);
  }
};


