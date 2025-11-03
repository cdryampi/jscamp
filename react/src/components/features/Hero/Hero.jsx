import { Link } from 'react-router-dom';
import { HiSparkles, HiArrowRight } from 'react-icons/hi';
import styles from './Hero.module.css';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={`${styles.heroContainer} container`}>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>
            <HiSparkles /> Cultura y Tradición
          </span>
          <h1 className={styles.heroTitle}>
            Descubre Eventos
            <span className={styles.heroTitleHighlight}> Culturales Indígenas</span>
          </h1>
          <p className={styles.heroDescription}>
            Únete a celebraciones ancestrales, talleres tradicionales y conferencias 
            que honran la rica herencia de los pueblos indígenas de América Latina.
          </p>
          <div className={styles.heroActions}>
            <Link to="/eventos" className={styles.heroPrimaryButton}>
              Explorar Eventos <HiArrowRight />
            </Link>
            <Link to="/sobre-nosotros" className={styles.heroSecondaryButton}>
              Conoce Más
            </Link>
          </div>

          {/* Stats */}
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Eventos</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statLabel}>Comunidades</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>1000+</span>
              <span className={styles.statLabel}>Participantes</span>
            </div>
          </div>
        </div>

        <div className={styles.heroImage}>
          <div className={styles.heroImageWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop"
              alt="Eventos culturales indígenas"
            />
            <div className={styles.heroImageOverlay}></div>
          </div>
          
          {/* Decorative elements */}
          <div className={styles.heroDecoCircle1}></div>
          <div className={styles.heroDecoCircle2}></div>
        </div>
      </div>
    </section>
  );
};