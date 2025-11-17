import { useState, useEffect } from 'react';
import eventosService from '../services/api/eventos';

export const useEventos = (options = {}) => {
  const {
    destacados = false,
    categoria = null,
    ubicacion = null,
  } = options;

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let resultado = [];

        // Obtener eventos según los filtros
        if (destacados) {
          resultado = await eventosService.getEventosDestacados();
        } else if (categoria && categoria !== 'todos') {
          resultado = await eventosService.getEventosPorCategoria(categoria);
        } else if (ubicacion && ubicacion !== 'todos') {
          resultado = await eventosService.getEventosPorUbicacion(ubicacion);
        } else {
          resultado = await eventosService.getEventos();
        }
        
        setEventos(resultado);
      } catch (err) {
        setError(err.message);
        console.error('Error al cargar eventos:', err);
        setEventos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, [destacados, categoria, ubicacion]);

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
        setError(null);
        
        const resultado = await eventosService.getEventoById(id);
        
        if (!resultado) {
          throw new Error('Evento no encontrado');
        }
        
        setEvento(resultado);
      } catch (err) {
        setError(err.message);
        console.error('Error al cargar evento:', err);
        setEvento(null);
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

// Hook para obtener evento por slug
export const useEventoBySlug = (slug) => {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const resultado = await eventosService.getEventoBySlug(slug);
        
        if (!resultado) {
          throw new Error('Evento no encontrado');
        }
        
        setEvento(resultado);
      } catch (err) {
        setError(err.message);
        console.error('Error al cargar evento:', err);
        setEvento(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchEvento();
    }
  }, [slug]);

  return { evento, loading, error };
};