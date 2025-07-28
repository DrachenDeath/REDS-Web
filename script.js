document.addEventListener('DOMContentLoaded', function() {
  // Reiniciar animación al hacer clic en el logo
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', function() {
      // Clonamos el SVG
      const svg = this.querySelector('svg');
      const clone = svg.cloneNode(true);
      
      // Reemplazamos el SVG original con el clon
      svg.parentNode.replaceChild(clone, svg);
      
      // Forzamos el repintado para que la animación se reinicie
      void clone.offsetWidth;
    });
  }
  
  // Opcional: Retrasar la animación hasta que todo esté cargado
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });
});
