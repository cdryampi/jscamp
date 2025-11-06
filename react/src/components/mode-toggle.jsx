import { HiSun, HiMoon, HiDesktopComputer } from 'react-icons/hi'
import { useTheme } from './theme-provider'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getIcon = () => {
    if (theme === 'system') {
      return <HiDesktopComputer className="w-5 h-5" />
    }
    
    const isDark = theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    
    return isDark ? 
      <HiSun className="w-5 h-5 transition-transform group-hover:rotate-90" /> : 
      <HiMoon className="w-5 h-5 transition-transform group-hover:-rotate-12" />
  }

  const getLabel = () => {
    const labels = {
      light: 'Claro',
      dark: 'Oscuro',
      system: 'Sistema'
    }
    return labels[theme] || 'Sistema'
  }

  return (
    <button
      onClick={cycleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 group"
      aria-label={`Tema: ${getLabel()}`}
      title={`Cambiar tema (actual: ${getLabel()})`}
    >
      {getIcon()}
      <span className="sr-only">Cambiar tema</span>
    </button>
  )
}
