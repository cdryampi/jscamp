import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { IoEarthSharp } from 'react-icons/io5';
import { ThemeToggle } from '../../common/ThemeToggle';
import styles from './Header.module.css';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/eventos', label: 'Eventos' },
    { path: '/sobre-nosotros', label: 'Sobre Nosotros' },
    { path: '/contacto', label: 'Contacto' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <IoEarthSharp className={styles.logoIcon} />
          <span className={styles.logoText}>Cultura Indígena</span>
        </Link>

        {/* Navegación Desktop */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`${styles.navLink} ${
                    location.pathname === link.path ? styles.navLinkActive : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Acciones del header */}
        <div className={styles.headerActions}>
          <ThemeToggle />
          
          {/* Botón hamburguesa (móvil) */}
          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <HiX className={styles.menuIcon} />
            ) : (
              <HiMenuAlt3 className={styles.menuIcon} />
            )}
          </button>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <nav className={styles.mobileNav}>
              <ul className={styles.mobileNavList}>
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`${styles.mobileNavLink} ${
                        location.pathname === link.path ? styles.mobileNavLinkActive : ''
                      }`}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};