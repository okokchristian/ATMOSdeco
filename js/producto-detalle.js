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

    // ================= COLORES A PEDIDO =================
    // Colores de filamento que este modelo NO tiene con foto propia
    const nombresConFoto = producto.colores.map(c => c.nombre);
    const coloresAPedido = producto.aPedido
        ? COLORES_FILAMENTO.filter(c => !nombresConFoto.includes(c.nombre))
        : [];

    contenedor.innerHTML = `
        <div class="producto-detalle-img">
            <div class="galeria-track" id="galeria-track">
                ${producto.colores[0].imagenes.map(img => `
                    <img src="${img}" alt="${producto.nombre}">
                `).join('')}
            </div>

            <div class="galeria-referencia" id="galeria-referencia"></div>

            ${producto.colores[0].imagenes.length > 1 ? `
                <button class="galeria-flecha galeria-flecha-izq" id="flecha-izq" aria-label="Anterior">
                    <i class="bi bi-chevron-left"></i>
                </button>
                <button class="galeria-flecha galeria-flecha-der" id="flecha-der" aria-label="Siguiente">
                    <i class="bi bi-chevron-right"></i>
                </button>
                <div class="galeria-dots" id="galeria-dots">
                    ${producto.colores[0].imagenes.map((_, i) => `
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

            <div class="color-selector">
                <span class="color-selector-label">
                    Color: <strong id="color-elegido">${producto.colores[0].nombre}</strong>
                </span>

                <div class="color-opciones">
                    ${producto.colores.map((color, i) => `
                        <button class="color-dot ${i === 0 ? 'active' : ''}"
                                style="background-color: ${color.hex};"
                                data-index="${i}"
                                aria-label="Color ${color.nombre}"
                                title="${color.nombre}">
                        </button>
                    `).join('')}
                </div>

                ${coloresAPedido.length ? `
                    <button class="btn-colores-pedido" id="btn-colores-pedido">
                        +${coloresAPedido.length} colores a pedido
                    </button>
                ` : ''}
            </div>

            <div class="producto-descripcion-wrapper">
                <p class="producto-detalle-descripcion" id="descripcion-texto"></p>

                <button class="ver-mas-inline" id="toggle-caracteristicas">
                    Ver características del diseño
                </button>

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

            <p class="entrega-info" id="entrega-info">
                Elegí una opción de entrega para continuar con la compra.
            </p>

            <div class="producto-botones">
                <button class="btn-comprar btn-transferencia btn-disabled"
                        data-producto="${producto.nombre}"
                        data-precio="${producto.precio}"
                        data-precio-numero="${producto.precioNumero}"
                        data-color="${producto.colores[0].nombre}"
                        data-costo-envio="0">
                    Transferencia bancaria
                    <img src="../img/itau.svg.png" alt="" class="banco-logo-btn">
                    <img src="../img/prex.png" alt="" class="banco-logo-btn">
                </button>

                <a href="#" class="btn-comprar btn-mp btn-disabled" id="btn-mp">
                    <i class="bi bi-credit-card"></i> Mercado Pago
                </a>
            </div>
        </div>
    `;

    // ================= MODAL COLORES A PEDIDO (estructura) =================
    if (coloresAPedido.length) {
        document.body.insertAdjacentHTML('beforeend', `
            <div class="modal-colores" id="modal-colores">
                <div class="modal-colores-box">
                    <div class="modal-colores-header">
                        <div>
                            <h2>Colores a pedido</h2>
                            <p>${producto.nombre} se imprime en estos colores a pedido. Las fotos son de otros diseños, para que veas cómo queda cada color.</p>
                        </div>
                        <button class="modal-colores-close" id="modal-colores-close" aria-label="Cerrar">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>

                    <div class="modal-colores-grid">
                        ${coloresAPedido.map((c, i) => `
                            <button class="color-pedido-card" data-index="${i}">
                                <div class="color-pedido-foto" style="background-color: ${c.hex};">
                                    ${c.referencia && c.referencia.imagen
                                        ? `<img src="${c.referencia.imagen}" alt="Referencia color ${c.nombre}">`
                                        : `<span>Foto próximamente</span>`}
                                </div>
                                <div class="color-pedido-info">
                                    <span class="color-pedido-dot" style="background-color: ${c.hex};"></span>
                                    <strong>${c.nombre}</strong>
                                </div>
                                ${c.referencia ? `<small>Referencia: ${c.referencia.modelo}</small>` : ''}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `);
    }

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

    // =================== RETIRO ===================
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

    // =================== HABILITAR ===================
    function habilitarBotones() {
        btnMp.classList.remove('btn-disabled');
        btnTransferencia.classList.remove('btn-disabled');
        btnTransferencia.removeAttribute('disabled');
    }

        // ================= VALIDACIÓN MERCADO PAGO + GUARDAR PEDIDO =================
    btnMp.addEventListener('click', (e) => {
        if (btnMp.classList.contains('btn-disabled')) {
            e.preventDefault();
            alert('Elegí primero una opción de entrega (Retiro o Envío) antes de continuar.');
            return;
        }

        // Guardamos el pedido para mostrarlo en la página de gracias
        try {
            localStorage.setItem('atmosPedido', JSON.stringify({
                producto: producto.nombre,
                color: btnTransferencia.dataset.color,
                entrega: btnTransferencia.dataset.entrega,
                precio: btnTransferencia.dataset.precio,
                fecha: Date.now()
            }));
        } catch (err) {
            // si el navegador no deja guardar, seguimos igual al pago
        }
    });

    // =================== ENVÍO ===================
    function actualizarPrecioEnvio() {
        const costoEnvio = producto.costoEnvio[zonaSeleccionada];
        const precioTotal = producto.precioNumero + costoEnvio;
        const zonaTexto = ZONA_LABELS[zonaSeleccionada];

        precioFinal.textContent = formatear(precioTotal);
        entregaInfo.textContent = `Coordinamos la entrega por WhatsApp una vez confirmado el pago.`;
        btnMp.href = producto.linkMercadoPago[zonaSeleccionada];
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

    // ================= DESCRIPCIÓN Y ESPECIFICACIONES =================
    document.getElementById('descripcion-texto').textContent = producto.descripcion;

    const especificaciones = document.getElementById('producto-especificaciones');
    const toggleCaracteristicas = document.getElementById('toggle-caracteristicas');

    toggleCaracteristicas.addEventListener('click', () => {
        const abierto = especificaciones.classList.toggle('activo');
        toggleCaracteristicas.textContent = abierto ? 'Ocultar características del diseño' : 'Ver características del diseño';
    });

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

    // ================= GALERÍA + SELECTOR DE COLOR =================
    const track = document.getElementById('galeria-track');
    const flechaIzq = document.getElementById('flecha-izq');
    const flechaDer = document.getElementById('flecha-der');
    const colorDots = document.querySelectorAll('.color-dot');
    const colorElegidoTexto = document.getElementById('color-elegido');
    const badgeReferencia = document.getElementById('galeria-referencia');
    const btnColoresPedido = document.getElementById('btn-colores-pedido');

    let colorActual = 0;     // índice del color con foto propia
    let colorPedido = null;  // color elegido en el modal (null = se eligió uno con foto propia)
    let indiceActual = 0;

    // Devuelve las fotos que hay que mostrar según el color elegido
    function imagenesActuales() {
        if (colorPedido) {
            return colorPedido.referencia && colorPedido.referencia.imagen
                ? [colorPedido.referencia.imagen]
                : [];
        }
        return producto.colores[colorActual].imagenes;
    }

    function renderGaleria() {
        const imagenes = imagenesActuales();

        if (imagenes.length) {
            track.innerHTML = imagenes.map(img => `<img src="${img}" alt="${producto.nombre}">`).join('');
        } else {
            // Color sin foto todavía: mostramos un recuadro del color
            track.innerHTML = `
                <div class="galeria-placeholder" style="background-color: ${colorPedido.hex};">
                    <span>Foto próximamente</span>
                </div>
            `;
        }

        track.style.transform = 'translateX(0%)';
        indiceActual = 0;

        const dotsContainer = document.getElementById('galeria-dots');
        const mostrarControles = imagenes.length > 1;

        if (flechaIzq) flechaIzq.style.display = mostrarControles ? 'flex' : 'none';
        if (flechaDer) flechaDer.style.display = mostrarControles ? 'flex' : 'none';

        if (dotsContainer) {
            dotsContainer.innerHTML = mostrarControles
                ? imagenes.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')
                : '';
        }

        // Etiqueta sobre la foto cuando es un color a pedido
        if (colorPedido) {
            badgeReferencia.textContent = colorPedido.referencia
                ? `Referencia del color · ${colorPedido.referencia.modelo}`
                : 'Muestra del color';
            badgeReferencia.classList.add('visible');
        } else {
            badgeReferencia.classList.remove('visible');
        }
    }

    // Actualiza el texto "Color: ..." y el color que viaja con la compra
    function actualizarColorElegido() {
        const nombre = colorPedido ? colorPedido.nombre : producto.colores[colorActual].nombre;

        colorElegidoTexto.innerHTML = colorPedido
            ? `${nombre} <span class="color-a-pedido-tag">(a pedido)</span>`
            : nombre;

        btnTransferencia.dataset.color = colorPedido ? `${nombre} (a pedido)` : nombre;

        if (btnColoresPedido) btnColoresPedido.classList.toggle('active', !!colorPedido);
    }

    function irAFoto(index) {
        const totalFotos = imagenesActuales().length;
        if (totalFotos < 2) return;
        indiceActual = (index + totalFotos) % totalFotos;
        track.style.transform = `translateX(-${indiceActual * 100}%)`;
        document.querySelectorAll('.dot').forEach((dot, i) => dot.classList.toggle('active', i === indiceActual));
    }

    if (flechaIzq) flechaIzq.addEventListener('click', () => irAFoto(indiceActual - 1));
    if (flechaDer) flechaDer.addEventListener('click', () => irAFoto(indiceActual + 1));

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            irAFoto(Number(e.target.dataset.index));
        }
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

    // Círculos de colores con foto propia
    colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            colorActual = Number(dot.dataset.index);
            colorPedido = null;
            colorDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            actualizarColorElegido();
            renderGaleria();
        });
    });

    // ================= MODAL COLORES A PEDIDO (funcionamiento) =================
    const modalColores = document.getElementById('modal-colores');

    if (modalColores) {
        const abrirModalColores = () => modalColores.classList.add('active');
        const cerrarModalColores = () => modalColores.classList.remove('active');

        btnColoresPedido.addEventListener('click', abrirModalColores);
        document.getElementById('modal-colores-close').addEventListener('click', cerrarModalColores);

        modalColores.addEventListener('click', (e) => {
            if (e.target === modalColores) cerrarModalColores();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') cerrarModalColores();
        });

        // Elegir un color dentro del modal
        modalColores.querySelectorAll('.color-pedido-card').forEach(card => {
            card.addEventListener('click', () => {
                colorPedido = coloresAPedido[Number(card.dataset.index)];
                colorDots.forEach(d => d.classList.remove('active'));
                actualizarColorElegido();
                renderGaleria();
                cerrarModalColores();
            });
        });
    }
}