// 1. Leer el "id" que viene en la URL (ej: productos.html?id=lampara-ondas)
const params = new URLSearchParams(window.location.search);
const idProducto = params.get('id');

// 2. Buscar ese producto dentro de la lista PRODUCTOS (definida en productos.js)
const producto = PRODUCTOS.find(p => p.id === idProducto);

// 3. Referencia al contenedor vacío que armamos en productos.html
const contenedor = document.getElementById('producto-detalle-contenido');

// 4. Si no se encontró el producto (URL mal escrita, o sin ?id=...), mostrar un aviso
if (!producto) {
    contenedor.innerHTML = `
        <p class="producto-no-encontrado">
            No encontramos este producto.
            <a href="lamparas.html">Volver a Lámparas</a>
        </p>
    `;
} else {
    // 5. Si sí se encontró, actualizar el título de la pestaña del navegador
    document.title = `${producto.nombre} — ATMOS deco`;

    // 6. Construir el HTML del detalle con los datos del producto
    contenedor.innerHTML = `
        <div class="producto-detalle-img">
            <div class="galeria-track" id="galeria-track">
                ${producto.imagenes.map(img => `
                    <img src="${img}" alt="${producto.nombre}">
                `).join('')}
            </div>
            ${producto.imagenes.length > 1 ? `
                <button class="galeria-flecha galeria-flecha-izq" id="flecha-izq" aria-label="Anterior">
                    <i class="bi bi-chevron-left"></i>
                </button>
                <button class="galeria-flecha galeria-flecha-der" id="flecha-der" aria-label="Siguiente">
                    <i class="bi bi-chevron-right"></i>
                </button>
                <div class="galeria-dots" id="galeria-dots">
                    ${producto.imagenes.map((_, i) => `
                        <span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
                    `).join('')}
                </div>
            ` : ''}
        </div>
        <div class="producto-detalle-info">
            <h1>${producto.nombre}</h1>
            <div class="producto-linea"></div>
            <p class="producto-detalle-precio">${producto.precio}</p>
            <p class="producto-detalle-descripcion">${producto.descripcion}</p>
            <div class="producto-botones">
                <a href="${producto.linkMercadoPago}" target="_blank" class="btn-comprar btn-mp">
                    <i class="bi bi-credit-card"></i> Mercado Pago
                </a>
                <button class="btn-comprar btn-transferencia"
                        data-producto="${producto.nombre}"
                        data-precio="${producto.precio}">
                    <i class="bi bi-bank"></i> Transferencia bancaria
                </button>
            </div>
        </div>
    `;

    // ================= GALERÍA DESLIZABLE =================
    if (producto.imagenes.length > 1) {
        const track = document.getElementById('galeria-track');
        const dots = document.querySelectorAll('.dot');
        const flechaIzq = document.getElementById('flecha-izq');
        const flechaDer = document.getElementById('flecha-der');
        const totalFotos = producto.imagenes.length;
        let indiceActual = 0;

        function irAFoto(index) {
            indiceActual = (index + totalFotos) % totalFotos;
            track.style.transform = `translateX(-${indiceActual * 100}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === indiceActual));
        }

        flechaDer.addEventListener('click', () => irAFoto(indiceActual + 1));
        flechaIzq.addEventListener('click', () => irAFoto(indiceActual - 1));
        dots.forEach(dot => {
            dot.addEventListener('click', () => irAFoto(Number(dot.dataset.index)));
        });

        // ---- Deslizar con el dedo (touch) ----
        let touchStartX = 0;
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        track.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diferencia = touchStartX - touchEndX;
            if (Math.abs(diferencia) > 40) {
                if (diferencia > 0) irAFoto(indiceActual + 1);
                else irAFoto(indiceActual - 1);
            }
        });
    }
}