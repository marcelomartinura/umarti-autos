// Configuración central de Google AdSense.
//
// 1) El "ID de cliente" (algo como ca-pub-1234567890123456) NO va acá — se
//    configura como variable de entorno en Vercel, con el nombre
//    NEXT_PUBLIC_ADSENSE_CLIENT_ID. Mientras esa variable no exista, el sitio
//    va a mostrar un espacio reservado ("Espacio publicitario") en vez de un
//    anuncio real, así que no rompe nada mientras Marcelo no tenga la cuenta
//    aprobada.
// 2) Los "slot" de acá abajo son el ID de cada unidad de anuncio individual
//    (Google AdSense → Anuncios → Por unidad de anuncio → Anuncio display).
//    Cuando Marcelo cree cada unidad, reemplaza el valor correspondiente acá
//    y listo — no hace falta tocar ningún otro archivo.
export const AD_SLOTS = {
  home: "0000000001",
  catalogoListado: "0000000002",
  catalogoFicha: "0000000003",
  clasificadosListado: "0000000004",
  clasificadosFicha: "0000000005",
  tiendasListado: "0000000006",
  tiendaFicha: "0000000007",
  seccionesEspeciales: "0000000008",
  seccionEspecialFicha: "0000000009",
};
