import { setLocalStorage, KEY_EVENTO } from "../modules/localStorage.js";

class IndioCard extends HTMLElement {
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // Observar cambios en el atributo visitado
  static get observedAttributes() {
    return ['visitado'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'visitado' && oldValue !== newValue) {
      this.actualizarEstadoBoton();
    }
  }

  createServiceData(id, imageUrl, titulo, fecha, tipo, descripcion, ubicacion, precio, visitado, viewmode, agenda) {
    console.log('Creando datos del servicio con:', {id, imageUrl, titulo, fecha, tipo, descripcion, ubicacion, precio, visitado, viewmode, agenda});
    
    if (!imageUrl) {
        imageUrl = 'https://via.placeholder.com/150';
    }
    if (!id) {
        throw new Error('El ID del evento es obligatorio.');
    }

    // Parsear agenda correctamente
    let agendaParsed = [];
    if (agenda) {
        try {
            // Si ya es un array, usarlo directamente
            if (Array.isArray(agenda)) {
                agendaParsed = agenda;
            } 
            // Si es un string, parsearlo
            else if (typeof agenda === 'string') {
                agendaParsed = JSON.parse(agenda);
            }
            // Si es un objeto, convertirlo en array
            else if (typeof agenda === 'object') {
                agendaParsed = [agenda];
            }
        } catch (error) {
            console.error('Error al parsear agenda:', error);
            agendaParsed = [];
        }
    }
    
    console.log('Agenda procesada:', agendaParsed);
    
    return {
        imageUrl,
        id,
        titulo: titulo || 'Evento Sin Titulo',
        fecha: fecha || 'Fecha No Disponible',
        tipo: tipo ? tipo.split(',') : ['Tipo No Disponible'],
        descripcion: descripcion || 'Descripción No Disponible',
        ubicacion: ubicacion || 'Ubicación No Disponible',
        precio: precio !== undefined ? (precio === 0 || precio === 'Gratis' ? 'Gratis' : `${precio}€`) : 'Precio No Disponible',
        visitado: visitado === 'true' || visitado === true,
        viewmode: viewmode || 'card',
        agenda: agendaParsed
    };
  }

  actualizarEstadoBoton() {
    const button = this.shadowRoot?.querySelector('.btn-detalles');
    if (!button) return;

    const statusVisitado = this.getAttribute('visitado') === 'true';
    
    if (statusVisitado) {
      button.textContent = 'Visitado';
      button.classList.add('btn-detalles-clicked');
      button.classList.remove('btn-detalles');
      button.disabled = true;
    } else {
      button.textContent = 'Ver detalles';
      button.classList.remove('btn-detalles-clicked');
      button.classList.add('btn-detalles');
      button.disabled = false;
    }
  }

  addEventListenerToCard = () => {
    const button = this.shadowRoot.querySelector('.btn-detalles');
    
    if (!button) return;

    button.addEventListener('click', () => {
      const currentStatus = this.getAttribute('visitado') === 'true';
      
      if (currentStatus) {
        console.log(`El evento con ID ${this.getAttribute('id')} ya ha sido marcado como visitado.`);
        return;
      }
      
      const eventoId = this.getAttribute('id');
      console.log(`Marcando el evento con ID ${eventoId} como visitado.`);
      
      // Actualizar atributo (dispara attributeChangedCallback)
      this.setAttribute('visitado', 'true');

      // Disparar evento custom para notificar al exterior
      this.dispatchEvent(new CustomEvent('visitado-changed', {
        bubbles: true,
        composed: true,
        detail: { id: eventoId }
      }));
      // Guardar en id localStorage con la key importada
      setLocalStorage(KEY_EVENTO, eventoId);
      console.log(`Evento con ID ${eventoId} guardado en localStorage con la key ${KEY_EVENTO}.`);
    });
  }

  getStylesDetail(){
    return `
    <style>
      :host {
        display: block;
        width: 100%;
      }

      .evento-detalle {
        max-width: 1200px;
        margin: 0 auto;
        background: var(--white);
      }

      .detalle-hero {
        position: relative;
        width: 100%;
        height: 400px;
        overflow: hidden;
        border-radius: var(--radius-lg);
      }

      .detalle-hero img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .detalle-hero-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        padding: var(--space-6);
      }

      .detalle-titulo {
        color: var(--white);
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      }

      .detalle-info-bar {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--space-4);
        padding: var(--space-6);
        background: var(--surface);
        border-radius: var(--radius-md);
        margin-top: var(--space-6);
      }

      .info-item {
        display: flex;
        align-items: center;
        gap: var(--space-3);
      }

      .info-item-icon {
        font-size: 1.5rem;
      }

      .info-item-content {
        display: flex;
        flex-direction: column;
      }

      .info-item-label {
        font-size: 0.85rem;
        color: var(--text-muted);
        margin: 0;
      }

      .info-item-value {
        font-size: 1rem;
        font-weight: 600;
        color: var(--heading);
        margin: 0;
      }

      .detalle-acciones {
        display: flex;
        gap: var(--space-3);
        padding: var(--space-6) 0;
      }

      .btn-registrarse {
        padding: var(--space-3) var(--space-6);
        background: var(--brand);
        color: var(--white);
        border: none;
        border-radius: var(--radius-sm);
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s ease;
      }

      .btn-registrarse:hover {
        background: var(--brand-strong);
      }

      .btn-calendario {
        padding: var(--space-3) var(--space-6);
        background: transparent;
        color: var(--brand);
        border: 2px solid var(--brand);
        border-radius: var(--radius-sm);
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .btn-calendario:hover {
        background: var(--brand-ultra-soft);
      }

      .detalle-seccion {
        margin-top: var(--space-6);
      }

      .seccion-titulo {
        font-size: 1.75rem;
        color: var(--heading);
        margin-bottom: var(--space-4);
        font-weight: 700;
      }

      .detalle-descripcion {
        font-size: 1.1rem;
        line-height: 1.8;
        color: var(--text);
        margin-bottom: var(--space-6);
      }

      .agenda-lista {
        display: grid;
        gap: var(--space-4);
      }

      .agenda-item {
        display: grid;
        grid-template-columns: 120px 1fr;
        gap: var(--space-4);
        padding: var(--space-4);
        background: var(--surface);
        border-radius: var(--radius-md);
        border-left: 4px solid var(--brand);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .agenda-item:hover {
        transform: translateX(5px);
        box-shadow: var(--shadow);
      }

      .agenda-hora {
        display: flex;
        align-items: center;
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--brand);
      }

      .agenda-actividad {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .agenda-actividad-titulo {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--heading);
        margin: 0 0 var(--space-1) 0;
      }

      .agenda-actividad-descripcion {
        font-size: 0.95rem;
        color: var(--text-muted);
        margin: 0;
      }

      @media (max-width: 768px) {
        .detalle-titulo {
          font-size: 1.75rem;
        }

        .detalle-info-bar {
          grid-template-columns: 1fr;
        }

        .agenda-item {
          grid-template-columns: 1fr;
        }

        .detalle-acciones {
          flex-direction: column;
        }

        .btn-registrarse,
        .btn-calendario {
          width: 100%;
        }
      }
    </style>
    `;
    
  }

  getStylesCard(){
    return `
    <style>
    /* Tarjetas de eventos */
        .evento-card {
        background: var(--white);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
        }

        .evento-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px hsl(210 10% 20% / 0.2);
        }

        .evento-card .card-image {
        width: 100%;
        height: 200px;
        overflow: hidden;
        background: var(--surface);
        }

        .evento-card .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
        }

        .evento-card:hover .card-image img {
        transform: scale(1.05);
        }

        .evento-card .evento-info {
        padding: var(--space-4);
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        flex: 1;
        }

        .evento-card .evento-titulo {
        margin: 0;
        font-size: 1.25rem;
        color: var(--heading);
        line-height: 1.3;
        }

        .evento-card .evento-meta {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        }

        .evento-card .evento-fecha {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--text-muted);
        font-size: 0.9rem;
        margin: 0;
        }

        .evento-card .evento-categoria {
        display: inline-block;
        padding: var(--space-1) var(--space-3);
        background: var(--brand-ultra-soft);
        color: var(--brand-strong);
        border-radius: var(--radius-sm);
        font-size: 0.85rem;
        font-weight: 600;
        width: fit-content;
        }

        .evento-card .evento-descripcion {
        flex: 1;
        margin: 0;
        color: var(--text);
        font-size: 0.95rem;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        }

        .evento-card .evento-ubicacion {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--text-muted);
        font-size: 0.9rem;
        margin: 0;
        }

        .evento-card .evento-precio {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--brand);
        margin: 0;
        }

        .evento-card .card-actions {
        margin-top: auto;
        padding-top: var(--space-3);
        border-top: 1px solid var(--border);
        }

        .evento-card .btn-detalles {
        width: 100%;
        padding: var(--space-3);
        background: var(--brand);
        color: var(--white);
        border: none;
        border-radius: var(--radius-sm);
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s ease, transform 0.2s ease;
        display: block;
        text-align: center;
        text-decoration: none;
        }

        .evento-card .btn-detalles:hover {
        background: var(--brand-strong);
        transform: translateY(-1px);
        }
        .evento-categoria-container{
          display: flex;
          gap: var(--space-2);
        }

        .evento-card .btn-detalles-clicked {
        width: 100%;
        padding: var(--space-3);
        background: var(--sky-500);
        color: var(--white);
        border: none;
        border-radius: var(--radius-sm);
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s ease, transform 0.2s ease;
        transform: none;
        }
        .evento-card .btn-detalles-clicked:hover {
        background: var(--sky-900);
        transform: translateY(-1px);
        }
    </style>
    `;
  }
  renderDetailCard(serviceData){
    console.log('Renderizando detalle con agenda:', serviceData.agenda); // Para debug
    
    return `
      <div class="evento-detalle">
        <!-- Hero con imagen y título -->
        <div class="detalle-hero">
          <img src="${serviceData.imageUrl}" alt="${serviceData.titulo}">
          <div class="detalle-hero-overlay">
            <h1 class="detalle-titulo">${serviceData.titulo}</h1>
          </div>
        </div>

        <!-- Barra de información -->
        <div class="detalle-info-bar">
          <div class="info-item">
            <span class="info-item-icon">📅</span>
            <div class="info-item-content">
              <p class="info-item-label">Fecha</p>
              <p class="info-item-value">${serviceData.fecha}</p>
            </div>
          </div>

          <div class="info-item">
            <span class="info-item-icon">🕐</span>
            <div class="info-item-content">
              <p class="info-item-label">Hora</p>
              <p class="info-item-value">${serviceData.agenda && serviceData.agenda.length > 0 ? `${serviceData.agenda[0].hora} - ${serviceData.agenda[serviceData.agenda.length - 1].hora}` : 'Por confirmar'}</p>
            </div>
          </div>

          <div class="info-item">
            <span class="info-item-icon">📍</span>
            <div class="info-item-content">
              <p class="info-item-label">Ubicación</p>
              <p class="info-item-value">${serviceData.ubicacion}</p>
            </div>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="detalle-acciones">
          <button class="btn-registrarse">Registrarse Ahora</button>
          <button class="btn-calendario">Añadir al Calendario</button>
        </div>

        <!-- Descripción del evento -->
        <div class="detalle-seccion">
          <h2 class="seccion-titulo">Sobre el Evento</h2>
          <p class="detalle-descripcion">${serviceData.descripcion}</p>
        </div>

        <!-- Agenda del evento -->
        ${serviceData.agenda && serviceData.agenda.length > 0 ? `
          <div class="detalle-seccion">
            <h2 class="seccion-titulo">Agenda del Evento</h2>
            <div class="agenda-lista">
              ${serviceData.agenda.map(item => `
                <div class="agenda-item">
                  <div class="agenda-hora">🕐 ${item.hora}</div>
                  <div class="agenda-actividad">
                    <h3 class="agenda-actividad-titulo">${item.actividad}</h3>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
          
  renderCard(serviceData){
    // crear el componente card
    return `
      <article class="evento-card">
        ${serviceData.imageUrl ? `
          <div class="card-image">
            <img src="${serviceData.imageUrl}" alt="${serviceData.titulo}" loading="lazy">
          </div>
        ` : ''}
        <div class="evento-info">
          <h3 class="evento-titulo">${serviceData.titulo}</h3>
          <div class="evento-meta">
            ${serviceData.fecha ? `<p class="evento-fecha">📅 ${serviceData.fecha}</p>` : ''}
            ${serviceData.tipo ? `<div class="evento-categoria-container">${serviceData.tipo.map(t => 
            `<span class="evento-categoria">${t}</span>`
            ).join('')}</div>` : ''}
          </div>
          ${serviceData.descripcion ? `<p class="evento-descripcion">${serviceData.descripcion}</p>` : ''}
          ${serviceData.ubicacion ? `<p class="evento-ubicacion">📍 ${serviceData.ubicacion}</p>` : ''}
          ${serviceData.precio !== undefined ? `<p class="evento-precio">${serviceData.precio === 0 || serviceData.precio === 'Gratis' ? 'Gratis' : `${serviceData.precio}`}</p>` : ''}
          <div class="card-actions">
            <a class="btn-detalles" data-id="${serviceData.id}" href="./detalle_evento.html?id=${serviceData.id}">Ver detalles</a>
          </div>
        </div>
      </article>`;
  }
  render(){
    // crear el componente card
    const card = this.createServiceData(
      this.getAttribute('id'),
      this.getAttribute('imageUrl'),
      this.getAttribute('titulo'),
      this.getAttribute('fecha'),
      this.getAttribute('tipo'),
      this.getAttribute('descripcion'),
      this.getAttribute('ubicacion'),
      this.getAttribute('precio'),
      this.getAttribute('visitado'),
      this.getAttribute('viewmode'),
      this.getAttribute('agenda')
    );
    const content = card.viewmode === 'card' ? this.renderCard(card) : this.renderDetailCard(card);
    const styles = card.viewmode === 'card' ? this.getStylesCard() : this.getStylesDetail();
    this.shadowRoot.innerHTML = styles + content;
  }

  connectedCallback(){
    this.render();
    this.addEventListenerToCard();
    this.actualizarEstadoBoton();
  }
}

customElements.define('indio-card', IndioCard);