// Prefijo de la sección oculta de administración: no está linkeada desde
// ningún lugar del sitio (ni Header, ni Footer, ni sitemap) y queda excluida
// de robots.txt (ver src/app/robots.ts), además de estar protegida por login
// real tanto en el servidor (middleware) como en cada página.
//
// Para cambiarla: renombrar la carpeta src/app/panel-mu9f3k7x y actualizar
// este valor — es el único lugar donde está escrita.
export const ADMIN_PATH_PREFIX = "/panel-mu9f3k7x";
export const ADMIN_LOGIN_PATH = `${ADMIN_PATH_PREFIX}/login`;

// Página de un solo uso para crear la primera cuenta de administrador (ver
// /api/bootstrap-admin). Vive FUERA de ADMIN_PATH_PREFIX a propósito: el
// middleware exige sesión de admin para todo lo que está bajo ese prefijo, y
// todavía no existe ningún admin cuando se usa esta página. Por eso conviene
// borrar la carpeta src/app/configurar-primer-admin una vez usada.
export const SETUP_PATH = "/configurar-primer-admin";
