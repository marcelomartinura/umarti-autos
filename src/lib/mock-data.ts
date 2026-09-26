import {
  ArticuloDealers,
  ArticuloEditorial,
  CategoriaAdicional,
  ComunidadCategoria,
  EspecificacionGrupo,
  HerramientaUtil,
  OfertaConcesionaria,
  PasoCompra,
  PreguntaFrecuente,
  RangoPrecio,
  SeccionEspecial,
  Segmento,
  ServicioIndustria,
  ServicioOficialMarca,
  Taller,
  TemaDebate,
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

// Número de WhatsApp central de Umarti Movilidad para consultas sobre
// servicios adicionales (no son concesionarias individuales, así que se
// atienden desde un único canal de la plataforma). Reemplazar por el
// número real cuando Marcelo lo confirme.
export const UMARTI_WHATSAPP_ADICIONALES = "5491122334400";

// Servicios adicionales — todo lo que rodea a la compra de un vehículo,
// más allá del vehículo en sí. Se muestran en una sola página (/adicionales)
// con una sección por categoría, para que sea fácil de imprimir o compartir
// completa. Se dejó afuera "Servicios Posventa" (ya tiene su propia sección
// en el menú, /posventa) para no duplicar contenido.
export const categoriasAdicionales: CategoriaAdicional[] = [
  {
    slug: "seguros",
    nombre: "Seguros",
    resumen:
      "Cobertura para tu 0km o usado, con las principales compañías del mercado.",
    descripcion:
      "Asegurá tu vehículo antes de retirarlo del concesionario o de recibir tu usado. Te ayudamos a comparar coberturas (terceros completo, todo riesgo, granizo) y a elegir la que mejor se ajusta a tu uso y presupuesto, con la posibilidad de pagar en cuotas.",
    beneficios: [
      "Cotización con varias compañías en una sola consulta",
      "Cobertura todo riesgo, terceros completo o granizo",
      "Pago en cuotas, sin cargo por gestión de Umarti",
      "Asistencia al viajero y auto sustituto en las coberturas que lo incluyen",
    ],
    whatsapp: UMARTI_WHATSAPP_ADICIONALES,
  },
  {
    slug: "financiamiento",
    nombre: "Financiamiento",
    resumen:
      "Créditos prendarios y líneas de financiación para 0km y usados.",
    descripcion:
      "Si no vas a pagar de contado, te acercamos opciones de crédito prendario de bancos y financieras, además de la financiación propia de cada concesionaria. Usá el simulador de esta página para tener una primera estimación de cuota antes de avanzar con una consulta formal.",
    beneficios: [
      "Comparación entre distintas entidades financieras",
      "Simulador de cuotas orientativo, sin compromiso",
      "Asesoramiento para elegir plazo y anticipo convenientes",
      "Aplica tanto para 0km como para usados certificados",
    ],
    whatsapp: UMARTI_WHATSAPP_ADICIONALES,
  },
  {
    slug: "gestoria",
    nombre: "Gestoría",
    resumen:
      "Transferencias, patentamiento y trámites, sin hacer colas.",
    descripcion:
      "Todo el papeleo de comprar o vender un vehículo (transferencia, patentamiento de 0km, informes de dominio, cambio de radicación) resuelto por gestores matriculados que trabajan con Umarti Movilidad, para que no tengas que ocuparte vos de las colas y el trámite.",
    beneficios: [
      "Transferencia de titularidad de punta a punta",
      "Patentamiento de vehículos 0km",
      "Informes de dominio y libre deuda de patentes",
      "Seguimiento del trámite por WhatsApp",
    ],
    whatsapp: UMARTI_WHATSAPP_ADICIONALES,
  },
  {
    slug: "garantias-extendidas",
    nombre: "Garantías extendidas",
    resumen: "Cobertura mecánica más allá de la garantía de fábrica.",
    descripcion:
      "Extendé la protección de tu vehículo una vez vencida la garantía oficial, con planes que cubren motor, caja y componentes principales. Especialmente recomendado para usados sin garantía vigente o para quienes van a hacer muchos kilómetros.",
    beneficios: [
      "Cobertura de motor, caja y tren delantero/trasero",
      "Planes desde 1 hasta 3 años adicionales",
      "Red de talleres habilitados en todo el país",
      "Ideal para usados sin garantía de fábrica vigente",
    ],
    whatsapp: UMARTI_WHATSAPP_ADICIONALES,
  },
  {
    slug: "blindajes",
    nombre: "Blindajes",
    resumen: "Blindaje homologado para mayor seguridad personal.",
    descripcion:
      "Para quienes buscan un nivel de protección adicional, trabajamos con talleres especializados en blindaje homologado (nivel III-A y superiores), con la documentación en regla para circular y con impacto medido en peso y manejo del vehículo.",
    beneficios: [
      "Blindaje homologado, con documentación en regla",
      "Distintos niveles de protección según el uso",
      "Talleres especializados con experiencia en el mercado local",
      "Asesoramiento sobre impacto en peso, consumo y manejo",
    ],
    whatsapp: UMARTI_WHATSAPP_ADICIONALES,
  },
  {
    slug: "accesorios",
    nombre: "Accesorios",
    resumen: "Equipamiento y personalización para tu vehículo.",
    descripcion:
      "Desde equipamiento práctico (barras, cubre alfombras, sensores de estacionamiento) hasta personalización estética, te conectamos con proveedores de accesorios originales y de calidad para completar tu vehículo 0km o usado.",
    beneficios: [
      "Accesorios originales y alternativos de calidad",
      "Instalación coordinada por talleres recomendados",
      "Ideal para completar la entrega de un 0km",
      "Opciones para trabajo (utilitarios) y para uso particular",
    ],
    whatsapp: UMARTI_WHATSAPP_ADICIONALES,
  },
  {
    slug: "alquiler-de-autos",
    nombre: "Alquiler de autos",
    resumen: "Para mientras esperás tu vehículo o para viajes puntuales.",
    descripcion:
      "Mientras se resuelve el patentamiento de tu 0km, o para un viaje puntual, te acercamos opciones de alquiler de vehículos a corto y mediano plazo con empresas asociadas, en distintas ciudades del país.",
    beneficios: [
      "Alquiler a corto y mediano plazo",
      "Disponibilidad en las principales ciudades",
      "Útil mientras se resuelve el patentamiento de tu 0km",
      "Tarifas preferenciales para usuarios de Umarti Movilidad",
    ],
    whatsapp: UMARTI_WHATSAPP_ADICIONALES,
  },
];

// Provincias argentinas (24 jurisdicciones) — se usan como filtro en
// Posventa. Lista fija por ahora, no depende de la ubicación real de cada
// concesionaria/taller hasta que carguemos datos reales.
export const provinciasArgentina: string[] = [
  "CABA",
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

// Posventa — service oficial de marca (leads para concesionarias). Cada
// entrada es el centro de service oficial de una concesionaria para una
// marca puntual; el listado se filtra por marca y por provincia. Separado
// a propósito del listado de "tiendas" (que es para venta de 0km/usados) y
// de "talleres" (independientes, no oficiales de una marca).
export const serviciosOficiales: ServicioOficialMarca[] = [
  {
    id: "so1",
    marca: "Toyota",
    nombre: "Toyota Buenos Aires — Service Oficial",
    provincia: "CABA",
    ciudad: "CABA",
    descripcion:
      "Service programado con repuestos originales y técnicos certificados por la marca. Mantené la garantía de fábrica al día.",
    servicios: ["Service programado", "Garantía de fábrica", "Repuestos originales"],
    whatsapp: "5491122334420",
    verificado: true,
  },
  {
    id: "so2",
    marca: "Volkswagen",
    nombre: "Volkswagen Directo — Posventa",
    provincia: "Buenos Aires",
    ciudad: "General Pacheco",
    descripcion:
      "Centro de service oficial VW con turno online y auto de cortesía para services que superen el día.",
    servicios: ["Service programado", "Auto de cortesía", "Repuestos originales"],
    whatsapp: "5491122334421",
    verificado: true,
  },
  {
    id: "so3",
    marca: "Ford",
    nombre: "Ford Centro — Taller Oficial",
    provincia: "Santa Fe",
    ciudad: "Rosario",
    descripcion:
      "Taller oficial Ford para service, garantía extendida y reparaciones cubiertas por la marca.",
    servicios: ["Service programado", "Garantía extendida", "Diagnóstico computarizado"],
    whatsapp: "5491122334422",
    verificado: true,
  },
  {
    id: "so4",
    marca: "Chevrolet",
    nombre: "Chevrolet Argentina — Posventa",
    provincia: "Buenos Aires",
    ciudad: "Vicente López",
    descripcion:
      "Red oficial Chevrolet: service programado, campañas de seguridad y repuestos originales GM.",
    servicios: ["Service programado", "Campañas de seguridad", "Repuestos originales"],
    whatsapp: "5491122334423",
    verificado: true,
  },
  {
    id: "so5",
    marca: "Peugeot",
    nombre: "Peugeot Rosario — Service Oficial",
    provincia: "Santa Fe",
    ciudad: "Rosario",
    descripcion:
      "Mantenimiento oficial Peugeot con técnicos certificados y seguimiento del plan de service por vehículo.",
    servicios: ["Service programado", "Garantía de fábrica", "Turno online"],
    whatsapp: "5491122334424",
    verificado: true,
  },
  {
    id: "so6",
    marca: "Jeep",
    nombre: "Jeep Córdoba — Posventa",
    provincia: "Córdoba",
    ciudad: "Córdoba",
    descripcion:
      "Centro oficial Jeep para 4x4: service programado, preparación para ruta/off-road y repuestos originales.",
    servicios: ["Service programado", "Preparación 4x4", "Repuestos originales"],
    whatsapp: "5491122334425",
    verificado: true,
  },
];

// Talleres independientes — no dependen de una marca; algunos son
// multimarca y otros se especializan en un rubro puntual (chapa, eléctrica,
// neumáticos, etc.). Listado separado del de concesionarias, a pedido de
// Marcelo.
export const talleres: Taller[] = [
  {
    id: "ta1",
    nombre: "Taller Belgrano",
    especialidad: "Multimarca",
    marcasQueAtiende: ["Todas"],
    provincia: "CABA",
    ciudad: "CABA",
    descripcion:
      "Mecánica general multimarca con más de 15 años de trayectoria en el barrio. Presupuesto sin cargo.",
    whatsapp: "5491122334430",
    verificado: true,
  },
  {
    id: "ta2",
    nombre: "ChapaExpress Rosario",
    especialidad: "Chapa y pintura",
    marcasQueAtiende: ["Todas"],
    provincia: "Santa Fe",
    ciudad: "Rosario",
    descripcion:
      "Chapa y pintura para siniestros y detalles estéticos, con gestión directa con las principales aseguradoras.",
    whatsapp: "5491122334431",
    verificado: true,
  },
  {
    id: "ta3",
    nombre: "ElectroAuto Mendoza",
    especialidad: "Electricidad",
    marcasQueAtiende: ["Volkswagen", "Ford", "Chevrolet"],
    provincia: "Mendoza",
    ciudad: "Mendoza",
    descripcion:
      "Especialistas en electricidad y electrónica automotriz: diagnóstico de fallas, alarmas y climatización.",
    whatsapp: "5491122334432",
    verificado: true,
  },
  {
    id: "ta4",
    nombre: "Neumáticos del Sur",
    especialidad: "Neumáticos y alineación",
    marcasQueAtiende: ["Todas"],
    provincia: "Río Negro",
    ciudad: "Bariloche",
    descripcion:
      "Venta e instalación de neumáticos, alineación y balanceo computarizado para autos y pickups.",
    whatsapp: "5491122334433",
    verificado: true,
  },
  {
    id: "ta5",
    nombre: "Taller Córdoba Capital",
    especialidad: "Mecánica general",
    marcasQueAtiende: ["Toyota", "Peugeot", "Jeep"],
    provincia: "Córdoba",
    ciudad: "Córdoba",
    descripcion:
      "Mecánica general y diagnóstico computarizado, con seguimiento del historial de service por WhatsApp.",
    whatsapp: "5491122334434",
    verificado: true,
  },
  {
    id: "ta6",
    nombre: "Clima Auto CABA",
    especialidad: "Aire acondicionado",
    marcasQueAtiende: ["Todas"],
    provincia: "CABA",
    ciudad: "CABA",
    descripcion:
      "Carga y reparación de aire acondicionado para todas las marcas, con diagnóstico previo sin cargo.",
    whatsapp: "5491122334435",
    verificado: true,
  },
];

// Pasos para pedir un turno de service — mismo formato que pasosCompra,
// pensado para el bloque "¿Cómo pido un turno de service?" en /posventa.
export const pasosTurnoService: PasoCompra[] = [
  {
    numero: 1,
    titulo: "Elegí marca y provincia",
    descripcion:
      "Filtrá entre service oficial de tu marca o talleres independientes cerca tuyo.",
  },
  {
    numero: 2,
    titulo: "Comparte las opciones",
    descripcion:
      "Mirá servicios ofrecidos, especialidad y si atiende tu marca antes de decidir.",
  },
  {
    numero: 3,
    titulo: "Coordiná por WhatsApp",
    descripcion:
      "Escribile directo al centro de service o al taller elegido para pedir el turno.",
  },
  {
    numero: 4,
    titulo: "Llevá tu vehículo el día pactado",
    descripcion:
      "Confirmá kilometraje y detalle de lo que necesitás antes de dejar el vehículo.",
  },
  {
    numero: 5,
    titulo: "Retirá con el detalle del service",
    descripcion:
      "Pedí el detalle de lo realizado para llevar un historial completo de mantenimiento.",
  },
];

// Notas sobre posventa — contenido editorial de ejemplo, mismo patrón que
// los "articulos" de cada sección especial (título + resumen, marcados
// "Próximamente" hasta escribir la nota completa).
export const articulosPosventa: ArticuloEditorial[] = [
  {
    titulo: "Cada cuánto hacer el service según el fabricante",
    resumen:
      "Los intervalos recomendados varían por marca y motor: guía rápida para no adelantarte ni atrasarte.",
  },
  {
    titulo: "Service oficial vs. taller independiente: qué conviene",
    resumen:
      "Diferencias reales en precio, garantía y repuestos entre ambas opciones, según la antigüedad del vehículo.",
  },
  {
    titulo: "Qué revisar antes de un viaje largo",
    resumen:
      "Un checklist simple de neumáticos, frenos, líquidos y batería antes de salir de viaje.",
  },
  {
    titulo: "Cómo no perder la garantía de fábrica",
    resumen:
      "Qué exige cada marca en materia de service programado para no perder la cobertura del vehículo.",
  },
];

// Número de WhatsApp central para publicaciones de "Vender mi auto" (leads
// C2C de particulares, distinto de los canales B2B/Adicionales para que
// Marcelo pueda derivar la moderación de publicaciones a otro responsable).
export const UMARTI_WHATSAPP_VENDER = "5491122334440";

// Colores de ejemplo para el formulario de "Vender mi auto" — lista fija
// simple, no hace falta un tipo propio.
export const coloresVehiculo: string[] = [
  "Blanco",
  "Negro",
  "Gris",
  "Plata",
  "Rojo",
  "Azul",
  "Verde",
  "Otro",
];

// Número de WhatsApp central para leads B2B (concesionarias, agencias y
// proveedores que quieren sumarse al ecosistema). Distinto del de Adicionales
// a propósito, para que Marcelo pueda derivar estas consultas a otro canal/
// responsable comercial. Reemplazar por el número real cuando lo confirme.
export const UMARTI_WHATSAPP_ECOSISTEMA = "5491122334410";

// Hub de servicios para la industria — inspirado en la página de referencia
// que compartió Marcelo ("Servicios para Dealers"), adaptado a lo que ya
// existe en Umarti (Publicidad, gestión de leads) más servicios de terceros
// típicos de este tipo de portal B2B (marketing, IA, consultoría,
// capacitación). Van primero en /ecosistema-negocios, antes que el resto,
// a pedido de Marcelo.
export const serviciosIndustria: ServicioIndustria[] = [
  {
    slug: "marketing-agencias",
    nombre: "Marketing para agencias",
    resumen: "Soluciones de marketing digital para concesionarias y agencias.",
    descripcion:
      "Campañas de pauta, redes sociales y contenido pensadas específicamente para vender vehículos, no productos genéricos.",
  },
  {
    slug: "agentes-conversacionales",
    nombre: "Agentes conversacionales",
    resumen: "Automatizá ventas y atención al cliente con inteligencia artificial.",
    descripcion:
      "Respondé consultas de catálogo, agendá turnos de service y calificá leads las 24 horas, sin perder el tono de tu marca.",
  },
  {
    slug: "consultoria-transformacion-digital",
    nombre: "Consultoría en Transformación Digital",
    resumen: "Modernizá tu negocio con soluciones tecnológicas innovadoras.",
    descripcion:
      "Un diagnóstico de tus procesos de venta y posventa, y un plan concreto para digitalizarlos sin descartar lo que ya funciona.",
  },
  {
    slug: "publicidad-en-umarti",
    nombre: "Publicidad en Umarti",
    resumen: "Destacá tu concesionaria en catálogo, clasificados y tiendas.",
    descripcion:
      "Espacios de visibilidad dentro del sitio para que tu inventario aparezca primero frente a compradores activos.",
  },
  {
    slug: "gestion-de-leads-crm",
    nombre: "Gestión de leads y CRM",
    resumen: "Centralizá y hacé seguimiento de las consultas que te llegan por Umarti.",
    descripcion:
      "Organizá los leads de WhatsApp, catálogo y clasificados en un solo lugar para no perder ninguna oportunidad de venta.",
  },
  {
    slug: "capacitacion-comercial",
    nombre: "Capacitación comercial",
    resumen: "Entrená a tu equipo en atención digital y cierre de leads online.",
    descripcion:
      "Talleres prácticos para que tu equipo de ventas convierta más consultas de WhatsApp y catálogo en visitas reales.",
  },
];

// Comunidad — versión 100% digital y todo el año de la idea de un evento
// como "Auto.Tienda", separada por categoría. Por ahora es una landing con
// lista de interés (sin backend todavía): primero contenido y validación,
// después se define la plataforma final de conversación.
export const categoriasComunidad: ComunidadCategoria[] = [
  {
    categoria: "Autos",
    descripcion:
      "Concesionarias, agencias y vendedores del mundo del auto de pasajeros.",
  },
  {
    categoria: "Motos",
    descripcion:
      "Concesionarias e importadores de motos, y todo lo que rodea a las dos ruedas.",
  },
  {
    categoria: "Camiones",
    descripcion:
      "Transporte de carga, logística y todo lo vinculado a vehículos pesados.",
  },
];

// Zona de Conocimiento — temas para debatir dentro de la Comunidad (a
// diferencia del blog de dealers, que es contenido ya escrito, acá la idea
// es plantear un tema y que se debata entre los participantes). Primer paso
// sin filtro por rol; Marcelo quiere sumar más adelante un filtro por
// Líder/Vendedor, y tener cuidado de que esto no se vuelva un canal de
// venta — de ahí la bajada de la sección en /comunidad.
export const temasDebate: TemaDebate[] = [
  {
    slug: "customer-journey-0km",
    categoria: "Customer Journey y Ventas",
    titulo: "¿Cómo compra hoy un cliente de 0km?",
    resumen:
      "Del primer clic a la firma del contrato: ¿dónde se informa, dónde compara y qué lo termina de convencer?",
  },
  {
    slug: "funnel-de-venta-leads",
    categoria: "Customer Journey y Ventas",
    titulo: "Funnel de venta: ¿dónde se caen más los leads?",
    resumen:
      "Compartí en qué etapa perdés más consultas y cómo la estás atacando en tu concesionaria o agencia.",
  },
  {
    slug: "agentes-conversacionales-debate",
    categoria: "Tecnología e IA",
    titulo: "Agentes conversacionales: ¿reemplazan o potencian al vendedor?",
    resumen:
      "Experiencias reales usando IA para atención y calificación de leads, a favor y en contra.",
  },
  {
    slug: "redes-sociales-o-portales",
    categoria: "Marketing y Contenido",
    titulo: "¿Vale más invertir en redes sociales o en portales?",
    resumen:
      "Dónde está poniendo cada uno su presupuesto de marketing y qué resultados está viendo.",
  },
  {
    slug: "indicadores-clave-concesionaria",
    categoria: "Gestión y Operaciones",
    titulo: "Los indicadores que sí o sí deberías mirar cada semana",
    resumen:
      "Tiempo de respuesta, conversión por vendedor, rotación de stock: qué mira cada uno y por qué.",
  },
];

// Blog para concesionarias y agencias — contenido pensado para quienes ya
// son (o quieren ser) parte del ecosistema de negocios: cómo publicar bien
// sus autos, cómo sumarse a posventa, cómo gestionar su tienda, cómo
// anunciarse en el sitio, y novedades de la plataforma. Sin página de
// detalle todavía (mismo patrón "Próximamente" que el resto del contenido
// editorial del sitio) — están todos con fecha y categoría para que ya se
// pueda filtrar y ordenar.
export const articulosDealers: ArticuloDealers[] = [
  {
    slug: "como-publicar-tu-primer-vehiculo",
    categoria: "Cómo publicar tus autos",
    titulo: "Guía rápida: cómo publicar tu primer vehículo en Umarti",
    resumen:
      "Los datos mínimos que necesitás cargar y los errores más comunes que hacen que un aviso pase desapercibido.",
    fecha: "2026-08-12",
  },
  {
    slug: "fotos-que-venden-mas-rapido",
    categoria: "Cómo publicar tus autos",
    titulo: "5 tips de fotos que hacen vender más rápido",
    resumen:
      "Luz, ángulos y cantidad mínima de fotos recomendada para que tu publicación se destaque en el listado.",
    fecha: "2026-08-26",
  },
  {
    slug: "sumar-tu-concesionaria-a-service-oficial",
    categoria: "Posventa para tu negocio",
    titulo: "Cómo sumar tu concesionaria al listado de Service Oficial",
    resumen:
      "Qué información necesitamos para publicar tu centro de service oficial en /posventa y empezar a recibir turnos.",
    fecha: "2026-09-23",
  },
  {
    slug: "por-que-conviene-turnos-por-whatsapp",
    categoria: "Posventa para tu negocio",
    titulo: "Por qué conviene ofrecer turnos de service por WhatsApp",
    resumen:
      "Menos fricción para el cliente, respuesta más rápida y menos turnos perdidos que con un formulario tradicional.",
    fecha: "2026-09-24",
  },
  {
    slug: "mantener-actualizado-el-perfil-de-tu-tienda",
    categoria: "Gestión de tu tienda",
    titulo: "Cómo mantener actualizado el perfil de tu tienda",
    resumen:
      "Descripción, logo, ubicación y WhatsApp: la info que más impacta en que un comprador te elija a vos.",
    fecha: "2026-09-02",
  },
  {
    slug: "que-mirar-en-las-visualizaciones-de-tu-tienda",
    categoria: "Gestión de tu tienda",
    titulo: "Qué mirar en las estadísticas de visualizaciones de tu tienda",
    resumen:
      "Cómo interpretar las visualizaciones de tu perfil para saber si tu catálogo necesita un ajuste.",
    fecha: "2026-09-10",
  },
  {
    slug: "como-destacar-tu-concesionaria-en-los-listados",
    categoria: "Publicidad en Umarti",
    titulo: "Cómo destacar tu concesionaria en los listados",
    resumen:
      "Opciones para que tu tienda aparezca primero en Tiendas y en los resultados de Catálogo y Clasificados.",
    fecha: "2026-09-15",
  },
  {
    slug: "espacios-publicitarios-disponibles",
    categoria: "Publicidad en Umarti",
    titulo: "Espacios publicitarios disponibles en Umarti Movilidad",
    resumen:
      "Un recorrido por los espacios de publicidad del sitio y cómo consultar disponibilidad y condiciones.",
    fecha: "2026-09-18",
  },
  {
    slug: "lanzamos-secciones-especiales",
    categoria: "Novedades y lanzamientos",
    titulo: "Lanzamos Secciones especiales: nuevas formas de llegar a compradores",
    resumen:
      "Planes de ahorro, autos eléctricos, pickups y 4x4 y más: nuevas puertas de entrada a tu inventario.",
    fecha: "2026-09-22",
  },
  {
    slug: "lanzamos-posventa",
    categoria: "Novedades y lanzamientos",
    titulo: "Nueva sección de Posventa: sumate como service oficial o taller",
    resumen:
      "Ya podés generar leads de posventa filtrados por marca y por provincia, separados entre concesionarias y talleres.",
    fecha: "2026-09-23",
  },
];

// Herramientas para concesionarias — la de "Generador de descripciones" ya
// funciona (ver GeneradorDescripcion.tsx); el resto son ideas ya definidas,
// marcadas "Próximamente" hasta que las construyamos.
export const herramientasDealers: HerramientaUtil[] = [
  {
    titulo: "Panel de estadísticas de tu tienda",
    descripcion:
      "Visualizaciones, consultas por WhatsApp y autos más vistos de tu inventario, en un solo panel.",
  },
  {
    titulo: "Plantillas para redes sociales",
    descripcion:
      "Diseños listos para compartir tus vehículos destacados en Instagram y Facebook.",
  },
  {
    titulo: "Calculadora de alcance publicitario",
    descripcion:
      "Estimá cuántas personas podrían ver tu concesionaria destacada según la categoría y la ubicación.",
  },
];

export const preguntasFrecuentesAdicionales: PreguntaFrecuente[] = [
  {
    pregunta: "¿Los servicios adicionales tienen costo por gestión de Umarti?",
    respuesta:
      "No. Umarti Movilidad te conecta con las empresas y profesionales que prestan cada servicio; las condiciones y el costo son los que ofrece cada proveedor, sin cargos extra de la plataforma.",
  },
  {
    pregunta: "¿Puedo contratar un adicional sin haber comprado el vehículo en Umarti?",
    respuesta:
      "Sí. Seguros, financiamiento, gestoría, garantías extendidas, blindaje, accesorios y alquiler están disponibles aunque hayas comprado tu vehículo en otro lado.",
  },
  {
    pregunta: "¿El simulador de financiamiento es una oferta en firme?",
    respuesta:
      "No, es una estimación orientativa para que tengas una idea del valor de la cuota. La oferta final depende de la evaluación crediticia de cada entidad financiera.",
  },
  {
    pregunta: "¿Cuánto tarda una transferencia gestionada por Umarti?",
    respuesta:
      "Depende del trámite y la provincia, pero como referencia una transferencia estándar suele resolverse en pocos días hábiles una vez que está toda la documentación en regla.",
  },
  {
    pregunta: "¿Puedo combinar varios adicionales para el mismo vehículo?",
    respuesta:
      "Sí, por ejemplo financiación más seguro más gestoría de patentamiento para un mismo 0km. Podés consultar por todos juntos desde un mismo contacto de WhatsApp.",
  },
];
