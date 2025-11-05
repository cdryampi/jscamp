import { useState, useEffect } from 'react';
import { 
  getEventos, 
  getEventosActivos, 
  getEventosDestacados,
  getEventosPorCategoria,
  getEventosPorUbicacion,
  buscarEventos
} from '../data';

export const useEventos = (options = {}) => {
  const {
    destacados = false,
    activos = true,
    categoria = null,
    ubicacion = null,
    busqueda = ''
  } = options;

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        setLoading(true);
        
        // Simular delay de red (opcional, puedes quitarlo)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let resultado = [];

        // Aplicar filtros en orden
        if (destacados) {
          resultado = getEventosDestacados();
        } else if (activos) {
          resultado = getEventosActivos();
        } else {
          resultado = getEventos();
        }

        // Filtrar por categoría
        if (categoria && categoria !== 'todos') {
          resultado = getEventosPorCategoria(categoria);
        }

        // Filtrar por ubicación
        if (ubicacion && ubicacion !== 'todos') {
          resultado = getEventosPorUbicacion(ubicacion);
        }

        // Filtrar por búsqueda
        if (busqueda) {
          resultado = buscarEventos(busqueda);
        }
        
        setEventos(resultado);
      } catch (err) {
        setError(err.message);
        console.error('Error al cargar eventos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, [destacados, activos, categoria, ubicacion, busqueda]);

  return { 
    eventos, 
    loading, 
    error,
    totalEventos: eventos.length
  };
};

// Hook adicional para obtener un evento específico
export const useEvento = (id) => {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        setLoading(true);
        
        // Simular delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const { getEventoById } = await import('../data');
        const resultado = getEventoById(id);
        
        if (!resultado) {
          throw new Error('Evento no encontrado');
        }
        
        setEvento(resultado);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvento();
    }
  }, [id]);

  return { evento, loading, error };
};