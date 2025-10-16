// Variables de estado
let paginaActual = 1;
const eventosPorPagina = 6;

// Función para actualizar paginador
const actualizarPaginador = () => {
  const totalPaginas = Math.ceil(eventosFiltrados.length / eventosPorPagina);
  const paginador = document.querySelector('.pagination');
  if (!paginador) return;

  // Limpiar paginador
  paginador.innerHTML = '';

  // Botón anterior
  const btnPrev = document.createElement('button');
  btnPrev.className = 'pagination-btn';
  btnPrev.id = 'prev-page';
  btnPrev.disabled = paginaActual === 1;
  btnPrev.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `;
  btnPrev.addEventListener('click', () => {
    if (paginaActual > 1) {
      paginaActual--;
      renderizarEventos();
      scrollToSection();
    }
  });
  paginador.appendChild(btnPrev);

  // Botones de número de página
  for (let i = 1; i <= totalPaginas; i++) {
    const btnNum = document.createElement('button');
    btnNum.className = 'pagination-number';
    if (i === paginaActual) {
      btnNum.classList.add('active');
    }
    btnNum.textContent = i;
    btnNum.addEventListener('click', () => {
      paginaActual = i;
      renderizarEventos();
      scrollToSection();
    });
    paginador.appendChild(btnNum);
  }

  // Botón siguiente
  const btnNext = document.createElement('button');
  btnNext.className = 'pagination-btn';
  btnNext.id = 'next-page';
  btnNext.disabled = paginaActual === totalPaginas;
  btnNext.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `;
  btnNext.addEventListener('click', () => {
    if (paginaActual < totalPaginas) {
      paginaActual++;
      renderizarEventos();
      scrollToSection();
    }
  });
  paginador.appendChild(btnNext);
}