import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../../theme-provider';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    // Cicla entre light, dark, y system
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const isDark = theme === 'dark' || 
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 group"
      aria-label={`Tema actual: ${theme}`}
      title={`Cambiar tema (actual: ${theme})`}
    >
      {isDark ? (
        <HiSun className="w-5 h-5 text-gray-900 dark:text-gray-100 transition-transform group-hover:rotate-90" />
      ) : (
        <HiMoon className="w-5 h-5 text-gray-900 dark:text-gray-100 transition-transform group-hover:rotate-12" />
      )}
    </button>
  );
};
