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

  createServiceData(id, imageUrl, titulo, fecha, tipo, descripcion, ubicacion, precio, visitado) {
    console.log('Creando datos del servicio con:', {id, imageUrl, titulo, fecha, tipo, descripcion, ubicacion, precio, visitado});
    // Función para manejar valores predeterminados o devolver valores seguros.
    if (!imageUrl) {
        imageUrl = 'https://via.placeholder.com/150';
    }
    if (!id) {
        throw new Error('El ID del evento es obligatorio.');
    }
    return {
        imageUrl,
        id,
        titulo: titulo || 'Evento Sin Titulo',
        fecha: fecha || 'Fecha No Disponible',
        tipo: tipo.split(',') || ['Tipo No Disponible'],
        descripcion: descripcion || 'Descripción No Disponible',
        ubicacion: ubicacion || 'Ubicación No Disponible',
        precio: precio !== undefined ? (precio === 0 || precio === 'Gratis' ? 'Gratis' : `${precio}€`) : 'Precio No Disponible',
        visitado: visitado === 'true' || visitado === true

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
    });
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
      this.getAttribute('visitado')
    );
    this.shadowRoot.innerHTML = `
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
        <article class="evento-card">
      ${card.imageUrl ? `
        <div class="card-image">
          <img src="${card.imageUrl}" alt="${card.titulo}" loading="lazy">
        </div>
      ` : ''}
      <div class="evento-info">
        <h3 class="evento-titulo">${card.titulo}</h3>
        <div class="evento-meta">
          ${card.fecha ? `<p class="evento-fecha">📅 ${card.fecha}</p>` : ''}
          ${card.tipo ? `<div class="evento-categoria-container">${card.tipo.map(t => 
          `<span class="evento-categoria">${t}</span>`
          ).join('')}</div>` : ''}
        </div>
        ${card.descripcion ? `<p class="evento-descripcion">${card.descripcion}</p>` : ''}
        ${card.ubicacion ? `<p class="evento-ubicacion">📍 ${card.ubicacion}</p>` : ''}
        ${card.precio !== undefined ? `<p class="evento-precio">${card.precio === 0 || card.precio === 'Gratis' ? 'Gratis' : `${card.precio}`}</p>` : ''}
        <div class="card-actions">
          <button class="btn-detalles" data-id="${card.id}">Ver detalles</button>
        </div>
      </div>
    </article>
    `;
  }

  connectedCallback(){
    this.render();
    this.addEventListenerToCard();
    this.actualizarEstadoBoton();
  }
}

customElements.define('indio-card', IndioCard);