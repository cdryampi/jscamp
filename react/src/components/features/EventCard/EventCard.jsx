import { FaCalendarAlt, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import styles from './EventCard.module.css';

export const EventCard = ({ evento, visitado, onVisitar }) => {
  const handleClick = () => {
    if (!visitado) {
      onVisitar?.(evento.id);
    }
  };

  return (
    <article className={styles.eventoCard}>
      {evento.imagen && (
        <div className={styles.cardImage}>
          <img src={evento.imagen} alt={evento.titulo} loading="lazy" />
        </div>
      )}
      
      <div className={styles.eventoInfo}>
        <h3 className={styles.eventoTitulo}>{evento.titulo}</h3>
        
        <div className={styles.eventoMeta}>
          {evento.fecha && (
            <p className={styles.eventoFecha}>
              <FaCalendarAlt className={styles.icon} />
              {evento.fecha}
            </p>
          )}
          
          {evento.tipo && (
            <div className={styles.categoriaContainer}>
              {evento.tipo.map((tipo, index) => (
                <span key={index} className={styles.categoria}>
                  {tipo}
                </span>
              ))}
            </div>
          )}
        </div>

        {evento.descripcion && (
          <p className={styles.eventoDescripcion}>{evento.descripcion}</p>
        )}

        {evento.ubicacion && (
          <p className={styles.eventoUbicacion}>
            <FaMapMarkerAlt className={styles.icon} />
            {evento.ubicacion}
          </p>
        )}

        {evento.precio !== undefined && (
          <p className={styles.eventoPrecio}>
            {evento.precio === 0 || evento.precio === 'Gratis' 
              ? 'Gratis' 
              : evento.precio}
          </p>
        )}

        <div className={styles.cardActions}>
          <button
            className={visitado ? styles.btnVisitado : styles.btnDetalles}
            onClick={handleClick}
          >
            {visitado ? (
              <>
                <FaCheck /> Visitado
              </>
            ) : (
              'Ver detalles'
            )}
          </button>
        </div>
      </div>
    </article>
  );
};