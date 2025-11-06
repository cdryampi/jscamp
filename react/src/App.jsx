import { ThemeProvider } from './components/theme-provider'
import { AppRoutes } from './routes/AppRoutes'
import './App.css'
import './index.css'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
