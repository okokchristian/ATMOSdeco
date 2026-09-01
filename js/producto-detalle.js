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
    document.title = `${producto.nombre} — ATMOS deco`;

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

            <p class="producto-detalle-precio" id="precio-final">${producto.precio}</p>
            <p class="producto-detalle-descripcion">${producto.descripcion}</p>

            <div class="entrega-tabs">
                <button class="entrega-tab active" data-tipo="retiro">Retiro (Gratis)</button>
                <button class="entrega-tab" data-tipo="envio">Envío (+$${producto.costoEnvio})</button>
            </div>
            <p class="entrega-info" id="entrega-info">Retiro gratuito en Montevideo, barrio Palermo. Coordinamos el punto de encuentro por WhatsApp una vez concretada la venta.</p>

            <div class="producto-botones">
                <a href="${producto.linkMercadoPago.retiro}" target="_blank" class="btn-comprar btn-mp" id="btn-mp">
                    <i class="bi bi-credit-card"></i> Mercado Pago
                </a>
                <button class="btn-comprar btn-transferencia"
                        data-producto="${producto.nombre}"
                        data-precio="${producto.precio}"
                        data-precio-numero="${producto.precioNumero}"
                        data-costo-envio="${producto.costoEnvio}">
                    Transferencia bancaria
                    <img src="../img/itau.svg.png" alt="" class="banco-logo-btn">
                    <img src="../img/prex.png" alt="" class="banco-logo-btn">
                </button>
            </div>
        </div>
    `;

    // ================= SELECTOR RETIRO / ENVÍO =================
    const entregaTabs = document.querySelectorAll('.entrega-tab');
    const precioFinal = document.getElementById('precio-final');
    const entregaInfo = document.getElementById('entrega-info');
    const btnMp = document.getElementById('btn-mp');
    const btnTransferencia = document.querySelector('.btn-transferencia');

    const MENSAJES_ENTREGA = {
        retiro: 'Retiro gratuito en Montevideo, barrio Palermo. Coordinamos el punto de encuentro por WhatsApp una vez concretada la venta.',
        envio: 'Envío dentro del área metropolitana. Fuera de esta zona, coordinamos la entrega.'
    };

    entregaTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            entregaTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const tipo = tab.dataset.tipo;
            const precioTotal = tipo === 'envio'
                ? producto.precioNumero + producto.costoEnvio
                : producto.precioNumero;
            const precioTexto = `$${precioTotal.toLocaleString('es-UY')} UYU`;

            precioFinal.textContent = precioTexto;
            entregaInfo.textContent = MENSAJES_ENTREGA[tipo];
            btnMp.href = producto.linkMercadoPago[tipo];
            btnTransferencia.dataset.precio = precioTexto;
            btnTransferencia.dataset.entrega = tipo === 'envio' ? 'Envío' : 'Retiro';
        });
    });

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