document.addEventListener('DOMContentLoaded', function() {
  // =============================================
  // Efectos de Scroll y Animaciones
  // =============================================
  
  // Observer para animaciones al hacer scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.fade-in, .servicio-card, .proyecto-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Para elementos que necesitan animaciones específicas
          if (entry.target.classList.contains('servicio-card')) {
            entry.target.style.animation = `fadeInUp 0.5s ease forwards ${entry.target.dataset.delay || '0s'}`;
          }
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach((element, index) => {
      if (element.classList.contains('servicio-card')) {
        element.dataset.delay = `${index * 0.1}s`;
      }
      observer.observe(element);
    });
  };

  // =============================================
  // Navegación
  // =============================================
  
  // Menú hamburguesa para móviles
  const setupMobileMenu = function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
    
    if (menuToggle && navbarLinks) {
      menuToggle.addEventListener('click', function() {
        navbarLinks.classList.toggle('active');
        menuToggle.innerHTML = navbarLinks.classList.contains('active') ? 
          '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarLinks.classList.contains('active')) {
          navbarLinks.classList.remove('active');
          menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });
  };
  
  // Cambiar navbar al hacer scroll
  const setupScrollNavbar = function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    }
  };
  
  // Smooth scroll para enlaces internos
  const setupSmoothScroll = function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };
  
  // =============================================
  // Formulario de Contacto
  // =============================================
  
  const setupContactForm = function() {
    const contactForm = document.getElementById('formulario-contacto');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validación básica
      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();
      
      if (!nombre || !email || !mensaje) {
        showAlert('Por favor complete todos los campos requeridos', 'error');
        return;
      }
      
      if (!validateEmail(email)) {
        showAlert('Por favor ingrese un correo electrónico válido', 'error');
        return;
      }
      
      // Simular envío (en producción, usar AJAX/Fetch)
      showAlert('Mensaje enviado con éxito. Nos pondremos en contacto pronto.', 'success');
      contactForm.reset();
      
      // Aquí iría la llamada AJAX real:
      // sendFormData(new FormData(contactForm));
    });
  };
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const showAlert = (message, type) => {
    const alertBox = document.createElement('div');
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;
    
    const form = document.getElementById('formulario-contacto');
    form.prepend(alertBox);
    
    setTimeout(() => {
      alertBox.classList.add('fade-out');
      setTimeout(() => alertBox.remove(), 500);
    }, 5000);
  };
  
  // =============================================
  // Galería de Proyectos (podría extenderse)
  // =============================================
  
  const setupProjectGallery = function() {
    // Aquí podrías añadir funcionalidad para un lightbox/modal
    // para ver imágenes de proyectos en grande
  };
  
  // =============================================
  // Inicialización de todas las funciones
  // =============================================
  
  animateOnScroll();
  setupMobileMenu();
  setupScrollNavbar();
  setupSmoothScroll();
  setupContactForm();
  setupProjectGallery();
  
  // Opcional: Inicializar animaciones AOS si decides usar esa librería
  // AOS.init();
});

// =============================================
// Funciones adicionales para producción
// =============================================

// Función para enviar el formulario (ejemplo con Fetch API)
function sendFormData(formData) {
  fetch('tu-endpoint-de-api', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) throw new Error('Error en la red');
    return response.json();
  })
  .then(data => {
    showAlert('Mensaje enviado con éxito. Nos pondremos en contacto pronto.', 'success');
    document.getElementById('formulario-contacto').reset();
  })
  .catch(error => {
    showAlert('Hubo un problema al enviar el mensaje. Por favor intente nuevamente.', 'error');
    console.error('Error:', error);
  });
  // Agrega esto al final del script para activar todas las animaciones
document.querySelectorAll('.servicio-card, .proyecto-card').forEach(card => {
  card.classList.add('visible');
});
}
