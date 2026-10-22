import productos from './productos-og.json' with { type: 'json' };

export default async (request) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    const producto = productos.find(p => p.id === id);

    const siteUrl = 'https://atmosdeco.uy';

    const titulo = producto ? `${producto.nombre} — ATMOS deco` : 'Productos — ATMOS deco';
    const descripcion = producto ? producto.descripcion : 'Iluminación artesanal en bioplástico sustentable, hecha en Uruguay.';
    const imagen = producto ? `${siteUrl}${producto.imagen}` : `${siteUrl}/img/atmos-preview.png`;
    const urlPagina = `${siteUrl}/productos.html${id ? `?id=${id}` : ''}`;

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>${titulo}</title>
    <meta name="description" content="${descripcion}">

    <meta property="og:type" content="website">
    <meta property="og:url" content="${urlPagina}">
    <meta property="og:title" content="${titulo}">
    <meta property="og:description" content="${descripcion}">
    <meta property="og:image" content="${imagen}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${titulo}">
    <meta name="twitter:description" content="${descripcion}">
    <meta name="twitter:image" content="${imagen}">

    <meta http-equiv="refresh" content="0; url=${urlPagina}">
</head>
<body>
    <p>Redirigiendo… <a href="${urlPagina}">Hacé click acá si no pasa nada</a></p>
</body>
</html>`;

    return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=UTF-8' }
    });
};

export const config = {
    path: '/compartir/producto'
};