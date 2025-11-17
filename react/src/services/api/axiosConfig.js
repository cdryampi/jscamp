import axios from 'axios';

// Obtener la URL base de las variables de entorno
const API_URL = import.meta.env.VITE_VERCEL_API_URL || 'http://localhost:3001';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    // Puedes agregar tokens de autenticación aquí si es necesario
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    // Retornar solo los datos si existe el campo 'data'
    return response.data;
  },
  (error) => {
    // Manejo de errores global
    const errorMessage = error.response?.data?.error || error.message || 'Error en la petición';
    console.error('API Error:', errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
