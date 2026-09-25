const PRODUCTOS = [
    // ================= ONDA =================

    {
    id: "lampara-onda",
    nombre: "Lámpara Onda",
    precio: "$1.400 UYU",
    precioNumero: 1400,
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
            imagenes: ["../img/onda/onda.jpeg",]
        },
        {
            nombre: "Rojo",
            hex: "#de2323",
            imagenes: ["../img/onda/rojo.png"]
        },
        {
            nombre: "Naranja",
            hex: "#fa7034",
            imagenes: ["../img/onda/naranja.png"]
        }
    ],

    linkMercadoPago: {
        retiro: "https://mpago.la/27FoEo5",
        metropolitana: "https://mpago.la/1U1Nfc1",
        noMetropolitana: "https://mpago.la/2XFSZge"
    }
},
    
    // ================= DUO GRANDE =================

     {
        id: "lampara-duo-grande",
        nombre: "Lámpara Duo Grande",
        precio: "$1.700 UYU",
        precioNumero: 1700,
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
                nombre: "Único",
                hex: "#f5f0e8",
                imagenes: ["../img/duo/duo.jpeg"]
            }
        ],
        
        linkMercadoPago: {
            retiro: "https://mpago.la/xxxxx",
            envio: "https://mpago.la/yyyyy"
        }
    }, 

    // ================= MINI DUO =================

     {
        id: "lampara-mini-duo",
        nombre: "Lámpara Mini Duo",
        precio: "$1.300 UYU",
        precioNumero: 1300,
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
                nombre: "Único",
                hex: "#f5f0e8",
                imagenes: ["../img/duo/duo.jpeg"]
            }
        ],
        linkMercadoPago: {
            retiro: "https://mpago.la/xxxxx",
            envio: "https://mpago.la/yyyyy"
        }
    }, 

    // ================= BLOOM =================

    {
        id: "lampara-bloom",
        nombre: "Lámpara Bloom",
        precio: "$1.300 UYU",
        precioNumero: 1300,
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
                nombre: "Único",
                hex: "#f5f0e8",
                imagenes: ["../img/bloom/bloom.jpeg"]
            }
        ],
        linkMercadoPago: {
            retiro: "https://mpago.la/xxxxx",
            envio: "https://mpago.la/yyyyy"
        }
    },

    // ================= DUNA GRANDE =================

         {
        id: "lampara-duna-grande",
        nombre: "Lámpara Duna Grande",
        precio: "$1.700 UYU",
        precioNumero: 1700, 
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
        descripcion: "La lámpara Duna Grande Calidez es envolvente, la sensación de un atardecer dentro de casa.",
        colores: [
            {
                nombre: "Único",
                hex: "#f5f0e8",
                imagenes: ["../img/duna/duna.jpeg"]
            }
        ],
        linkMercadoPago: {
            retiro: "https://mpago.la/xxxxx",
            envio: "https://mpago.la/yyyyy"
        }
    }, 


    // ================= MINI DUNA =================

         {
        id: "lampara-mini-duna",
        nombre: "Lámpara Mini Duna",
        precio: "$1.300 UYU",
        precioNumero: 1300, 
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
                nombre: "Único",
                hex: "#f5f0e8",
                imagenes: ["../img/duna/duna.jpeg"]
            }
        ],
        linkMercadoPago: {
            retiro: "https://mpago.la/xxxxx",
            envio: "https://mpago.la/yyyyy"
        }
    }, 
    
    
    // ================= CORE =================

    {
        id: "lampara-core",
        nombre: "Lámpara Core",
        precio: "$1.300 UYU",
        precioNumero: 1300, 
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
            {
                nombre: "Único",
                hex: "#f5f0e8",
                imagenes: ["../img/core/core.jpeg"]
            }
        ],

        linkMercadoPago: {
            retiro: "https://mpago.la/xxxxx",
            envio: "https://mpago.la/yyyyy"
        }
    }
];