import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { IoEarthSharp } from 'react-icons/io5';
import styles from './Footer.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    eventos: [
      { label: 'Próximos Eventos', path: '/eventos' },
      { label: 'Eventos Pasados', path: '/eventos/pasados' },
      { label: 'Categorías', path: '/categorias' }
    ],
    recursos: [
      { label: 'Blog', path: '/blog' },
      { label: 'Galería', path: '/galeria' },
      { label: 'Recursos', path: '/recursos' }
    ],
    empresa: [
      { label: 'Sobre Nosotros', path: '/sobre-nosotros' },
      { label: 'Contacto', path: '/contacto' },
      { label: 'Política de Privacidad', path: '/privacidad' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebookF, url: 'https://facebook.com' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com' },
    { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        {/* Sección principal del footer */}
        <div className={styles.footerMain}>
          {/* Columna de marca */}
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <IoEarthSharp className={styles.logoIcon} />
              <span className={styles.logoText}>Cultura Indígena</span>
            </div>
            <p className={styles.brandDescription}>
              Conectando comunidades a través de eventos culturales indígenas.
              Celebrando tradiciones ancestrales de América Latina.
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Columnas de enlaces */}
          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <h3 className={styles.columnTitle}>Eventos</h3>
              <ul className={styles.linkList}>
                {footerLinks.eventos.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h3 className={styles.columnTitle}>Recursos</h3>
              <ul className={styles.linkList}>
                {footerLinks.recursos.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h3 className={styles.columnTitle}>Empresa</h3>
              <ul className={styles.linkList}>
                {footerLinks.empresa.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sección inferior del footer */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} Cultura Indígena. Todos los derechos reservados.
          </p>
          <div className={styles.footerBottomLinks}>
            <Link to="/terminos" className={styles.bottomLink}>
              Términos de Uso
            </Link>
            <span className={styles.separator}>•</span>
            <Link to="/privacidad" className={styles.bottomLink}>
              Privacidad
            </Link>
            <span className={styles.separator}>•</span>
            <Link to="/cookies" className={styles.bottomLink}>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};