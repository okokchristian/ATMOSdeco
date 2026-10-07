// ================= WEBHOOK: AVISOS DE MERCADO PAGO =================
// Mercado Pago llama a esta función cada vez que un pago se crea o
// cambia de estado. La función consulta los datos reales del pago
// y los manda a la planilla de Google Sheets.

const ESTADOS = {
    approved:     'Aprobado',
    pending:      'Pendiente',
    in_process:   'En proceso',
    rejected:     'Rechazado',
    cancelled:    'Cancelado',
    refunded:     'Devuelto',
    charged_back: 'Contracargo',
    in_mediation: 'En disputa',
    authorized:   'Autorizado',
};

const ENTREGAS = {
    retiro:          'Retiro',
    metropolitana:   'Envío dentro de Montevideo',
    noMetropolitana: 'Envío fuera de Montevideo',
};

const TIPOS_DE_PAGO = {
    credit_card:   'Tarjeta de crédito',
    debit_card:    'Tarjeta de débito',
    account_money: 'Dinero en cuenta MP',
    ticket:        'Efectivo (Abitab/Redpagos)',
    bank_transfer: 'Transferencia',
};

export default async (req) => {
    // 1. Averiguar qué pago cambió.
    //    Mercado Pago puede mandar el id en el cuerpo o en la dirección.
    const url = new URL(req.url);
    let tipo = url.searchParams.get('type') || url.searchParams.get('topic');
    let idPago = url.searchParams.get('data.id') || url.searchParams.get('id');

    try {
        const cuerpo = await req.json();
        tipo = cuerpo.type || tipo;
        idPago = (cuerpo.data && cuerpo.data.id) || idPago;
    } catch {
        // el aviso vino sin cuerpo: usamos lo de la dirección
    }

    // Solo nos interesan los avisos de pagos
    if (tipo !== 'payment' || !idPago) {
        return new Response('Ignorado', { status: 200 });
    }

    try {
        // 2. Pedirle a Mercado Pago los datos reales del pago.
        //    Así nadie puede mandarnos un aviso falso con datos inventados.
        const respuesta = await fetch(`https://api.mercadopago.com/v1/payments/${idPago}`, {
            headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
        });

                // El pago no existe (por ejemplo, una simulación del panel): no reintentar
        if (respuesta.status === 404) {
            console.log('Pago no encontrado, se ignora:', idPago);
            return new Response('Pago no encontrado', { status: 200 });
        }

        if (!respuesta.ok) {
            console.error('No se pudo consultar el pago', idPago, await respuesta.text());
            return new Response('Error consultando el pago', { status: 500 });
        }

        const pago = await respuesta.json();

        // 3. Ordenar los datos para la planilla.
        //    external_reference lo armamos en crear-pago: "id | color | entrega"
        const [, , entregaClave] = (pago.external_reference || '').split(' | ');
        const titulo = pago.additional_info?.items?.[0]?.title || pago.description || '';
        const tipoPago = TIPOS_DE_PAGO[pago.payment_type_id] || pago.payment_type_id || '';

        const datos = {
            clave:    process.env.SHEETS_CLAVE,
            id:       pago.id,
            fecha:    pago.date_created,
            estado:   ESTADOS[pago.status] || pago.status,
            producto: titulo,
            entrega:  ENTREGAS[entregaClave] || entregaClave || '',
            monto:    pago.transaction_amount,
            medio:    `${tipoPago} (${pago.payment_method_id || '-'})`,
            detalle:  pago.status_detail || '',
        };

        // 4. Mandar los datos a la planilla
        const envio = await fetch(process.env.SHEETS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos),
        });

        const resultado = await envio.text();
        if (!resultado.includes('"ok":true')) {
            console.error('La planilla respondió con error:', resultado);
            return new Response('Error guardando en la planilla', { status: 500 });
        }

        return new Response('OK', { status: 200 });
    } catch (err) {
        console.error('Error en el webhook:', err);
        return new Response('Error', { status: 500 });
    }
};