import { Link } from 'react-router-dom';
import { HiSparkles, HiArrowRight } from 'react-icons/hi';
import { FaUsers, FaCalendarAlt, FaHeart } from 'react-icons/fa';
import styles from './Hero.module.css';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={`${styles.heroContainer} container`}>
        <div className={styles.heroContent}>
          {/* Badge simple */}
          <div className={styles.badgeWrapper}>
            <span className={styles.heroBadge}>
              <HiSparkles className={styles.badgeIcon} />
              <span>Cultura y Tradición Viva</span>
            </span>
          </div>

          {/* Título limpio */}
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine1}>Descubre Eventos</span>
            <span className={styles.titleLine2}>
              <span className={styles.titleHighlight}>Culturales Indígenas</span>
            </span>
          </h1>

          {/* Descripción */}
          <p className={styles.heroDescription}>
            Únete a celebraciones ancestrales, talleres tradicionales y conferencias 
            que honran la rica herencia de los pueblos indígenas de América Latina.
          </p>

          {/* Botones */}
          <div className={styles.heroActions}>
            <Link to="/eventos" className={styles.heroPrimaryButton}>
              <span>Explorar Eventos</span>
              <HiArrowRight className={styles.buttonIcon} />
            </Link>
            <Link to="/sobre-nosotros" className={styles.heroSecondaryButton}>
              <span>Conoce Más</span>
            </Link>
          </div>

          {/* Stats minimalistas */}
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <FaCalendarAlt className={styles.statIcon} />
              <div className={styles.statContent}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>Eventos</span>
              </div>
            </div>

            <div className={styles.statItem}>
              <FaUsers className={styles.statIcon} />
              <div className={styles.statContent}>
                <span className={styles.statNumber}>15+</span>
                <span className={styles.statLabel}>Comunidades</span>
              </div>
            </div>

            <div className={styles.statItem}>
              <FaHeart className={styles.statIcon} />
              <div className={styles.statContent}>
                <span className={styles.statNumber}>1000+</span>
                <span className={styles.statLabel}>Participantes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Imagen Hero simple */}
        <div className={styles.heroImage}>
          <div className={styles.heroImageWrapper}>
            <img 
              src="/assets/images/hero/hero-cultura.jpg" 
              alt="Eventos culturales indígenas"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop';
              }}
            />
            <div className={styles.heroImageOverlay}></div>
          </div>
        </div>
      </div>

      {/* Ola decorativa */}
      <div className={styles.heroWave}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};