// Lista de secciones que se revelan al hacer scroll
const sections = document.querySelectorAll('.scroll-section');

// Función: revealOnScroll
// - Calcula cuando cada sección entra en el viewport
// - Añade la clase 'visible' para activar la animación CSS
function revealOnScroll() {
  // Punto desde la parte inferior de la pantalla que activa la visibilidad
  const triggerBottom = window.innerHeight * 0.70;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    
    
    if(sectionTop < triggerBottom) {
      section.classList.add('visible');
    }
    else {
      section.classList.remove('visible');
    }

    // Si la sección es visible, añadimos una clase al body para permitir
    // estilos o comportamientos globales basados en la visibilidad.
    if(section.classList.contains('visible')) {
      document.body.classList.add('section-visible');
    } else {
      document.body.classList.remove('section-visible');
    }
  });
}

// Listeners: actualizar visibilidad al hacer scroll y al cargar la página
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
revealOnScroll();

// Función: adjustBodyPaddingForNavbar
// - Calcula la altura del navbar (o header) y aplica ese valor como
//   padding-top al <body> para que el contenido no quede debajo del nav.
function adjustBodyPaddingForNavbar() {
  const navbar = document.querySelector('#navbar') || document.querySelector('header');
  if (!navbar) return; // nada que hacer si no existe
  const navHeight = navbar.offsetHeight;
  // Verificamos el padding actual y lo actualizamos sólo si difiere
  const currentPadding = parseInt(window.getComputedStyle(document.body).paddingTop, 10) || 0;
  if (currentPadding !== navHeight) {
    document.body.style.paddingTop = navHeight + 'px';
  }
}

// Ejecutar al cargar y al redimensionar para asegurar correcto espaciado
window.addEventListener('load', () => {
  adjustBodyPaddingForNavbar();
  revealOnScroll();
});
window.addEventListener('resize', adjustBodyPaddingForNavbar);

// Opcional: desplazar al top suavemente al cargar la página
window.scrollTo({ top: 0, behavior: 'smooth' });

// Optional: If you want to add a smooth scroll effect when navigating through anchor links
// Smooth scroll para enlaces ancla
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    // tomamos la altura del header para compensar el scroll (nav fixed)
    const topOffset = document.querySelector('header').offsetHeight;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - topOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});





