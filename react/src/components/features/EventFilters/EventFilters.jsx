import { FiSearch } from 'react-icons/fi';
import styles from './EventFilters.module.css';

export const EventFilters = ({ filtros, setFiltros, totalEventos }) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filterHeader}>
        <h2 className={styles.filterTitle}>Filtrar Eventos</h2>
        <span className={styles.filterCount}>{totalEventos} resultados</span>
      </div>

      <div className={styles.filterGrid}>
        {/* Búsqueda */}
        <div className={styles.filterGroup}>
          <div className={styles.searchWrapper}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar eventos..."
              value={filtros.busqueda}
              onChange={(e) => setFiltros({ ...filtros, busqueda: e.target.value })}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Categoría */}
        <div className={styles.filterGroup}>
          <select
            value={filtros.categoria}
            onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
            className={styles.select}
          >
            <option value="todos">Todas las categorías</option>
            <option value="cultural">Cultural</option>
            <option value="taller">Taller</option>
            <option value="conferencia">Conferencia</option>
            <option value="festival">Festival</option>
          </select>
        </div>

        {/* Ubicación */}
        <div className={styles.filterGroup}>
          <select
            value={filtros.ubicacion}
            onChange={(e) => setFiltros({ ...filtros, ubicacion: e.target.value })}
            className={styles.select}
          >
            <option value="todos">Todas las ubicaciones</option>
            <option value="madrid">Madrid</option>
            <option value="barcelona">Barcelona</option>
            <option value="valencia">Valencia</option>
            <option value="sevilla">Sevilla</option>
          </select>
        </div>

        {/* Precio */}
        <div className={styles.filterGroup}>
          <select
            value={filtros.precio}
            onChange={(e) => setFiltros({ ...filtros, precio: e.target.value })}
            className={styles.select}
          >
            <option value="todos">Todos los precios</option>
            <option value="gratis">Gratis</option>
            <option value="pago">De pago</option>
          </select>
        </div>
      </div>
    </div>
  );
};