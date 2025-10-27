import { fetchEventos, fetchEventoById } from './modules/fetch-data.js';
import { getLocalStorage, KEY_EVENTO} from './modules/localStorage.js';



const detalleContainer = document.getElementById('detalle-post-container');

/**
 * función para cargar el detalle de un evento recuperado del localStorage desde la ID
 * @returns 
 */
async function cargarDetalleEvento() {
    try {
        const eventoID = getLocalStorage(KEY_EVENTO) || [];
        const evento = await fetchEventoById(eventoID);
        if (!evento) {
            detalleContainer.innerHTML = '<p>Evento no encontrado.</p>';
            return;
        }

        console.log('Evento cargado:', evento);
        console.log('Agenda del evento:', evento.agenda);
        console.log('Tipo de agenda:', typeof evento.agenda);

        // Crear el elemento directamente en JavaScript en lugar de innerHTML
        const cardElement = document.createElement('indio-card');
        cardElement.setAttribute('id', evento.id);
        cardElement.setAttribute('imageUrl', evento.imagen);
        cardElement.setAttribute('titulo', evento.nombre || evento.titulo);
        cardElement.setAttribute('fecha', evento.fecha);
        cardElement.setAttribute('tipo', Array.isArray(evento.categoria) ? evento.categoria.join(',') : (Array.isArray(evento.tipo) ? evento.tipo.join(',') : evento.tipo || ''));
        cardElement.setAttribute('descripcion', evento.descripcion);
        cardElement.setAttribute('ubicacion', evento.ubicacion);
        cardElement.setAttribute('precio', evento.precio);
        cardElement.setAttribute('visitado', evento.visitado || false);
        cardElement.setAttribute('viewmode', 'detail');
        
        // Pasar la agenda como JSON string
        if (evento.agenda && Array.isArray(evento.agenda)) {
            cardElement.setAttribute('agenda', JSON.stringify(evento.agenda));
        }

        // Limpiar el contenedor y añadir el elemento
        detalleContainer.innerHTML = '';
        detalleContainer.appendChild(cardElement);

    } catch (error) {
        console.error('Error al cargar el detalle del evento:', error);
        detalleContainer.innerHTML = '<p>Error al cargar el evento.</p>';
    }
}

// Iniciar carga del detalle del evento
document.addEventListener('DOMContentLoaded', ()=>{
    console.log('📄 Cargando detalle del evento...');
    cargarDetalleEvento();
});