// ================= FUNCIÓN: CREAR PAGO EN MERCADO PAGO =================
// Corre en el servidor de Netlify, no en el navegador.
// El sitio la llama al tocar "Mercado Pago" y ella crea el pago.

// 1. Dirección del sitio y páginas de resultado
const SITIO = 'https://atmosdeco.uy';

const PAGINAS = {
    aprobado:  `${SITIO}/graciasaprobado.html`,
    pendiente: `${SITIO}/pagopendiente.html`,
    rechazado: `${SITIO}/pagorechazado.html`,
};

// 2. Precios. Están acá, en el servidor, para que nadie pueda
//    cambiarlos desde el navegador y pagar menos.
const PRODUCTOS = {
    'lampara-onda':      { nombre: 'Lámpara Onda',      precio: 1300 },
    'lampara-duo':       { nombre: 'Lámpara Duo',       precio: 1600 },
    'lampara-mini-duo':  { nombre: 'Lámpara Mini Duo',  precio: 1150 },
    'lampara-bloom':     { nombre: 'Lámpara Bloom',     precio: 1150 },
    'lampara-duna':      { nombre: 'Lámpara Duna',      precio: 1600 },
    'lampara-mini-duna': { nombre: 'Lámpara Mini Duna', precio: 1150 },
    'lampara-core':      { nombre: 'Lámpara Core',      precio: 1150 },
};

const ENVIOS = {
    retiro:          { costo: 0,   texto: 'Retiro en Palermo' },
    metropolitana:   { costo: 180, texto: 'Envío dentro de Montevideo' },
    noMetropolitana: { costo: 260, texto: 'Envío fuera de Montevideo' },
};

// 3. La función en sí
export default async (req) => {
    if (req.method !== 'POST') {
        return new Response('Método no permitido', { status: 405 });
    }

    let datos;
    try {
        datos = await req.json();
    } catch {
        return Response.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    const producto = PRODUCTOS[datos.id];
    const envio = ENVIOS[datos.entrega];
    const color = String(datos.color || '').slice(0, 60);

    if (!producto || !envio) {
        return Response.json({ error: 'Producto o entrega no válidos' }, { status: 400 });
    }

    // Le pedimos a Mercado Pago que cree el pago
    const respuesta = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
            items: [{
                title: `${producto.nombre} - ${color}`,
                description: envio.texto,
                quantity: 1,
                unit_price: producto.precio + envio.costo,
                currency_id: 'UYU',
            }],
            back_urls: {
                success: PAGINAS.aprobado,
                pending: PAGINAS.pendiente,
                failure: PAGINAS.rechazado,
            },
            auto_return: 'approved',
            notification_url: `${SITIO}/.netlify/functions/webhook-mp`,
            statement_descriptor: 'ATMOS DECO',
            external_reference: `${datos.id} | ${color} | ${datos.entrega}`,
        }),
    });

    const pago = await respuesta.json();

    if (!respuesta.ok) {
        console.error('Error de Mercado Pago:', pago);
        return Response.json({ error: 'No se pudo crear el pago' }, { status: 502 });
    }

    // Devolvemos el link de pago al sitio
    return Response.json({ url: pago.init_point });
};