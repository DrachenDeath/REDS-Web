document.addEventListener('DOMContentLoaded', function() {
  // Opcional: Reiniciar animación al hacer clic
  const logo = document.querySelector('.logo-container');
  
  logo.addEventListener('click', function() {
    const svg = this.querySelector('svg');
    const clone = svg.cloneNode(true);
    
    // Reemplazar el SVG para reiniciar animación
    svg.parentNode.replaceChild(clone, svg);
  });
  
  console.log('Animación del logo cargada!');
});
