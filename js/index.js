// Fade-in al hacer scroll para secciones tipo "about"
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.about-content, .contact-content').forEach(el => observer.observe(el));

// Menú hamburguesa mobile
const toggleBtn = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');
function openMenu() {
    navLinks.classList.add('active');
    toggleBtn.classList.remove('bi-list');
    toggleBtn.classList.add('bi-x-lg');
    document.body.classList.add('menu-open');
}
function closeMenu() {
    navLinks.classList.remove('active');
    toggleBtn.classList.remove('bi-x-lg');
    toggleBtn.classList.add('bi-list');
    document.body.classList.remove('menu-open');
}
toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('active');
    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
});
// Cierra el menú al tocar un link (para que no quede abierto al navegar)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});
// =========================================================
// ESC PARA CERRAR
// =========================================================
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});