import eventosData from './eventos.json';

export const getEventos = () => {
  return eventosData.eventos;
};

export const getEventoById = (id) => {
  return eventosData.eventos.find(evento => evento.id === parseInt(id));
};

export const getEventoBySlug = (slug) => {
  return eventosData.eventos.find(evento => evento.slug === slug);
};

export const getEventosPorCategoria = (categoria) => {
  if (categoria === 'todos') return eventosData.eventos;
  return eventosData.eventos.filter(evento => 
    evento.categoria === categoria || evento.tipo.includes(categoria)
  );
};

export const getEventosPorUbicacion = (ubicacion) => {
  if (ubicacion === 'todos') return eventosData.eventos;
  return eventosData.eventos.filter(evento => 
    evento.ubicacion.toLowerCase() === ubicacion.toLowerCase()
  );
};

export const getEventosDestacados = () => {
  return eventosData.eventos.filter(evento => evento.destacado && evento.activo);
};

export const getEventosActivos = () => {
  return eventosData.eventos.filter(evento => evento.activo);
};

export const buscarEventos = (query) => {
  const queryLower = query.toLowerCase();
  return eventosData.eventos.filter(evento => 
    evento.titulo.toLowerCase().includes(queryLower) ||
    evento.descripcion.toLowerCase().includes(queryLower) ||
    evento.tags.some(tag => tag.toLowerCase().includes(queryLower))
  );
};

export const getCategorias = () => {
  return [...new Set(eventosData.eventos.map(evento => evento.categoria))];
};

export const getUbicaciones = () => {
  return [...new Set(eventosData.eventos.map(evento => evento.ubicacion))];
};

export const getTags = () => {
  const allTags = eventosData.eventos.flatMap(evento => evento.tags);
  return [...new Set(allTags)];
};