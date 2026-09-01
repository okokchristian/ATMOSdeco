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

// Botón volver arriba
const backToTopBtn = document.getElementById('back-to-top');

function toggleBackToTop() {
    if (!backToTopBtn) return;   // NUEVO — si no existe el botón en esta página, no hace nada
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}

window.addEventListener('scroll', toggleBackToTop);
toggleBackToTop(); // por si carga ya scrolleado

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Ocultar navbar apenas empezás a scrollear (no te sigue)
const navbarWrapper = document.body;

function updateNavbarOnScroll() {
    const hidden = window.scrollY > 10;
    navbarWrapper.classList.toggle('nav-hidden', hidden);
}

window.addEventListener('scroll', updateNavbarOnScroll);
updateNavbarOnScroll();


// ================= MODAL TRANSFERENCIA =================
const modalTransferencia = document.getElementById('modal-transferencia');
const modalClose = document.getElementById('modal-close');
const modalWhatsappBtn = document.getElementById('modal-whatsapp-btn');

const TU_NUMERO_WHATSAPP = '59892980915';

document.querySelectorAll('.btn-transferencia').forEach(btn => {
    btn.addEventListener('click', () => {
        const producto = btn.dataset.producto;
        const precio = btn.dataset.precio;
        const mensaje = `Hola! Quiero comprar ${producto} (${precio}) por transferencia, ya hice el pago y adjunto el comprobante.`;
        modalWhatsappBtn.href = `https://wa.me/${TU_NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
        modalTransferencia.classList.add('active');
        document.body.classList.add('menu-open');
    });
});

function closeModalTransferencia() {
    modalTransferencia.classList.remove('active');
    document.body.classList.remove('menu-open');
}

modalClose.addEventListener('click', closeModalTransferencia);
modalTransferencia.addEventListener('click', (e) => {
    if (e.target === modalTransferencia) closeModalTransferencia();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModalTransferencia();
});

// ================= COPIAR DATOS BANCARIOS =================
document.querySelectorAll('.btn-copiar').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.dataset.copiar;
        const text = document.getElementById(targetId).textContent;
        navigator.clipboard.writeText(text).then(() => {
            const icon = btn.querySelector('i');
            icon.classList.remove('bi-clipboard');
            icon.classList.add('bi-check-lg');
            setTimeout(() => {
                icon.classList.remove('bi-check-lg');
                icon.classList.add('bi-clipboard');
            }, 1500);
        });
    });
});