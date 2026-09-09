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
            <button class="btn-compartir-flotante" id="btn-compartir" aria-label="Compartir este producto">
                <i class="bi bi-share"></i>
            </button>
        </div>
        <div class="producto-detalle-info">
            <h1>${producto.nombre}</h1>
            <div class="producto-linea"></div>

            <p class="producto-detalle-precio" id="precio-final">${producto.precio}</p>

                        <div class="producto-descripcion-wrapper">
                <p class="producto-detalle-descripcion" id="descripcion-texto"></p>
                <div class="producto-especificaciones" id="producto-especificaciones">
                    <ul class="especificaciones-lista">
                        ${producto.especificaciones.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="entrega-tabs">
                <button class="entrega-tab" data-tipo="retiro">Retiro</button>
                <button class="entrega-tab" data-tipo="envio">Envío</button>
            </div>
            <p class="entrega-info" id="entrega-info">Elegí una opción de entrega para continuar con la compra.</p>

            <div class="producto-botones">
                <a href="#" class="btn-comprar btn-mp btn-disabled" id="btn-mp">
                    <i class="bi bi-credit-card"></i> Mercado Pago
                </a>
                <button class="btn-comprar btn-transferencia btn-disabled"
                        data-producto="${producto.nombre}"
                        data-precio="${producto.precio}"
                        data-precio-numero="${producto.precioNumero}"
                        data-costo-envio="0">
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

    const modalZona = document.getElementById('modal-zona-envio');
    const modalZonaClose = document.getElementById('modal-zona-close');
    const zonaOpciones = document.querySelectorAll('.zona-opcion');

    let zonaSeleccionada = null; // 'metropolitana' o 'noMetropolitana'

    const ZONA_LABELS = {
        metropolitana: 'Área metropolitana',
        noMetropolitana: 'Fuera del área metropolitana'
    };

    const MENSAJES_ENTREGA = {
        retiro: 'Retiro gratuito en Montevideo, barrio Palermo. Coordinamos el encuentro por WhatsApp una vez concretada la venta.'
    };

    const formatear = (n) => `$${n.toLocaleString('es-UY')} UYU`;

    // Completa los precios de cada zona en el modal, según el producto actual
    document.getElementById('precio-zona-metropolitana').textContent =
        `+${formatear(producto.costoEnvio.metropolitana)}`;
    document.getElementById('precio-zona-no-metropolitana').textContent =
        `+${formatear(producto.costoEnvio.noMetropolitana)}`;

    //===================RETIRO=========================/

        function actualizarPrecioRetiro() {
        precioFinal.textContent = producto.precio;
        entregaInfo.textContent = MENSAJES_ENTREGA.retiro;
        btnMp.href = producto.linkMercadoPago.retiro;
        btnTransferencia.dataset.precio = producto.precio;
        btnTransferencia.dataset.entrega = 'Retiro';
        btnTransferencia.dataset.costoEnvio = 0;
        btnTransferencia.dataset.zonaEnvio = '';
        habilitarBotones();
    }

    // ======================HABILITAR================/
    function habilitarBotones() {
        btnMp.classList.remove('btn-disabled');
        btnTransferencia.classList.remove('btn-disabled');
        btnTransferencia.removeAttribute('disabled');
    }

    // ================= VALIDACIÓN MERCADO PAGO =================
btnMp.addEventListener('click', (e) => {
    if (btnMp.classList.contains('btn-disabled')) {
        e.preventDefault();
        alert('Elegí primero una opción de entrega (Retiro o Envío) antes de continuar.');
    }
});

    //========================ENVIO===========================/

        function actualizarPrecioEnvio() {
        const costoEnvio = producto.costoEnvio[zonaSeleccionada];
        const precioTotal = producto.precioNumero + costoEnvio;
        const zonaTexto = ZONA_LABELS[zonaSeleccionada];

        precioFinal.textContent = formatear(precioTotal);
        entregaInfo.textContent = `Coordinamos la entrega por WhatsApp una vez confirmado el pago.`;
        btnMp.href = producto.linkMercadoPago.envio;
        btnTransferencia.dataset.precio = formatear(precioTotal);
        btnTransferencia.dataset.entrega = `Envío - ${zonaTexto}`;
        btnTransferencia.dataset.costoEnvio = costoEnvio;
        btnTransferencia.dataset.zonaEnvio = zonaTexto;
        habilitarBotones();
    }

    

    entregaTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tipo = tab.dataset.tipo;

            if (tipo === 'envio') {
                // Abre el selector de zona; el tab solo se activa al elegir una zona
                modalZona.classList.add('active');
                return;
            }

            entregaTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            zonaSeleccionada = null;
            actualizarPrecioRetiro();
        });
    });

    zonaOpciones.forEach(opcion => {
        opcion.addEventListener('click', () => {
            zonaSeleccionada = opcion.dataset.zona;
            modalZona.classList.remove('active');

            entregaTabs.forEach(t => t.classList.remove('active'));
            document.querySelector('.entrega-tab[data-tipo="envio"]').classList.add('active');

            actualizarPrecioEnvio();
        });
    });

    function closeModalZona() {
        modalZona.classList.remove('active');
    }

    modalZonaClose.addEventListener('click', closeModalZona);
    modalZona.addEventListener('click', (e) => {
        if (e.target === modalZona) closeModalZona();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModalZona();
    });

    // ================= VER MÁS / VER MENOS =================
  
    const especificaciones = document.getElementById('producto-especificaciones');
    const descripcionTexto = document.getElementById('descripcion-texto');
    const LARGO_CORTO = 140; // cantidad de caracteres visibles antes de truncar

    const textoCompleto = producto.descripcion;
    const necesitaTruncar = textoCompleto.length > LARGO_CORTO;
    let expandido = false;

    function renderDescripcion() {
        if (!necesitaTruncar) {
            descripcionTexto.textContent = textoCompleto;
            return;
        }

        if (expandido) {
            descripcionTexto.innerHTML = `${textoCompleto} <span class="ver-mas-inline" id="toggle-ver-mas">Ver menos</span>`;
        } else {
            const corto = textoCompleto.slice(0, LARGO_CORTO).trim();
            descripcionTexto.innerHTML = `${corto}... <span class="ver-mas-inline" id="toggle-ver-mas">Ver más</span>`;
        }

        document.getElementById('toggle-ver-mas').addEventListener('click', () => {
            expandido = !expandido;
            especificaciones.classList.toggle('activo', expandido);
            renderDescripcion();
        });
    }

    renderDescripcion();

    // ================= COMPARTIR PRODUCTO =================
    const btnCompartir = document.getElementById('btn-compartir');

    btnCompartir.addEventListener('click', async () => {
        const urlProducto = window.location.href;
        const textoCompartir = `${producto.nombre} — ATMOS deco`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: textoCompartir,
                    text: `Mirá esta lámpara de ATMOS deco: ${producto.nombre}`,
                    url: urlProducto
                });
            } catch (err) {
                // el usuario canceló el share, no hacemos nada
            }
        } else {
            navigator.clipboard.writeText(urlProducto).then(() => {
                const icon = btnCompartir.querySelector('i');
                icon.classList.remove('bi-share');
                icon.classList.add('bi-check-lg');
                setTimeout(() => {
                    icon.classList.remove('bi-check-lg');
                    icon.classList.add('bi-share');
                }, 1500);
            });
        }
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