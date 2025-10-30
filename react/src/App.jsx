import { useState } from 'react'
function App() {

  return (
    <>
    <header>
      <div className="header-logo">
        <div className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="64"
            height="64"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linejoin="round"
            role="img"
            aria-label="Poncho"
          >
            <path d="M12 12 L32 60 L52 12 Z" fill="none" />
            <circle cx="32" cy="16" r="5" fill="none" />

            <path d="M16 28 l4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4" />
            <path d="M20 38 l4 4 4-4 4 4 4-4 4 4 4-4 4 4" />
          </svg>
        </div>
        <h1>Día del indio</h1>
      </div>
      <div class="header-nav">
        <nav>
          <ul>
            <li><a href="./index.html">Inicio</a></li>
            <li><a href="./activismo.html">Sobre nosotros</a></li>
            <li><a href="./quechua.html">Cultura Quechua</a></li>
            <li><a href="./eventos.html">Eventos</a></li>
            <li><a href="./multimedia.html">Galería</a></li>
            <li><a href="./contacto.html">Contacto</a></li>
          </ul>
        </nav>
      </div>
      <div>
        <ul class="header-actions">
          <li>
            <button>
              <svg
                fill="currentColor"
                height="20px"
                viewBox="0 0 256 256"
                width="20px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM101.63,168h52.74C149,186.34,140,202.87,128,215.89,116,202.87,107,186.34,101.63,168ZM98,152a145.72,145.72,0,0,1,0-48h60a145.72,145.72,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.79a161.79,161.79,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154.37,88H101.63C107,69.66,116,53.13,128,40.11,140,53.13,149,69.66,154.37,88Zm19.84,16h38.46a88.15,88.15,0,0,1,0,48H174.21a161.79,161.79,0,0,0,0-48Zm32.16-16H170.94a142.39,142.39,0,0,0-20.26-45A88.37,88.37,0,0,1,206.37,88ZM105.32,43A142.39,142.39,0,0,0,85.06,88H49.63A88.37,88.37,0,0,1,105.32,43ZM49.63,168H85.06a142.39,142.39,0,0,0,20.26,45A88.37,88.37,0,0,1,49.63,168Zm101.05,45a142.39,142.39,0,0,0,20.26-45h35.43A88.37,88.37,0,0,1,150.68,213Z"
                ></path>
              </svg>
            </button>
          </li>
          <li>
            <button>
              <svg
                height="20"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Gorro quechua (chullo)"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M4 10.5q4-6.5 8-6.5t8 6.5" />
                <rect x="5" y="12" width="14" height="3" rx="1" />
                <path
                  d="M6 13.5l1.2-1 1.2 1 1.2-1 1.2 1 1.2-1 1.2 1 1.2-1 1.2 1"
                />
                <path d="M6.5 15c-.8 2.2-.6 3.7 1.2 4.8 1 .6 2.2.6 3.3-.2" />
                <path d="M17.5 15c.8 2.2.6 3.7-1.2 4.8-1 .6-2.2.6-3.3-.2" />
                <circle cx="9.5" cy="20.2" r="0.9" />
                <circle cx="14.5" cy="20.2" r="0.9" />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </header>
    <main>
      <div class="quechua-pattern"></div>
      <section>
        <div class="manifest-container">
          <h2 class="">Eventos del día del indio</h2>
          <p class="">
            Celebra con nosotros la riqueza cultural de los pueblos indígenas en
            España.
          </p>
        </div>
      </section>
      <section id="search-section">
        <div class="search-container">
          <div class="search-input-wrapper">
            <span class="search-icon">
              <svg class="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" fill-rule="evenodd"></path>
              </svg>
            </span>
            <input
              type="text"
              id="search-input"
              placeholder="Buscar eventos..."
            />
          </div>
          <button id="search-button">Buscar</button>
          <div class="filters-container">
            <label for="filters">Filtros:</label>
            <select id="filter-tipo" name="tipo">
              <option value="">Tipo de evento</option>
              <option value="charla">Charla</option>
              <option value="taller">Taller</option>
              <option value="cultural">Cultural</option>
              <option value="mercado">Mercado</option>
              <option value="musical">Musical</option>
              <option value="gastronomico">Gastronómico</option>
              <option value="ceremonia">Ceremonia</option>
              <hr />
              <option value="otro">Otro</option>
            </select>
            <select id="filter-ubicacion" name="ubicacion">
              <option value="">Ubicación</option>
              <option value="madrid">Madrid</option>
              <option value="barcelona">Barcelona</option>
              <option value="valencia">Valencia</option>
              <option value="sevilla">Sevilla</option>
            </select>
            <select id="filter-fecha" name="fecha">
              <option value="">Mes</option>
              <option value="julio">Julio 2024</option>
              <option value="agosto">Agosto 2024</option>
            </select>
            <button id="clear-filters">Limpiar filtros</button>
          </div>
        </div>
      </section>
      <section class="">
        <h3>Eventos Destacados</h3>
        <div class="eventos-container">
          <div class="calendar">
            <div class="calendar-header">
              <button id="prev">&#10094;</button>
              <h2>Julio 2024</h2>
              <button id="next">&#10095;</button>
            </div>

            <div class="calendar-grid">
              <div class="day-name">D</div>
              <div class="day-name">L</div>
              <div class="day-name">M</div>
              <div class="day-name">X</div>
              <div class="day-name">J</div>
              <div class="day-name">V</div>
              <div class="day-name">S</div>
              <div class="day prev-month">30</div>
              <div class="day prev-month">1</div>
              <div class="day">1</div>
              <div class="day">2</div>
              <div class="day">3</div>
              <div class="day">4</div>
              <div class="day active">5</div>

              <div class="day">6</div>
              <div class="day">7</div>
              <div class="day">8</div>
              <div class="day">9</div>
              <div class="day">10</div>
              <div class="day">11</div>
              <div class="day">12</div>
              <div class="day">13</div>
              <div class="day">14</div>
              <div class="day">15</div>
              <div class="day">16</div>
              <div class="day">17</div>
              <div class="day">18</div>
              <div class="day">19</div>
              <div class="day">20</div>
              <div class="day">21</div>
              <div class="day">22</div>
              <div class="day">23</div>
              <div class="day">24</div>
              <div class="day">25</div>
              <div class="day">26</div>
              <div class="day">27</div>
              <div class="day">28</div>
              <div class="day">29</div>
              <div class="day">30</div>
            </div>
          </div>
          <div class="event-details">
            <div class="event-cards-container" id="eventos-container">

            </div>
          
            <div class="pagination" id="pagination">

            </div>
            
            <div class="event-aside">
              <h4>Otros Eventos</h4>
              <div class="event-list">
                <div class="event-item">
                  <div class="event-data">
                    <h5>Exposición de Arte Indígena</h5>
                    <p>Del 1 al 15 de julio</p>
                  </div>
                  <div class="event-action">
                    <a href="#">Ver</a>
                  </div>
                </div>
                <div class="event-item">
                  <div class="event-data">
                    <h5>Exposición de Arte Indígena</h5>
                    <p>Del 1 al 15 de julio</p>
                  </div>
                  <div class="event-action">
                    <a href="#">Ver</a>
                  </div>
                </div>
                <div class="event-item">
                  <div class="event-data">
                    <h5>Exposición de Arte Indígena</h5>
                    <p>Del 1 al 15 de julio</p>
                  </div>
                  <div class="event-action">
                    <a href="#">Ver</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <aside>
        <h2>Actividades y Eventos</h2>
        <p>
          Participa en talleres de tejido, música tradicional y charlas sobre la
          cosmovisión Quechua. Consulta nuestro calendario de eventos para más
          detalles.
        </p>
        <button>Ver Calendario de Eventos</button>
      </aside>
    </main>
    <footer>
      <nav>
        <ul>
          <li><a href="./index.html">Inicio</a></li>
          <li><a href="./activismo.html">Sobre nosotros</a></li>
          <li><a href="./quechua.html">Cultura Quechua</a></li>
          <li><a href="./eventos.html">Eventos</a></li>
          <li><a href="./multimedia.html">Galería</a></li>
          <li><a href="./contacto.html">Contacto</a></li>
        </ul>
      </nav>
      <ul class="social-media">
        <li>
          <a href="#" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
            </svg>
          </a>
        </li>
        <li>
          <a href="#" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
            </svg>
          </a>
        </li>
        <li>
          <a href="#" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
            </svg>
          </a>
        </li>
      </ul>
      <p>&copy; 2025 Día del Indio. Todos los derechos reservados.</p>
      <indio-avatar service="github" username="cdryampi"></indio-avatar>
      <indio-avatar service="x" username="elyampi123321"></indio-avatar>
    </footer>
    </>
  )
}

export default App
