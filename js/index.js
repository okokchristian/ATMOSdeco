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

