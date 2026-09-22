import {
  EspecificacionGrupo,
  OfertaConcesionaria,
  PasoCompra,
  PreguntaFrecuente,
  RangoPrecio,
  SeccionEspecial,
  Segmento,
  Tienda,
  VehiculoNuevo,
  VehiculoUsado,
  VendedorDestacado,
} from "./types";

// Datos de ejemplo — se van a reemplazar por datos reales desde Supabase
// una vez que conectemos la base de datos.

// Nota sobre "moneda": en el mercado argentino conviven vehículos publicados
// en pesos (lo más habitual, sobre todo gama masiva/nacional) y en dólares
// (frecuente en pickups y gama alta). Cada vehículo declara su propia moneda.
export const vehiculosNuevos: VehiculoNuevo[] = [
  {
    id: "n1",
    marca: "Toyota",
    modelo: "Corolla",
    version: "2.0 XEI",
    segmento: "Sedán",
    anio: 2025,
    combustible: "Nafta",
    transmision: "Automática",
    precioSugerido: 32000000,
    moneda: "ARS",
    imagen: "",
    planAhorro: true,
  },
  {
    id: "n2",
    marca: "Volkswagen",
    modelo: "T-Cross",
    version: "1.0 TSI Highline",
    segmento: "SUV",
    anio: 2024,
    combustible: "Nafta",
    transmision: "Automática",
    precioSugerido: 28500000,
    moneda: "ARS",
    imagen: "",
  },
  {
    id: "n3",
    marca: "Ford",
    modelo: "Ranger",
    version: "3.0 V6 Limited 4x4",
    segmento: "Pickup",
    anio: 2025,
    combustible: "Diesel",
    transmision: "Automática",
    precioSugerido: 48000,
    moneda: "USD",
    imagen: "",
  },
  {
    id: "n4",
    marca: "Chevrolet",
    modelo: "Tracker",
    version: "1.2 Turbo Premier",
    segmento: "SUV",
    anio: 2024,
    combustible: "Nafta",
    transmision: "Automática",
    precioSugerido: 24000000,
    moneda: "ARS",
    imagen: "",
    planAhorro: true,
  },
  {
    id: "n5",
    marca: "BYD",
    modelo: "Dolphin Mini",
    version: "Eléctrico Comfort",
    segmento: "Hatchback",
    anio: 2025,
    combustible: "Eléctrico",
    transmision: "Automática",
    precioSugerido: 21000,
    moneda: "USD",
    imagen: "",
  },
];

// Igual que con los 0km: conviven usados publicados en pesos y en dólares,
// según segmento y vendedor. Cada aviso declara su propia moneda.
export const vehiculosUsados: VehiculoUsado[] = [
  {
    id: "u1",
    marca: "Toyota",
    modelo: "Corolla",
    segmento: "Sedán",
    combustible: "Nafta",
    anio: 2022,
    km: 32500,
    transmision: "Automática",
    precio: 18500,
    moneda: "USD",
    ubicacion: "Buenos Aires",
    vendedor: "Concesionaria",
    imagen: "",
  },
  {
    id: "u2",
    marca: "Volkswagen",
    modelo: "Golf",
    segmento: "Hatchback",
    combustible: "Nafta",
    anio: 2016,
    km: 27500,
    transmision: "Manual",
    precio: 15800000,
    moneda: "ARS",
    ubicacion: "Córdoba",
    vendedor: "Concesionaria",
    imagen: "",
  },
  {
    id: "u3",
    marca: "Ford",
    modelo: "Fiesta",
    segmento: "Hatchback",
    combustible: "Nafta",
    anio: 2017,
    km: 40000,
    transmision: "Automática",
    precio: 9800000,
    moneda: "ARS",
    ubicacion: "Santa Fe",
    vendedor: "Particular",
    imagen: "",
  },
  {
    id: "u4",
    marca: "Chevrolet",
    modelo: "Onix",
    segmento: "Hatchback",
    combustible: "Nafta",
    anio: 2021,
    km: 21000,
    transmision: "Manual",
    precio: 14200000,
    moneda: "ARS",
    ubicacion: "Mendoza",
    vendedor: "Particular",
    imagen: "",
  },
  {
    id: "u5",
    marca: "Jeep",
    modelo: "Compass",
    segmento: "SUV",
    combustible: "Diesel",
    anio: 2020,
    km: 38000,
    transmision: "Automática",
    precio: 22000,
    moneda: "USD",
    ubicacion: "CABA",
    vendedor: "Concesionaria",
    imagen: "",
  },
  {
    id: "u6",
    marca: "Peugeot",
    modelo: "208",
    segmento: "Hatchback",
    combustible: "Nafta",
    anio: 2019,
    km: 52000,
    transmision: "Manual",
    precio: 11300000,
    moneda: "ARS",
    ubicacion: "Rosario",
    vendedor: "Particular",
    imagen: "",
  },
];

// Listado de ejemplo — Marcelo va a pasar el listado completo de marcas
// disponibles en Argentina para reemplazar esto.
export const marcas: string[] = [
  "Volkswagen",
  "Chevrolet",
  "Toyota",
  "Fiat",
  "Peugeot",
  "Ford",
  "Renault",
  "Hyundai",
  "Jeep",
  "Nissan",
];

export const segmentos: Segmento[] = [
  "Sedán",
  "SUV",
  "Hatchback",
  "Pickup",
  "Minivan",
  "Coupé",
];

export const rangosPrecio: RangoPrecio[] = [
  { label: "Hasta USD 20.000", valorMaximo: 20000 },
  { label: "Hasta USD 30.000", valorMaximo: 30000 },
  { label: "Hasta USD 40.000", valorMaximo: 40000 },
];

// Rangos de precio para el filtro del listado de catálogo. Mezclan ARS y USD
// a propósito porque el mercado real mezcla ambas monedas — cuando conectemos
// una cotización en vivo (Supabase) esto se va a normalizar a un solo valor
// comparable.
export const preciosFiltroUSD = ["Hasta USD 30.000", "Hasta USD 50.000"];
export const preciosFiltroARS = ["Hasta $25.000.000", "Hasta $35.000.000"];

// Ofertas de ejemplo para la ficha de un vehículo — genéricas por ahora
// (no reflejan la moneda real de cada vehículo). Se reemplazan por ofertas
// reales por vehículo/concesionaria cuando conectemos Supabase.
export const ofertasConcesionariasEjemplo: OfertaConcesionaria[] = [
  {
    concesionaria: "Umarti Motors CABA",
    ubicacion: "CABA, Buenos Aires",
    precio: 24900,
    moneda: "USD",
    rating: 4.8,
    opiniones: 156,
    tags: ["Mejor precio", "Entrega inmediata"],
    verificada: true,
  },
  {
    concesionaria: "Kansai Pilar",
    ubicacion: "Pilar, Buenos Aires",
    precio: 25000,
    moneda: "USD",
    rating: 4.9,
    opiniones: 312,
    tags: ["Toma tu usado"],
    verificada: true,
  },
  {
    concesionaria: "AutoMax Premium",
    ubicacion: "Rosario, Santa Fe",
    precio: 25200,
    moneda: "USD",
    rating: 4.5,
    opiniones: 89,
    tags: ["Financiación exclusiva"],
    verificada: true,
  },
];

// Especificaciones técnicas de ejemplo — genéricas para cualquier vehículo
// por ahora, hasta que carguemos fichas técnicas reales por modelo.
export const especificacionesEjemplo: EspecificacionGrupo[] = [
  {
    titulo: "Motor",
    items: [
      { label: "Motor", valor: "2.0L 4 cilindros" },
      { label: "Cilindrada", valor: "1987 cc" },
      { label: "Potencia máxima", valor: "170 CV @ 6600 rpm" },
      { label: "Torque máximo", valor: "200 Nm @ 4400-4800 rpm" },
    ],
  },
  {
    titulo: "Transmisión",
    items: [
      { label: "Caja de cambios", valor: "Automática CVT" },
      { label: "Marchas simuladas", valor: "10 velocidades" },
      { label: "Tracción", valor: "Delantera (FWD)" },
    ],
  },
  {
    titulo: "Dimensiones",
    items: [
      { label: "Largo", valor: "4630 mm" },
      { label: "Ancho", valor: "1780 mm" },
      { label: "Alto", valor: "1435 mm" },
      { label: "Distancia entre ejes", valor: "2700 mm" },
    ],
  },
  {
    titulo: "Confort",
    items: [
      { label: "Climatizador", valor: "Automático bi-zona" },
      {
        label: "Sistema multimedia",
        valor: 'Pantalla táctil 9" con Apple CarPlay y Android Auto',
      },
      { label: "Asientos", valor: "Tapizado de tela de alta calidad" },
      { label: "Control de crucero", valor: "Adaptativo (ACC)" },
    ],
  },
  {
    titulo: "Seguridad",
    items: [
      {
        label: "Airbags",
        valor: "7 (frontales, laterales, cortina, rodilla conductor)",
      },
      {
        label: "Frenos",
        valor: "Discos ventilados / discos sólidos con ABS y EBD",
      },
      { label: "Control de estabilidad", valor: "VSC" },
      { label: "Control de tracción", valor: "TRC" },
    ],
  },
];

export const pasosCompra: PasoCompra[] = [
  {
    numero: 1,
    titulo: "Explorá el catálogo",
    descripcion:
      "Buscá por marca, segmento o presupuesto entre miles de vehículos 0km y usados verificados.",
  },
  {
    numero: 2,
    titulo: "Consultá o hacé una oferta",
    descripcion:
      "Contactá directo a la concesionaria o al vendedor, sin intermediarios ocultos.",
  },
  {
    numero: 3,
    titulo: "Coordiná una prueba",
    descripcion: "Probá el vehículo en persona antes de decidir.",
  },
  {
    numero: 4,
    titulo: "Sumá adicionales",
    descripcion:
      "Financiación, seguro, garantía extendida o blindaje, a tu medida.",
  },
  {
    numero: 5,
    titulo: "Cerrá la compra",
    descripcion:
      "Formalizá la operación con el acompañamiento de Umarti Movilidad.",
  },
];

export const preguntasFrecuentes: PreguntaFrecuente[] = [
  {
    pregunta: "¿Los vehículos tienen garantía?",
    respuesta:
      "Los 0km cuentan con garantía oficial de fábrica. Los usados publicados por concesionarias verificadas incluyen la garantía que cada una ofrezca; los de particulares se venden como están, y siempre podés coordinar una revisión antes de comprar.",
  },
  {
    pregunta: "¿Puedo financiar la compra?",
    respuesta:
      "Sí. Desde la sección Adicionales podés consultar opciones de financiación de distintas entidades para el vehículo que elegiste.",
  },
  {
    pregunta: "¿Cómo contacto al vendedor o a la concesionaria?",
    respuesta:
      "Desde la ficha de cada vehículo podés enviar una consulta directa; nosotros la derivamos al vendedor o a la concesionaria correspondiente.",
  },
  {
    pregunta: "¿Puedo reservar un vehículo?",
    respuesta:
      "Sí, muchas publicaciones permiten reservar con una seña mínima para asegurar el precio mientras avanzás con el resto del trámite.",
  },
  {
    pregunta: "¿Umarti Movilidad vende los vehículos directamente?",
    respuesta:
      "No. Somos el marketplace que te conecta con concesionarias y vendedores particulares verificados; la operación se cierra entre vos y el vendedor.",
  },
  {
    pregunta: "¿Y si quiero vender mi auto?",
    respuesta:
      'Desde "Vender mi auto" podés publicar tu vehículo usado en minutos y llegar a miles de compradores interesados.',
  },
];

// Tiendas de ejemplo — concesionarias oficiales, marcas oficiales y agencias
// verificadas. El logo real de cada una se suma cuando conectemos Supabase
// Storage; por ahora se muestra un círculo con las iniciales, igual que en
// el buscador por marca de la Home.
export const tiendas: Tienda[] = [
  {
    id: "t1",
    nombre: "Toyota Buenos Aires",
    categoria: "Concesionaria oficial",
    ubicacion: "CABA, Buenos Aires",
    descripcion:
      "Concesionaria oficial Toyota con más de 20 años de experiencia. Venta de 0km, usados certificados y service oficial.",
    visualizaciones: 1250,
    verificada: true,
    whatsapp: "5491122334400",
    vehiculosNuevosIds: ["n1"],
    vehiculosUsadosIds: ["u1"],
  },
  {
    id: "t2",
    nombre: "Ford Centro",
    categoria: "Concesionaria oficial",
    ubicacion: "Rosario, Santa Fe",
    descripcion:
      "Tu Ford 0km está acá. Excelentes planes de financiación y toma de tu usado como parte de pago.",
    visualizaciones: 890,
    verificada: true,
    whatsapp: "5491122334401",
    vehiculosNuevosIds: ["n3"],
    vehiculosUsadosIds: ["u3", "u6"],
  },
  {
    id: "t3",
    nombre: "Chevrolet Argentina",
    categoria: "Marca oficial",
    ubicacion: "Vicente López, Buenos Aires",
    descripcion:
      "Tienda oficial de Chevrolet. Descubrí nuestros últimos lanzamientos y promociones exclusivas para clientes Umarti.",
    visualizaciones: 5400,
    verificada: true,
    whatsapp: "5491122334402",
    vehiculosNuevosIds: ["n4"],
    vehiculosUsadosIds: [],
  },
  {
    id: "t4",
    nombre: "Volkswagen Directo",
    categoria: "Marca oficial",
    ubicacion: "General Pacheco, Buenos Aires",
    descripcion:
      "Canal de ventas directo de fábrica. Beneficios exclusivos, plan de ahorro y entrega prioritaria.",
    visualizaciones: 4200,
    verificada: true,
    whatsapp: "5491122334403",
    vehiculosNuevosIds: ["n2"],
    vehiculosUsadosIds: ["u2"],
  },
  {
    id: "t5",
    nombre: "AutoMax Rosario",
    categoria: "Agencia",
    ubicacion: "Rosario, Santa Fe",
    descripcion:
      "Agencia multimarca especializada en usados seleccionados, todos con revisión mecánica de 120 puntos.",
    visualizaciones: 610,
    verificada: true,
    whatsapp: "5491122334404",
    vehiculosNuevosIds: [],
    vehiculosUsadosIds: ["u4"],
  },
  {
    id: "t6",
    nombre: "Premium Motors CABA",
    categoria: "Agencia",
    ubicacion: "CABA, Buenos Aires",
    descripcion:
      "Agencia boutique de vehículos premium, 0km y usados de alta gama, con entrega a todo el país.",
    visualizaciones: 980,
    verificada: true,
    whatsapp: "5491122334405",
    vehiculosNuevosIds: ["n5"],
    vehiculosUsadosIds: ["u5"],
  },
];

// Vendedores destacados — perfiles individuales de vendedores verificados
// dentro de las tiendas de arriba, para contacto directo por WhatsApp.
export const vendedoresDestacados: VendedorDestacado[] = [
  {
    id: "v1",
    nombre: "Lucas Fernández",
    tienda: "Umarti Motors CABA",
    mensaje:
      "Consultame por el 0km que buscás, te asesoro sin compromiso.",
    whatsapp: "5491122334455",
  },
  {
    id: "v2",
    nombre: "Martina Gómez",
    tienda: "Kansai Pilar",
    mensaje: "Financiación a medida y entrega inmediata. Escribime.",
    marca: "Volkswagen",
    whatsapp: "5491133445566",
  },
  {
    id: "v3",
    nombre: "Nicolás Ibáñez",
    tienda: "AutoMax Premium",
    mensaje: "Especialista en usados certificados. Te ayudo a elegir.",
    whatsapp: "5491144556677",
  },
];

// Secciones especiales — hubs temáticos que combinan catálogo, clasificados,
// notas editoriales y herramientas alrededor de un tema puntual. Las que
// tienen "filtro" calculan sus vehículos dinámicamente sobre vehiculosNuevos
// (y vehiculosUsados, solo por segmento/combustible); las que no, usan una
// curación manual por ID hasta que existan atributos propios en los datos.
//
// Nota sobre "Mujeres en Ruta": Marcelo pidió algo en la línea de "Mujeres
// al Volante", pero esa marca ya está registrada por otra empresa — se usa
// acá un nombre de trabajo distinto a propósito. Falta que Marcelo confirme
// el nombre final antes de publicarla.
export const seccionesEspeciales: SeccionEspecial[] = [
  {
    slug: "planes-de-ahorro",
    nombre: "Planes de ahorro",
    resumen:
      "Accedé a tu 0km con cuotas mensuales, sin necesidad de un crédito tradicional.",
    descripcion:
      "Los planes de ahorro te permiten adjudicar un vehículo 0km pagando cuotas mensuales, sin depender de la aprobación de un banco. Acá reunimos los vehículos disponibles en esta modalidad, notas para entender cómo funciona y herramientas para elegir el plan que más te conviene.",
    filtro: { planAhorro: true },
    articulos: [
      {
        titulo: "Cómo funciona un plan de ahorro para 0km",
        resumen:
          "Los pasos desde que te suscribís hasta que adjudicás tu vehículo: licitación, sorteo y autoahorro.",
      },
      {
        titulo: "Plan de ahorro vs. crédito prendario: ventajas y diferencias",
        resumen:
          "Qué conviene según tu situación: cuota fija vs. financiación bancaria tradicional.",
      },
    ],
    herramientas: [
      {
        titulo: "Simulador de cuotas",
        descripcion:
          "Calculá el valor aproximado de tu cuota según el modelo y el plazo del plan.",
      },
      {
        titulo: "Comparador de planes",
        descripcion:
          "Compará condiciones entre las distintas concesionarias adheridas.",
      },
    ],
  },
  {
    slug: "autos-electricos",
    nombre: "Autos eléctricos",
    resumen:
      "La nueva generación de movilidad: 0 emisiones, menor costo por km y tecnología de punta.",
    descripcion:
      "El parque eléctrico argentino todavía es chico, pero crece rápido: más modelos disponibles, más puntos de carga y beneficios impositivos en varias provincias. Acá reunimos los eléctricos del catálogo y contenido para perder el miedo a dar el salto.",
    filtro: { combustible: "Eléctrico" },
    articulos: [
      {
        titulo: "Guía para cargar tu auto eléctrico en Argentina",
        resumen:
          "Carga en casa, en la vía pública y en rutas: qué necesitás y cuánto tarda cada una.",
      },
      {
        titulo: "Incentivos y beneficios impositivos para vehículos eléctricos",
        resumen:
          "Qué provincias ya tienen exenciones de patente y otros beneficios vigentes.",
      },
    ],
    herramientas: [
      {
        titulo: "Mapa de puntos de carga",
        descripcion:
          "Encontrá cargadores públicos cerca tuyo o en tu próximo viaje.",
      },
      {
        titulo: "Calculadora de ahorro en combustible",
        descripcion:
          "Estimá cuánto ahorrás por mes cambiando de nafta a eléctrico según tu recorrido.",
      },
    ],
  },
  {
    slug: "pickups-4x4",
    nombre: "Pickups y 4x4",
    resumen:
      "Fuerza y versatilidad para el trabajo y la aventura, en 0km y usados verificados.",
    descripcion:
      "Trabajo, aventura o las dos cosas: reunimos las pickups y 4x4 del catálogo y de clasificados, con contenido para ayudarte a elegir la que mejor se adapta a lo que necesitás.",
    filtro: { segmento: "Pickup" },
    articulos: [
      {
        titulo: "Cómo elegir la pickup ideal según el uso",
        resumen:
          "Carga útil, cabina simple o doble, y qué mirar según sea para trabajo o uso familiar.",
      },
      {
        titulo: "4x2 vs 4x4: cuál te conviene",
        resumen:
          "Diferencias reales de tracción, consumo y precio entre ambas configuraciones.",
      },
    ],
    herramientas: [
      {
        titulo: "Comparador de capacidad de carga",
        descripcion:
          "Compará caja, capacidad de carga y peso remolcable entre modelos.",
      },
      {
        titulo: "Guía de financiación para pickups",
        descripcion:
          "Opciones de crédito prendario y planes de ahorro específicos para utilitarios.",
      },
    ],
  },
  {
    slug: "agro",
    nombre: "Agro",
    resumen:
      "Vehículos y utilitarios pensados para el trabajo rural, con financiación para el sector.",
    descripcion:
      "Pickups y utilitarios preparados para el campo, pensados para productores y empresas agropecuarias. Por ahora compartimos catálogo con Pickups y 4x4 — a medida que sumemos inventario específico para el agro (utilitarios pesados, maquinaria) esta sección va a tener su propia curación.",
    vehiculosNuevosIds: ["n3"],
    vehiculosUsadosIds: [],
    articulos: [
      {
        titulo: "Qué vehículo elegir para trabajo de campo",
        resumen:
          "Capacidad de carga, tracción y resistencia: las prioridades cambian respecto al uso urbano.",
      },
      {
        titulo: "Financiación para productores agropecuarios",
        resumen:
          "Líneas de crédito y planes pensados para el sector, con condiciones especiales.",
      },
    ],
    herramientas: [
      {
        titulo: "Directorio de concesionarias rurales",
        descripcion:
          "Encontrá concesionarias con entrega y service en zonas productivas.",
      },
      {
        titulo: "Guía de patentamiento para uso rural",
        descripcion:
          "Trámites y exenciones que pueden aplicar según la provincia y el uso del vehículo.",
      },
    ],
  },
  {
    slug: "mujeres-en-ruta",
    nombre: "Mujeres en Ruta",
    resumen:
      "Una comunidad para comprar y vender con confianza: vendedores verificados, asesoramiento sin presión y tips de seguridad.",
    descripcion:
      "Una sección pensada para comprar o vender con más tranquilidad: vendedores verificados, asesoramiento sin presión, y contenido práctico sobre seguridad e inspección antes de comprar. Los vehículos de acá abajo son una selección de ejemplo — a futuro se va a curar según lo que la comunidad pida.",
    vehiculosNuevosIds: ["n1", "n2", "n5"],
    vehiculosUsadosIds: ["u2", "u6"],
    articulos: [
      {
        titulo: "Guía para comprar tu primer auto con confianza",
        resumen:
          "Qué preguntar, qué documentación pedir y cómo evitar las estafas más comunes.",
      },
      {
        titulo: "Qué mirar en una inspección antes de comprar un usado",
        resumen:
          "Un checklist simple para revisar (o hacer revisar) un auto antes de cerrar la compra.",
      },
    ],
    herramientas: [
      {
        titulo: "Directorio de talleres de confianza",
        descripcion:
          "Talleres recomendados por la comunidad para revisar un usado antes de comprarlo.",
      },
      {
        titulo: "Checklist de seguridad antes de viajar",
        descripcion:
          "Una lista simple para chequear tu auto antes de salir de viaje.",
      },
    ],
  },
];
