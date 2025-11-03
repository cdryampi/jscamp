import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
      title={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      {theme === 'light' ? (
        <HiMoon className={styles.icon} />
      ) : (
        <HiSun className={styles.icon} />
      )}
    </button>
  );
};
