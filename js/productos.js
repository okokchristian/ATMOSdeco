// ================= COLORES DE FILAMENTO =================
// Los 10 colores que imprimimos.
// "referencia.imagen" es la foto de una lámpara ya impresa en ese color.
// imagen: null → todavía falta sacar la foto (el modelo indica cuál fotografiar).
// referencia: null → todavía no hay ninguna lámpara impresa en ese color.
const COLORES_FILAMENTO = [
    { nombre: "Arena",    hex: "#ae9684", referencia: { imagen: null,                  modelo: "Lámpara Duna Grande" } },
    { nombre: "Azul",     hex: "#1c2aad", referencia: { imagen: null,                  modelo: "Lámpara Mini Duna" } },
    { nombre: "Blanco",   hex: "#f5f0e8", referencia: { imagen: "../img/onda/onda.jpeg", modelo: "Lámpara Onda" } },
    { nombre: "Rojo",     hex: "#de2323", referencia: { imagen: "../img/onda/rojo.png",  modelo: "Lámpara Onda" } },
    { nombre: "Rosa",     hex: "#f74b95", referencia: null },
    { nombre: "Lavanda",  hex: "#98889e", referencia: { imagen: null,                  modelo: "Lámpara Onda" } },
    { nombre: "Verde",    hex: "#67b77e", referencia: { imagen: "../img/onda/verde.jpg", modelo: "Lámpara Onda" } },
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
        {
            nombre: "Blanco",
            hex: "#f5f0e8",
            imagenes: ["../img/onda/onda.jpeg"], 
        },
        {
            nombre: "Rojo",
            hex: "#de2323",
            imagenes: ["../img/onda/rojo.png"]
        },
        {
            nombre: "Verde",
            hex: "#67b77e",
            imagenes: ["../img/onda/verde.jpg"]
        },
    ],

    linkMercadoPago: {
        retiro: "https://mpago.la/1q55z6i",
        metropolitana: "https://mpago.la/2fDYqdh",
        noMetropolitana: "https://mpago.la/1iWGMg9 "
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
            {
                nombre: "Lavanda",
                hex: "#98889e",
                imagenes: ["../img/duo/duo.jpeg"]
            },
        {
            nombre: "Rojo",
            hex: "#de2323",
            imagenes: ["../img/onda/rojo.png"]
        },
        {
            nombre: "Verde",
            hex: "#67b77e",
            imagenes: ["../img/onda/verde.jpg"]
        },
            
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
            {
                nombre: "Lavanda",
                hex: "#98889e",
                imagenes: ["../img/duo/duo.jpeg"]
            },
        {
            nombre: "Rojo",
            hex: "#de2323",
            imagenes: ["../img/onda/rojo.png"]
        },
        {
            nombre: "Verde",
            hex: "#67b77e",
            imagenes: ["../img/onda/verde.jpg"]
        },
            
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
            {
                nombre: "Verde con base Marrón",
                hex: "#67b77e",
                imagenes: ["../img/bloom/bloom.jpeg"]
            }
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
            {
                nombre: "Arena",
                hex: "#ae9684",
                imagenes: ["../img/duo/duo.jpeg"]
            },
        {
            nombre: "Verde",
            hex: "#67b77e",
            imagenes: ["../img/onda/rojo.png"]
        },
        {
            nombre: "Lavanda",
            hex: "#98889e",
            imagenes: ["../img/onda/verde.jpg"]
        },
            
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
            {
                nombre: "Arena",
                hex: "#ae9684",
                imagenes: ["../img/duo/duo.jpeg"]
            },
        {
            nombre: "Verde",
            hex: "#67b77e",
            imagenes: ["../img/onda/rojo.png"]
        },
        {
            nombre: "Lavanda",
            hex: "#98889e",
            imagenes: ["../img/onda/verde.jpg"]
        },
            
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
            {nombre: "Verde", hex: "#67b77e", imagenes: ["../img/core/core.jpeg"]},
            {nombre: "Lavanda", hex: "#98889e",imagenes: ["../img/core/core.jpeg"]},
            {nombre: "Azul", hex: "#1c2aad", imagenes: ["../img/core/core.jpeg"]}
               ],

        linkMercadoPago: {
        retiro: "https://mpago.la/2Xm82LA",
        metropolitana: "https://mpago.la/2xXh4La",
        noMetropolitana: "https://mpago.la/1PjWbdD"
    }
    }
];