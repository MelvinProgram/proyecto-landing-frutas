const sections = document.querySelectorAll('.scroll-section');

// Function to reveal sections on scroll 
function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.70;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    
    
    if(sectionTop < triggerBottom) {
      section.classList.add('visible');
    }
    else {
      section.classList.remove('visible');
    }

    // Add any additional logic here if needed
    // For example, you could add a class to the body when a section is visible
    if(section.classList.contains('visible')) {
      document.body.classList.add('section-visible');
    } else {
      document.body.classList.remove('section-visible');
    }
  });
}

// Event listeners for scroll and load events 
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
revealOnScroll();

// Optional: If you want to add a smooth scroll effect when the page loads
window.scrollTo({ top: 0, behavior: 'smooth' });

// Optional: If you want to add a smooth scroll effect when navigating through anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    const topOffset = document.querySelector('header').offsetHeight;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - topOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});





