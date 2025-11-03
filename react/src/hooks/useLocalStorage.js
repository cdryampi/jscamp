import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Estado para almacenar el valor
  const [value, setValue] = useState(() => {
    try {
      // Intentar obtener del localStorage
      const item = window.localStorage.getItem(key);
      // Parsear el JSON o devolver el valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error al leer ${key} de localStorage:`, error);
      return initialValue;
    }
  });

  // Actualizar localStorage cuando cambie el valor
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error al guardar ${key} en localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue];
};