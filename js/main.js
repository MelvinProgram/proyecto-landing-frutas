// js/main.js

// =========================
// NAVBAR HIDE / SHOW ON SCROLL (Optimizado con requestAnimationFrame)
// =========================
let lastScrollTop = 0;
const delta = 100;
const navbar = document.querySelector("#navbar");
const navbarCollapse = document.querySelector(".navbar-collapse");
let ticking = false; // evita múltiples llamadas simultáneas

function handleNavbarScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const navbarHeight = navbar.offsetHeight;

  // No ocultar si el menú móvil está abierto
  if (navbarCollapse && navbarCollapse.classList.contains("show")) {
    navbar.style.top = "0";
    lastScrollTop = scrollTop;
    return;
  }

  // Evitar pequeñas variaciones de scroll (mejora estabilidad)
  if (Math.abs(scrollTop - lastScrollTop) <= delta) return;

  // Ocultar al bajar
  if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
    navbar.style.top = `-${navbarHeight}px`;
  } 
  // Mostrar al subir
  else if (lastScrollTop - scrollTop > delta) {
    navbar.style.top = "0";
  }

  lastScrollTop = Math.max(scrollTop, 0);
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleNavbarScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// =========================
// REVEAL SECTIONS ON SCROLL
// =========================
const sections = document.querySelectorAll(".scroll-section");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.7;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    section.classList.toggle("visible", sectionTop < triggerBottom);
  });

  document.body.classList.toggle(
    "section-visible",
    Array.from(sections).some(s => s.classList.contains("visible"))
  );
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// =========================
// AJUSTAR PADDING DEL BODY
// =========================
function adjustBodyPaddingForNavbar() {
  if (!navbar) return;
  const navHeight = navbar.offsetHeight;
  document.body.style.paddingTop = navHeight + "px";
}

window.addEventListener("load", adjustBodyPaddingForNavbar);
window.addEventListener("resize", adjustBodyPaddingForNavbar);