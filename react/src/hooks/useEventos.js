import { useState, useEffect } from 'react';

export const useEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        setLoading(true);
        // Por ahora usamos datos de prueba
        // Más adelante conectaremos con la API real
        const mockEventos = [
          {
            id: 1,
            titulo: "Celebración del Día del Indio: Cultura Quechua",
            descripcion: "Únete a nosotros para una inmersión profunda en la rica herencia de la etnia Quechua.",
            imagen: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
            fecha: "Sábado, 19 de Abril",
            tipo: ["cultural", "celebración"],
            ubicacion: "Madrid",
            precio: "Gratis",
            visitado: false
          },
          {
            id: 2,
            titulo: "Taller de Música Andina",
            descripcion: "Aprende a tocar instrumentos tradicionales de los Andes.",
            imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
            fecha: "Domingo, 20 de Abril",
            tipo: ["taller", "musical"],
            ubicacion: "Barcelona",
            precio: "15€",
            visitado: false
          },
          {
            id: 3,
            titulo: "Conferencia sobre Derechos Indígenas",
            descripcion: "Analiza la situación actual de los derechos de los pueblos indígenas.",
            imagen: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
            fecha: "Lunes, 21 de Abril",
            tipo: ["conferencia", "charla"],
            ubicacion: "Valencia",
            precio: "10€",
            visitado: false
          },
          {
            id: 4,
            titulo: "Festival de Danza Mapuche",
            descripcion: "Disfruta de presentaciones de danza tradicional mapuche.",
            imagen: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400",
            fecha: "Viernes, 25 de Abril",
            tipo: ["festival", "danza"],
            ubicacion: "Madrid",
            precio: "Gratis",
            visitado: false
          },
          {
            id: 5,
            titulo: "Taller de Textiles Tradicionales",
            descripcion: "Aprende técnicas ancestrales de tejido y bordado.",
            imagen: "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=400",
            fecha: "Sábado, 26 de Abril",
            tipo: ["taller", "artesanía"],
            ubicacion: "Sevilla",
            precio: "20€",
            visitado: false
          },
          {
            id: 6,
            titulo: "Gastronomía Andina",
            descripcion: "Degusta platos tradicionales de la región andina.",
            imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
            fecha: "Domingo, 27 de Abril",
            tipo: ["gastronomía", "cultural"],
            ubicacion: "Barcelona",
            precio: "25€",
            visitado: false
          }
        ];
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setEventos(mockEventos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  return { eventos, loading, error };
};