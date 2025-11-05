import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Estilos globales
import './styles/reset.css'
import './styles/variables.css'
import './styles/global.css'
// import './styles/debug.css' // Descomentar para ver indicadores de tema

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
