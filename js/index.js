// Fade-in al hacer scroll para secciones tipo "about"
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.about-content').forEach(el => observer.observe(el));

document.querySelectorAll('.about-content, .contact-content').forEach(el => observer.observe(el));

// Menú hamburguesa mobile
const toggleBtn = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Cierra el menú al tocar un link (para que no quede abierto al navegar)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});