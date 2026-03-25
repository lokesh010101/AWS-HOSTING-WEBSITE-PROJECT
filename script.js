// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 50
    ? 'rgba(10,10,15,0.98)'
    : 'rgba(10,10,15,0.92)';
});

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? '#e63946' : '';
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.movie-card, .about-card, .top-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
