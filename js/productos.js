// ================= INFORMACIÓN ELÉCTRICA Y SEGURIDAD =================
// Todas las lámparas usan el mismo kit eléctrico.
const INFO_ELECTRICA = [
    ['Portalámparas',     'E27'],
    ['Bombilla incluida', 'LED 4,9 W, luz cálida (3000 K), no dimerizable'],
    ['Potencia máxima',   'Solo bombillas LED de hasta 7 W'],
    ['Tensión',           '220-240 V · 50-60 Hz'],
    ['Cable',             '1,5 m, con interruptor de tecla y enchufe de 2 patas'],
];

const INFO_SEGURIDAD = [
    'No uses bombillas incandescentes ni halógenas: calientan y pueden deformar la pantalla.',
    'Desconectá la lámpara antes de cambiar la bombilla.',
    'No la uses si el cable, el enchufe o el portalámparas presentan daños.',
    'Mantenela alejada del agua, la humedad y fuentes de calor.',
    'No la cubras mientras esté encendida.',
    'No modifiques ni repares los componentes eléctricos.',
];

// ================= COLORES DE FILAMENTO =================
// Los 10 colores que imprimimos.
// "referencia.imagen" es la foto de una lámpara ya impresa en ese color.
// imagen: null → todavía falta sacar la foto (el modelo indica cuál fotografiar).
// referencia: null → todavía no hay ninguna lámpara impresa en ese color.
const COLORES_FILAMENTO = [
    { nombre: "Arena",    hex: "#ae9684", referencia: { imagen: "../img/duna/arena/Lamparas-38.webp",   modelo: "Lámpara Duna" } },
    { nombre: "Azul",     hex: "#1c2aad", referencia: { imagen: "../img/duna/azul/Lamparas-51.webp",    modelo: "Lámpara Mini Duna" } },
    { nombre: "Blanco",   hex: "#f5f0e8", referencia: { imagen: "../img/onda/blanco/Lamparas-19.webp",  modelo: "Lámpara Onda" } },
    { nombre: "Rojo",     hex: "#de2323", referencia: { imagen: "../img/onda/rojo/Lamparas-3.webp",     modelo: "Lámpara Onda" } },
    { nombre: "Rosa",     hex: "#f74b95", referencia: { imagen: "../img/onda/rosa/Lamparas-15.webp",    modelo: "Lámpara Onda" } },
    { nombre: "Lavanda",  hex: "#98889e", referencia: { imagen: "../img/onda/lavanda/Lamparas-9.webp",  modelo: "Lámpara Onda" } },
    { nombre: "Verde",    hex: "#67b77e", referencia: { imagen: "../img/onda/verde/Lamparas-12.webp",   modelo: "Lámpara Onda" } },
    { nombre: "Naranja",  hex: "#de3c15", referencia: { imagen: "../img/onda/naranja/Lamparas-6.webp",  modelo: "Lámpara Onda" } },
];

const PRODUCTOS = [
    
    // ================= ONDA =================

    {
    id: "lampara-onda",
    nombre: "Lámpara Onda",
    precio: "$1.300 UYU",
    precioNumero: 1300,
    aPedido: true,
    costoEnvio: {
        metropolitana: 180,
        noMetropolitana: 260
    },

    especificaciones: [
        "Luz fría al tacto: no quema ni derrite el material, aunque esté encendida por horas.",
        "Incluye bombilla LED de luz cálida de bajo consumo.",
        "Dimensiones: 13cm ancho x 13cm de largo y 22cm de alto",
        "Cable de 1.5 metros con interruptor incorporado.",
        "Base impresa en el mismo bioplástico sustentable."
    ],
    descripcion: "Curvas suaves que suman calma al espacio.",

    colores: [
        {nombre: "Blanco", hex: "#f5f0e8",imagenes: ["../img/onda/blanco/Lamparas-19.webp", "../img/onda/blanco/Lamparas-17.webp", "../img/onda/blanco/Lamparas-16.webp", "../img/onda/blanco/Lamparas-18.webp" ]},
        {nombre: "Rosa", hex: "#f74b95", imagenes: ["../img/onda/rosa/Lamparas-15.webp", "../img/onda/rosa/Lamparas-13.webp", "../img/onda/rosa/Lamparas-14.webp"]},
        {nombre: "Rojo", hex: "#de2323", imagenes: ["../img/onda/rojo/Lamparas-3.webp", "../img/onda/rojo/Lamparas-2.webp", "../img/onda/rojo/Lamparas-1.webp"]},
        {nombre: "Verde", hex: "#67b77e", imagenes: ["../img/onda/verde/Lamparas-12.webp", "../img/onda/verde/Lamparas-10.webp", "../img/onda/verde/Lamparas-11.webp"]},
        {nombre: "Lavanda", hex: "#98889e", imagenes: ["../img/onda/lavanda/Lamparas-9.webp", "../img/onda/lavanda/Lamparas-8.webp", "../img/onda/lavanda/Lamparas-7.webp" ]},
        {nombre: "Naranja", hex: "#de3c15", imagenes: ["../img/onda/naranja/Lamparas-6.webp", "../img/onda/naranja/Lamparas-5.webp", "../img/onda/naranja/Lamparas-4.webp" ]},
      ],

    linkMercadoPago: {
        retiro: "https://mpago.la/1q55z6i",
        metropolitana: "https://mpago.la/2fDYqdh",
        noMetropolitana: "https://mpago.la/1iWGMg9"
    }
},
    
    // ================= DUO GRANDE =================

     {
        id: "lampara-duo",
        nombre: "Lámpara Duo",
        precio: "$1.600 UYU",
        precioNumero: 1600,
        aPedido: true,
        costoEnvio: {
        metropolitana: 180,
        noMetropolitana: 260
},

especificaciones: [
    "Luz fría al tacto: no quema ni derrite el material, aunque esté encendida por horas.",
    "Incluye bombilla LED de luz cálida de bajo consumo.",
    "Dimensiones: 23cm ancho, 23cm largo y 26m alto",
    "Cable de 1.5 metros con interruptor incorporado.",
    "Base impresa en el mismo bioplástico sustentable."
],
    descripcion: "Estructura y calidez en un mismo diseño.",

        colores: [
        {nombre: "Lavanda", hex: "#98889e", imagenes: ["../img/duo/lavanda/Lamparas-63.webp", "../img/duo/lavanda/Lamparas-61.webp", "../img/duo/lavanda/Lamparas-62.webp", "../img/duo/lavanda/Lamparas-55.webp", "../img/duo/lavanda/Lamparas-54.webp"]},
        {nombre: "Rojo", hex: "#de2323", imagenes: ["../img/duo/rojo/Lamparas-65.webp", "../img/duo/rojo/Lamparas-25.webp", "../img/duo/rojo/Lamparas-69.webp", "../img/duo/rojo/Lamparas-29.webp", "../img/duo/rojo/Lamparas-27.webp"]},
        {nombre: "Verde", hex: "#67b77e", imagenes: ["../img/duo/verde/Lamparas-60.webp", "../img/duo/verde/Lamparas-57.webp", "../img/duo/verde/Lamparas-56.webp", "../img/duo/verde/Lamparas-55.webp", "../img/duo/verde/Lamparas-54.webp"]},
        {nombre: "Arena", hex: "#ae9684", imagenes: ["../img/duo/arena/Lamparas-23.webp", "../img/duo/arena/Lamparas-74.webp", "../img/duo/arena/Lamparas-20.webp",]},
            
        ],
        
        linkMercadoPago: {
            retiro: "https://mpago.la/29pZf3t",
        metropolitana: "https://mpago.la/1z2h1fG",
        noMetropolitana: "https://mpago.la/1EygjpN"
        }
    }, 

    // ================= MINI DUO =================

     {
        id: "lampara-mini-duo",
        nombre: "Lámpara Mini Duo",
        precio: "$1.150 UYU",
        precioNumero: 1150,
        aPedido: true,
        costoEnvio: {
        metropolitana: 180,
        noMetropolitana: 260
},

especificaciones: [
    "Luz fría al tacto: no quema ni derrite el material, aunque esté encendida por horas.",
    "Incluye bombilla LED de luz cálida de bajo consumo.",
    "Dimensiones: 17cm ancho, 17cm largo y 20cm alto",
    "Cable de 1.5 metros con interruptor incorporado.",
    "Base impresa en el mismo bioplástico sustentable."
],
        descripcion: "Estructura y calidez en un mismo diseño.",
       
        colores: [
        {nombre: "Lavanda", hex: "#98889e", imagenes: ["../img/duo/lavanda/Lamparas-63.webp", "../img/duo/lavanda/Lamparas-61.webp", "../img/duo/lavanda/Lamparas-62.webp", "../img/duo/lavanda/Lamparas-55.webp", "../img/duo/lavanda/Lamparas-54.webp"]},
        {nombre: "Rojo", hex: "#de2323", imagenes: ["../img/duo/rojo/Lamparas-65.webp", "../img/duo/rojo/Lamparas-25.webp", "../img/duo/rojo/Lamparas-69.webp", "../img/duo/rojo/Lamparas-29.webp", "../img/duo/rojo/Lamparas-27.webp"]},
        {nombre: "Verde", hex: "#67b77e", imagenes: ["../img/duo/verde/Lamparas-60.webp", "../img/duo/verde/Lamparas-57.webp", "../img/duo/verde/Lamparas-56.webp", "../img/duo/verde/Lamparas-55.webp", "../img/duo/verde/Lamparas-54.webp"]},
        {nombre: "Arena", hex: "#ae9684", imagenes: ["../img/duo/arena/Lamparas-23.webp", "../img/duo/arena/Lamparas-74.webp", "../img/duo/arena/Lamparas-20.webp",]},
            
        ],

         linkMercadoPago: {
        retiro: "https://mpago.la/2Xm82LA",
        metropolitana: "https://mpago.la/2xXh4La",
        noMetropolitana: "https://mpago.la/1PjWbdD"
    }
    }, 

    // ================= BLOOM =================

    {
        id: "lampara-bloom",
        nombre: "Lámpara Bloom",
        precio: "$1.150 UYU",
        precioNumero: 1150,
        costoEnvio: {
        metropolitana: 180,
        noMetropolitana: 260
},
especificaciones: [
    "Luz fría al tacto: no quema ni derrite el material, aunque esté encendida por horas.",
    "Incluye bombilla LED de luz cálida de bajo consumo.",
    "Dimensiones: 18cm ancho, 18cm largo, 22cm alto",
    "Cable de 1.5 metros con interruptor incorporado.",
    "Base impresa en el mismo bioplástico sustentable."
],
        descripcion: "Luz suave con un aire natural y cálido.",
        colores: [
            {nombre: "Verde con base Marrón", hex: "#67b77e", imagenes: ["../img/bloom/Copia de Lamparas-79 copia.png", "../img/bloom/Lamparas-77.webp", "../img/bloom/Lamparas-78 copia.png"]}
        ],
        linkMercadoPago: {
        retiro: "https://mpago.la/2Xm82LA",
        metropolitana: "https://mpago.la/2xXh4La",
        noMetropolitana: "https://mpago.la/1PjWbdD"
    }
    },

    // ================= DUNA GRANDE =================

         {
        id: "lampara-duna",
        nombre: "Lámpara Duna",
        precio: "$1.600 UYU",
        precioNumero: 1600, 
        aPedido: true,
        costoEnvio: {
        metropolitana: 180,
        noMetropolitana: 260
},
especificaciones: [
    "Luz fría al tacto: no quema ni derrite el material, aunque esté encendida por horas.",
    "Incluye bombilla LED de luz cálida de bajo consumo.",
    "Dimensiones: 24cm ancho, 24cm largo, 27cm alto",
    "Cable de 1.5 metros con interruptor incorporado.",
    "Base impresa en el mismo bioplástico sustentable."
],
        descripcion: "La lámpara Duna Calidez es envolvente, la sensación de un atardecer dentro de casa.",
        
        colores: [
        {nombre: "Blanco", hex: "#f5f0e8", imagenes: ["../img/duna/blanco/Lamparas-48.webp", "../img/duna/blanco/Lamparas-47.webp", "../img/duna/blanco/Lamparas-49.webp"]},
        {nombre: "Lavanda", hex: "#98889e", imagenes: ["../img/duna/lavanda/Lamparas-53.webp", "../img/duna/lavanda/Lamparas-52.webp"]},
        {nombre: "Arena", hex: "#ae9684", imagenes: ["../img/duna/arena/Lamparas-38.webp", "../img/duna/arena/Lamparas-76.webp", "../img/duna/arena/Lamparas-35.webp" ]},
        {nombre: "Verde", hex: "#67b77e", imagenes: ["../img/duna/verde/Lamparas-32.webp", "../img/duna/verde/Lamparas-31.webp", "../img/duna/verde/Lamparas-30.webp"]},
        {nombre: "Azul", hex: "#1c2aad", imagenes: ["../img/duna/azul/Lamparas-51.webp", "../img/duna/azul/Lamparas-50.webp" ]},
        {nombre: "Rosa", hex: "#f74b95", imagenes: ["../img/duna/rosa/Lamparas-34.webp", "../img/duna/rosa/Lamparas-33.webp"]},
         ],
        
        linkMercadoPago: {
            retiro: "https://mpago.la/29pZf3t",
        metropolitana: "https://mpago.la/1z2h1fG",
        noMetropolitana: "https://mpago.la/1EygjpN"
        }
    }, 


    // ================= MINI DUNA =================

         {
        id: "lampara-mini-duna",
        nombre: "Lámpara Mini Duna",
        precio: "$1.150 UYU",
        precioNumero: 1150, 
        aPedido: true,
        costoEnvio: {
        metropolitana: 180,
        noMetropolitana: 260
},
especificaciones: [
    "Luz fría al tacto: no quema ni derrite el material, aunque esté encendida por horas.",
    "Incluye bombilla LED de luz cálida de bajo consumo.",
    "Dimensiones: 18cm ancho, 18cm largo, 19cm alto",
    "Base impresa en el mismo bioplástico sustentable."
],
        descripcion: "Calidez envolvente, la sensación de un atardecer dentro de casa.",
        
         colores: [
        {nombre: "Blanco", hex: "#f5f0e8", imagenes: ["../img/duna/blanco/Lamparas-48.webp", "../img/duna/blanco/Lamparas-47.webp", "../img/duna/blanco/Lamparas-49.webp"]},
        {nombre: "Lavanda", hex: "#98889e", imagenes: ["../img/duna/lavanda/Lamparas-53.webp", "../img/duna/lavanda/Lamparas-52.webp"]},
        {nombre: "Arena", hex: "#ae9684", imagenes: ["../img/duna/arena/Lamparas-38.webp", "../img/duna/arena/Lamparas-76.webp", "../img/duna/arena/Lamparas-35.webp" ]},
        {nombre: "Verde", hex: "#67b77e", imagenes: ["../img/duna/verde/Lamparas-32.webp", "../img/duna/verde/Lamparas-31.webp", "../img/duna/verde/Lamparas-30.webp"]},
        {nombre: "Azul", hex: "#1c2aad", imagenes: ["../img/duna/azul/Lamparas-51.webp", "../img/duna/azul/Lamparas-50.webp" ]},
        {nombre: "Rosa", hex: "#f74b95", imagenes: ["../img/duna/rosa/Lamparas-34.webp", "../img/duna/rosa/Lamparas-33.webp"]},
         ],

        linkMercadoPago: {
        retiro: "https://mpago.la/2Xm82LA",
        metropolitana: "https://mpago.la/2xXh4La",
        noMetropolitana: "https://mpago.la/1PjWbdD"
    }
    }, 
    
    
    // ================= CORE =================

    {
        id: "lampara-core",
        nombre: "Lámpara Core",
        precio: "$1.150 UYU",
        precioNumero: 1150, 
        aPedido: true,
        pantalla: "Blanco",
        costoEnvio: {
        metropolitana: 180,
        noMetropolitana: 260
},
especificaciones: [
    "Luz fría al tacto: no quema ni derrite el material, aunque esté encendida por horas.",
    "Incluye bombilla LED de luz cálida de bajo consumo.",
    "Dimensiones: 17cm ancho, 17cm largo, 20cm alto",
    "Cable de 1.5 metros con interruptor incorporado.",
    "Base impresa en el mismo bioplástico sustentable."
],
        descripcion: "Simple, cálida y versátil.",
       
        colores: [
            {nombre: "Lavanda", hex: "#98889e",imagenes: ["../img/core/lavanda/Lamparas-39.webp", "../img/core/lavanda/Lamparas-40.webp", "../img/core/lavanda/Lamparas-41.webp"]},
            {nombre: "Rosa", hex: "#f74b95", imagenes: ["../img/core/rosa/Lamparas-45.webp", "../img/core/rosa/Lamparas-42.webp", "../img/core/rosa/Lamparas-44.webp"]},
     ],

        linkMercadoPago: {
        retiro: "https://mpago.la/2Xm82LA",
        metropolitana: "https://mpago.la/2xXh4La",
        noMetropolitana: "https://mpago.la/1PjWbdD"
    }
    }
];