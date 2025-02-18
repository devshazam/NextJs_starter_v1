/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/auth/new-verification"
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password"
];

/**
 * Префикс путей, которые используются для API аутентификации
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Путь по умолчанию для перехода после входа
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";