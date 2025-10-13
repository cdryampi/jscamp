// Datos de ejemplo para los eventos
const eventosData = [
  {
    id: 1,
    titulo: "Charla: cosmovisión Quechua",
    descripcion: "Disfruta de una jornada llena de música tradicional andina con artistas invitados de Perú, Bolivia y Ecuador.",
    imagen: "./img/eventos/taller_cosmovision.png",
    fecha: "2024-07-05",
    tipo: "charla",
    ubicacion: "madrid"
  },
  {
    id: 2,
    titulo: "Taller de Música Andina",
    descripcion: "Participa en un taller práctico de música andina, donde aprenderás sobre los instrumentos tradicionales.",
    imagen: "./img/eventos/taller_musica_andina.png",
    fecha: "2024-07-10",
    tipo: "taller",
    ubicacion: "barcelona"
  },
  {
    id: 3,
    titulo: "Proyección Documental",
    descripcion: "Descubre la historia y cultura a través de documentales sobre los pueblos indígenas de América Latina.",
    imagen: "./img/eventos/taller_cosmovision.png",
    fecha: "2024-07-15",
    tipo: "cultural",
    ubicacion: "madrid"
  },
  {
    id: 4,
    titulo: "Mercado Artesanal Quechua",
    descripcion: "Encuentra piezas únicas de artesanía tradicional. Textiles, cerámicas y arte hecho a mano.",
    imagen: "./img/eventos/taller_musica_andina.png",
    fecha: "2024-07-20",
    tipo: "mercado",
    ubicacion: "valencia"
  },
  {
    id: 5,
    titulo: "Danza y Música en Vivo",
    descripcion: "Disfruta de espectáculos de música y danza andina. Artistas de Perú, Bolivia y Ecuador.",
    imagen: "./img/eventos/taller_cosmovision.png",
    fecha: "2024-07-25",
    tipo: "musical",
    ubicacion: "madrid"
  },
  {
    id: 6,
    titulo: "Taller de Idioma Quechua",
    descripcion: "Iniciación al idioma quechua para principiantes. Aprende frases básicas y la estructura del idioma.",
    imagen: "./img/eventos/taller_musica_andina.png",
    fecha: "2024-08-01",
    tipo: "taller",
    ubicacion: "barcelona"
  },
  {
    id: 7,
    titulo: "Exposición de Arte Indígena",
    descripcion: "Muestra de arte contemporáneo y tradicional de artistas indígenas de toda América Latina.",
    imagen: "./img/eventos/taller_cosmovision.png",
    fecha: "2024-08-05",
    tipo: "cultural",
    ubicacion: "sevilla"
  },
  {
    id: 8,
    titulo: "Festival Gastronómico Andino",
    descripcion: "Degusta los sabores de la cocina andina preparada por chefs especializados en gastronomía tradicional.",
    imagen: "./img/eventos/taller_musica_andina.png",
    fecha: "2024-08-10",
    tipo: "gastronomico",
    ubicacion: "madrid"
  },
  {
    id: 9,
    titulo: "Ceremonia Ancestral Quechua",
    descripcion: "Participa en una ceremonia tradicional guiada por líderes espirituales de la comunidad Quechua.",
    imagen: "./img/eventos/taller_cosmovision.png",
    fecha: "2024-08-15",
    tipo: "ceremonia",
    ubicacion: "valencia"
  }
];

// Variables de estado
let paginaActual = 1;
const eventosPorPagina = 6;
let eventosFiltrados = [...eventosData];
let filtroActivo = {
  busqueda: "",
  fecha: null,
  tipo: null,
  ubicacion: null
};

// Función para renderizar eventos
const renderizarEventos = () => {
  const container = document.querySelector('.event-cards-container');
  if (!container) return;

  // Calcular índices
  const inicio = (paginaActual - 1) * eventosPorPagina;
  const fin = inicio + eventosPorPagina;
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
  eventosFiltrados = eventosData.filter(evento => {
    // Filtro de búsqueda
    if (filtroActivo.busqueda) {
      const busqueda = filtroActivo.busqueda.toLowerCase();
      const coincide = 
        evento.titulo.toLowerCase().includes(busqueda) ||
        evento.descripcion.toLowerCase().includes(busqueda);
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

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Renderizar eventos iniciales
  renderizarEventos();

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
});
