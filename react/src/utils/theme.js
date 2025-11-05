    //   // Detectar y aplicar tema antes de que se renderice la página
    //   (function() {
    //     const theme = localStorage.getItem('theme') || 
    //       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    //     document.documentElement.classList.add(theme);
    //   })();

/*
/ Detectar y aplicar tema antes de que se renderice la página
/
*/
export const applyInitialTheme = () => {
  const theme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.add(theme);
}