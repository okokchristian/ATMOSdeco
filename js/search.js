// ================= BUSCADOR =================
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const searchClose = document.getElementById('search-close');

// Detectar si estamos dentro de la carpeta html/ o en la raíz,
// para armar el link correcto a productos.html
const enCarpetaHtml = window.location.pathname.includes('/html/');
const rutaProductos = enCarpetaHtml ? 'productos.html' : 'html/productos.html';


// Saca tildes/acentos para que la búsqueda funcione con o sin ellos
function quitarTildes(texto) {
    return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function abrirBuscador() {
    searchOverlay.classList.add('active');
    document.body.classList.add('menu-open');
    searchInput.value = '';
    searchResults.innerHTML = '';
    setTimeout(() => searchInput.focus(), 100);
}

function cerrarBuscador() {
    searchOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
}

// Cualquier botón "Buscar" del sitio abre el mismo buscador
document.querySelectorAll('.btn-buscar').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        abrirBuscador();
    });
});

searchClose.addEventListener('click', cerrarBuscador);
searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) cerrarBuscador();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarBuscador();
});

// Filtrar productos mientras se escribe
searchInput.addEventListener('input', () => {
    const query = quitarTildes(searchInput.value.trim().toLowerCase());

    if (query === '') {
        searchResults.innerHTML = '';
        return;
    }

    const coincidencias = PRODUCTOS.filter(p =>
        quitarTildes(p.nombre.toLowerCase()).includes(query)
    );

    if (coincidencias.length === 0) {
        searchResults.innerHTML = `<p class="search-empty">No encontramos productos para "${searchInput.value}"</p>`;
        return;
    }

    searchResults.innerHTML = coincidencias.map(p => `
        <a href="${rutaProductos}?id=${p.id}" class="search-result-item">
            <img src="${enCarpetaHtml ? p.imagenes[0] : p.imagenes[0].replace('../', '')}" alt="${p.nombre}">
            <div class="search-result-info">
                <h4>${p.nombre}</h4>
                <span>${p.precio}</span>
            </div>
        </a>
    `).join('');
});