document.addEventListener('DOMContentLoaded', function() {
  // =============================================
  // Animation Controller
  // =============================================
  const animationController = {
    init: function() {
      this.setupScrollAnimations();
    },
    
    setupScrollAnimations: function() {
      const animatableElements = document.querySelectorAll(
        '.fade-in, .servicio-card, .proyecto-card'
      );
      
      if (!animatableElements.length) return;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      animatableElements.forEach((element, index) => {
        if (element.classList.contains('servicio-card')) {
          element.dataset.delay = `${index * 0.1}s`;
        }
        observer.observe(element);
      });
    },
    
    animateElement: function(element) {
      element.classList.add('visible');
      
      if (element.classList.contains('servicio-card')) {
        const delay = element.dataset.delay || '0s';
        element.style.animation = `fadeInUp 0.5s ease forwards ${delay}`;
      }
    }
  };

  // =============================================
  // Navigation Controller
  // =============================================
  const navigationController = {
    init: function() {
      this.setupMobileMenu();
      this.setupScrollNavbar();
      this.setupSmoothScroll();
    },
    
    setupMobileMenu: function() {
      const menuToggle = document.querySelector('.menu-toggle');
      const navbarLinks = document.querySelector('.navbar-links');
      
      if (!menuToggle || !navbarLinks) return;
      
      menuToggle.addEventListener('click', () => this.toggleMenu(menuToggle, navbarLinks));
      
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => this.closeMenu(menuToggle, navbarLinks));
      });
    },
    
    toggleMenu: function(toggle, menu) {
      menu.classList.toggle('active');
      toggle.innerHTML = menu.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    },
    
    closeMenu: function(toggle, menu) {
      if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    },
    
    setupScrollNavbar: function() {
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;
      
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
      });
    },
    
    setupSmoothScroll: function() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => this.handleSmoothScroll(e, anchor));
      });
    },
    
    handleSmoothScroll: function(e, anchor) {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + 
                             window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // =============================================
  // Form Controller
  // =============================================
  const formController = {
    init: function() {
      const contactForm = document.getElementById('formulario-contacto');
      if (contactForm) {
        contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e, contactForm));
      }
    },
    
    handleFormSubmit: function(e, form) {
      e.preventDefault();
      
      if (!this.validateForm(form)) return;
      
      // In production: this.sendFormData(new FormData(form));
      this.showAlert('Mensaje enviado con éxito. Nos pondremos en contacto pronto.', 'success');
      form.reset();
    },
    
    validateForm: function(form) {
      const nombre = form.querySelector('#nombre').value.trim();
      const email = form.querySelector('#email').value.trim();
      const mensaje = form.querySelector('#mensaje').value.trim();
      
      if (!nombre || !email || !mensaje) {
        this.showAlert('Por favor complete todos los campos requeridos', 'error');
        return false;
      }
      
      if (!this.validateEmail(email)) {
        this.showAlert('Por favor ingrese un correo electrónico válido', 'error');
        return false;
      }
      
      return true;
    },
    
    validateEmail: function(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    
    showAlert: function(message, type) {
      const alertBox = document.createElement('div');
      alertBox.className = `alert alert-${type}`;
      alertBox.textContent = message;
      
      const form = document.getElementById('formulario-contacto');
      form.prepend(alertBox);
      
      setTimeout(() => {
        alertBox.classList.add('fade-out');
        setTimeout(() => alertBox.remove(), 500);
      }, 5000);
    },
    
    sendFormData: function(formData) {
      fetch('tu-endpoint-de-api', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (!response.ok) throw new Error('Error en la red');
        return response.json();
      })
      .then(data => {
        this.showAlert('Mensaje enviado con éxito. Nos pondremos en contacto pronto.', 'success');
        document.getElementById('formulario-contacto').reset();
      })
      .catch(error => {
        this.showAlert('Hubo un problema al enviar el mensaje. Por favor intente nuevamente.', 'error');
        console.error('Error:', error);
      });
    }
  };

  // =============================================
  // Gallery Controller
  // =============================================
  const galleryController = {
    init: function() {
      this.setupProjectGallery();
    },
    
    setupProjectGallery: function() {
      // Implement lightbox/modal functionality here
    }
  };

  // =============================================
  // Initialize all controllers
  // =============================================
  animationController.init();
  navigationController.init();
  formController.init();
  galleryController.init();

  // Force animations for testing (remove in production)
  document.querySelectorAll('.servicio-card, .proyecto-card').forEach(card => {
    card.classList.add('visible');
  });
});
