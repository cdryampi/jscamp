import { useEventos } from '../../hooks/useEventos';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePagination } from '../../hooks/usePagination';
import { EventCard } from '../../components/features/EventCard';
import { Hero } from '../../components/features/Hero';
import { EventFilters } from '../../components/features/EventFilters';
import { useState } from 'react';
import { HiRefresh, HiSearchCircle } from 'react-icons/hi';
import styles from './Home.module.css';
import { Button } from "@/components/ui/button"
import { Pagination } from '../../components/features/Pagination';

// Leer variable de entorno con valor por defecto
const MAX_EVENTS = parseInt(import.meta.env.VITE_MAX_EVENTS_INDEX || '10', 10);

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

  // Usar hook de paginación
  const {
    currentPage,
    totalPages,
    currentItems: eventosPaginados,
    goToPage,
    showing
  } = usePagination(eventosFiltrados, MAX_EVENTS);

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltros({
      categoria: 'todos',
      ubicacion: 'todos',
      precio: 'todos',
      busqueda: ''
    });
  };

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
      <section className={`${styles.filtersSection} container my-10!`}>
        <EventFilters 
          onSearchChange={(value) => setFiltros({ ...filtros, busqueda: value })}
          onCategoriaChange={(value) => setFiltros({ ...filtros, categoria: value })}
          onUbicacionChange={(value) => setFiltros({ ...filtros, ubicacion: value })}
          onPrecioChange={(value) => setFiltros({ ...filtros, precio: value })}
          totalResultados={eventosFiltrados.length}
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
            {eventosFiltrados.length > 0 ? (
              <>
                Mostrando {showing.from}-{showing.to} de {showing.total} {showing.total === 1 ? 'evento' : 'eventos'}
                {totalPages > 1 && (
                  <span className="text-muted-foreground! ml-2!">
                    (Página {currentPage} de {totalPages})
                  </span>
                )}
              </>
            ) : (
              '0 eventos encontrados'
            )}
          </p>
        </div>

        {eventosFiltrados.length === 0 ? (
          <div className={styles.noResults}>
            <HiSearchCircle className="w-16! h-16! text-gray-400! dark:text-gray-600! mb-4!" />
            <h3 className="text-xl! font-bold! text-foreground! mb-2! m-0! p-0!">No se encontraron eventos</h3>
            <p className="text-muted-foreground! mb-4! m-0! p-0!">Intenta ajustar los filtros para ver más resultados</p>
            <Button 
              onClick={limpiarFiltros}
              variant="outline"
              size="lg"
              className="mt-4!"
            >
              <HiRefresh className="mr-2! h-4! w-4!" />
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.eventosGrid}>
              {eventosPaginados.map((evento) => (
                <EventCard
                  key={evento.id}
                  evento={evento}
                  visitado={visitados.includes(evento.id)}
                  onVisitar={handleVisitar}
                />
              ))}
            </div>
            
            {/* Paginación - Solo se muestra si hay más de una página */}
            {totalPages > 1 && (
              <div className="flex! justify-center! mt-12! mb-8!">
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};