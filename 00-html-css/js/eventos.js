import { fetchEventos } from './modules/fetch-data.js';
import { aplicarFiltros, configurarFiltros } from './modules/filters.js';
import { renderizarEventos, configurarPaginacion, cargarEstadoVisitados } from './modules/render.js';

// Estado global
let eventosData = [];
let eventosFiltrados = [];
let paginaActual = 1;

// Función para actualizar el estado visitado SOLO en eventosData (el origen)
const actualizarEstadoVisitado = (id) => {
  console.log(`🎯 Actualizando evento ${id} en eventosData`);
  
  // SOLO actualizar en eventosData (el origen)
  const evento = eventosData.find(ev => ev.id === id);
  if (evento) {
    evento.visitado = true;
    console.log(`✓ Evento ${id} actualizado en eventosData`);
    console.log('Estado actual del evento:', evento);
    
    // Guardar en localStorage
    const visitados = JSON.parse(localStorage.getItem('eventosVisitados') || '[]');
    if (!visitados.includes(id)) {
      visitados.push(id);
      localStorage.setItem('eventosVisitados', JSON.stringify(visitados));
      console.log('💾 Estado guardado en localStorage');
    }
  } else {
    console.error(`❌ No se encontró evento con ID ${id} en eventosData`);
  }
};

// Inicializar datos y renderizar
const inicializarEventos = async () => {
  try {
    console.log('=== Iniciando carga de eventos ===');
    eventosData = await fetchEventos();
    console.log('Eventos cargados:', eventosData.length);
    
    // ✅ IMPORTANTE: Cargar estados visitados ANTES de hacer cualquier cosa
    cargarEstadoVisitados(eventosData);
    
    eventosFiltrados = eventosData;
    paginaActual = 1;
    
    console.log('Renderizando eventos iniciales...');
    renderizarEventos(eventosFiltrados, paginaActual, actualizarEstadoVisitado);

    console.log('Configurando filtros...');
    configurarFiltros(eventosData, (filtrados) => {
      eventosFiltrados = filtrados;
      paginaActual = 1;
      renderizarEventos(eventosFiltrados, paginaActual, actualizarEstadoVisitado);
    });
    
    console.log('Configurando paginación...');
    configurarPaginacion((nuevaPagina) => {
      paginaActual = nuevaPagina;
      renderizarEventos(eventosFiltrados, paginaActual, actualizarEstadoVisitado);
    });
    
    console.log('=== Inicialización completada ===');
  } catch (error) {
    console.error('Error al inicializar eventos:', error);
  }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM cargado, iniciando eventos...');
  inicializarEventos();
});

