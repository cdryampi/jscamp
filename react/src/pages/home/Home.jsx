import { useEventos } from '../../hooks/useEventos';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { EventCard } from '../../components/features/EventCard';
import { Hero } from '../../components/features/Hero';
import { EventFilters } from '../../components/features/EventFilters';
import { useState } from 'react';
import styles from './Home.module.css';
import { Button } from "@/components/ui/button"

export const Home = () => {
  const { eventos, loading, error } = useEventos();
  const [visitados, setVisitados] = useLocalStorage('eventos_visitados', []);
  const [filtros, setFiltros] = useState({
    categoria: 'todos',
    ubicacion: 'todos',
    precio: 'todos',
    busqueda: ''
  });

  const handleVisitar = (eventoId) => {
    if (!visitados.includes(eventoId)) {
      setVisitados([...visitados, eventoId]);
    }
  };

  // Filtrar eventos
  const eventosFiltrados = eventos.filter((evento) => {
    // Filtro por categoría
    if (filtros.categoria !== 'todos') {
      const categorias = Array.isArray(evento.tipo) ? evento.tipo : [evento.tipo];
      if (!categorias.includes(filtros.categoria)) return false;
    }

    // Filtro por ubicación
    if (filtros.ubicacion !== 'todos') {
      if (evento.ubicacion?.toLowerCase() !== filtros.ubicacion.toLowerCase()) return false;
    }

    // Filtro por precio
    if (filtros.precio === 'gratis') {
      if (evento.precio !== 0 && evento.precio !== 'Gratis') return false;
    } else if (filtros.precio === 'pago') {
      if (evento.precio === 0 || evento.precio === 'Gratis') return false;
    }

    // Filtro por búsqueda
    if (filtros.busqueda) {
      const searchTerm = filtros.busqueda.toLowerCase();
      const titulo = evento.titulo?.toLowerCase() || '';
      const descripcion = evento.descripcion?.toLowerCase() || '';
      if (!titulo.includes(searchTerm) && !descripcion.includes(searchTerm)) return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Cargando eventos culturales...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.errorContainer} container`}>
        <div className={styles.errorCard}>
          <span className={styles.errorIcon}>⚠️</span>
          <h2>Error al cargar eventos</h2>
          <p>{error}</p>
          <button 
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <Hero />

      {/* Filtros y búsqueda */}
      <section className={`${styles.filtersSection} container`}>
        <EventFilters 
          filtros={filtros} 
          setFiltros={setFiltros}
          totalEventos={eventosFiltrados.length}
        />
      </section>

      {/* Lista de eventos */}
      <section className={`${styles.eventosSection} container`}>
        <div className={styles.eventosHeader}>
          <h2 className={styles.eventosTitle}>
            {filtros.categoria !== 'todos' 
              ? `Eventos de ${filtros.categoria}` 
              : 'Todos los Eventos'}
          </h2>
          <p className={styles.eventosCount}>
            {eventosFiltrados.length} {eventosFiltrados.length === 1 ? 'evento' : 'eventos'} encontrados
          </p>
        </div>

        {eventosFiltrados.length === 0 ? (
          <div className={styles.noResults}>
            <span className={styles.noResultsIcon}>🔍</span>
            <h3>No se encontraron eventos</h3>
            <p>Intenta ajustar los filtros para ver más resultados</p>
            <button 
              className={styles.clearFiltersButton}
              onClick={() => setFiltros({
                categoria: 'todos',
                ubicacion: 'todos',
                precio: 'todos',
                busqueda: ''
              })}
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className={styles.eventosGrid}>
            {eventosFiltrados.map((evento) => (
              <EventCard
                key={evento.id}
                evento={evento}
                visitado={visitados.includes(evento.id)}
                onVisitar={handleVisitar}
              />
            ))}
          </div>
        )}
      </section>
      <section className='flex min-h-svh flex-col items-center justify-center'>
        <Button className='mt-10' variant="outline" size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Volver arriba
        </Button>
      </section>
    </div>
  );
};