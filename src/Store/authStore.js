const TOKEN_KEY = "token";
const USER_KEY = "usuario";

// Guarda token y usuario
export function saveAuth(token, usuario) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(usuario));
}

// Obtiene el token
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Obtiene el usuario completo
export function getUsuario() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

// Elimina token y usuario (para cerrar sesión)
export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// Verifica si existe token
export function isAuthenticated() {
  return !!localStorage.getItem(TOKEN_KEY);
}