// Fade-in al hacer scroll en la web

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

// =====================BOTON VOLVER ARRIBA ========================/

const backToTopBtn = document.getElementById('back-to-top');

function toggleBackToTop() {
    if (!backToTopBtn) return;   // si no existe el botón en esta página, no hace nada
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}

window.addEventListener('scroll', toggleBackToTop);
toggleBackToTop(); // por si carga ya scrolleado

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============ Ocultar navbar apenas empezás a scrollear (no te sigue)
const navbarWrapper = document.body;

function updateNavbarOnScroll() {
    const hidden = window.scrollY > 10;
    navbarWrapper.classList.toggle('nav-hidden', hidden);
}

window.addEventListener('scroll', updateNavbarOnScroll);
updateNavbarOnScroll();


// ================= MODAL TRANSFERENCIA =================
const modalTransferencia = document.getElementById('modal-transferencia');

if (modalTransferencia) {
    const modalClose = document.getElementById('modal-close');
    const modalWhatsappBtn = document.getElementById('modal-whatsapp-btn');
    const modalContent = document.querySelector('.modal-content');
    const bancoTabs = document.querySelectorAll('.banco-tab');

    const TU_NUMERO_WHATSAPP = '59892980915';

    const BANCOS = {
        itau: {
            banco: 'ITAÚ',
            titular: 'Jonathan Rodriguez',
            cuenta: '1710596'
        },
        prex: {
            banco: 'PREX',
            titular: 'Jonathan Rodriguez',
            cuenta: '1098455'
        }
    };

    function actualizarDatosBancarios(bancoKey) {
        const datos = BANCOS[bancoKey];
        document.getElementById('dato-banco').textContent = datos.banco;
        document.getElementById('dato-titular').textContent = datos.titular;
        document.getElementById('dato-cuenta').textContent = datos.cuenta;

        modalContent.classList.remove('tema-itau', 'tema-prex');
        modalContent.classList.add(`tema-${bancoKey}`);
    }

    bancoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            bancoTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            actualizarDatosBancarios(tab.dataset.banco);
        });
    });

    document.querySelectorAll('.btn-transferencia').forEach(btn => {
    btn.addEventListener('click', () => {
        const producto = btn.dataset.producto;
        const precio = btn.dataset.precio;
        const entrega = btn.dataset.entrega || 'Retiro';
        const mensaje = `Hola! Quiero comprar ${producto} (${precio}) - ${entrega} - por transferencia, ya hice el pago y adjunto el comprobante.`;
            modalWhatsappBtn.href = `https://wa.me/${TU_NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

            bancoTabs.forEach(t => t.classList.remove('active'));
            document.querySelector('.banco-tab[data-banco="itau"]').classList.add('active');
            actualizarDatosBancarios('itau');

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
}

// ================== MODAL FAQ ==================

const faqOverlay = document.getElementById('faq-overlay');
const closeFaqBtn = document.getElementById('faq-close');

const openFaqTriggers = document.querySelectorAll('.open-faq-trigger');

openFaqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault(); // por si es un <a>, que no salte al "#"
        faqOverlay.classList.add('active');

        // si el menú mobile está abierto, lo cerramos al abrir el FAQ
        document.getElementById('nav-links')?.classList.remove('active');
    });
});

if (closeFaqBtn && faqOverlay) {
    closeFaqBtn.addEventListener('click', () => {
        faqOverlay.classList.remove('active');
    });
}

// Cerrar si se hace clic afuera del box (en el fondo oscuro)
if (faqOverlay) {
    faqOverlay.addEventListener('click', (e) => {
        if (e.target === faqOverlay) {
            faqOverlay.classList.remove('active');
        }
    });
}

// Cerrar con la tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && faqOverlay?.classList.contains('active')) {
        faqOverlay.classList.remove('active');
    }
});