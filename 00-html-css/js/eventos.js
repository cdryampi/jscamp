import { fetchEventos } from './modules/fetch-data.js';
import { aplicarFiltros, configurarFiltros } from './modules/filters.js';
import { renderizarEventos, configurarPaginacion } from './modules/render.js';

// Estado global
let eventosData = [];
let eventosFiltrados = [];
let paginaActual = 1;

// Inicializar datos y renderizar
const inicializarEventos = async () => {
  try {
    console.log('=== Iniciando carga de eventos ===');
    eventosData = await fetchEventos();
    console.log('Eventos cargados:', eventosData.length);
    
    eventosFiltrados = [...eventosData];
    paginaActual = 1;
    
    console.log('Renderizando eventos iniciales...');
    renderizarEventos(eventosFiltrados, paginaActual);
    
    console.log('Configurando filtros...');
    configurarFiltros(eventosData, (filtrados) => {
      eventosFiltrados = filtrados;
      paginaActual = 1;
      renderizarEventos(eventosFiltrados, paginaActual);
    });
    
    console.log('Configurando paginación...');
    configurarPaginacion((nuevaPagina) => {
      paginaActual = nuevaPagina;
      renderizarEventos(eventosFiltrados, paginaActual);
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

