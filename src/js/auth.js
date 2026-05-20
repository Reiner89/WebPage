import { toast } from './helpers.js';

const USERS_KEY = 'wills_users';
const SESSION_KEY = 'wills_session';

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch (error) {
    return fallback;
  }
}

export function getUsers() {
  return readJson(USERS_KEY, []);
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser() {
  return readJson(SESSION_KEY, null);
}

export function isLoggedIn() {
  return Boolean(getCurrentUser());
}

export function registerUser(data) {
  const users = getUsers();
  const username = data.username.trim().toLowerCase();
  const phone = `${data.phonePrefix} ${data.phone}`.trim();

  if (users.some(user => user.username.toLowerCase() === username)) {
    return { ok: false, message: 'Ese nombre de usuario ya existe.' };
  }

  users.push({
    id: Date.now(),
    lastName: data.lastName.trim(),
    firstName: data.firstName.trim(),
    gender: data.gender,
    birthDate: data.birthDate,
    phone,
    username,
    password: data.password,
    createdAt: new Date().toISOString(),
  });

  saveUsers(users);
  return { ok: true, message: 'Usuario creado correctamente. Ahora inicia sesión.' };
}

export function refreshSessionFromUser(user) {
  const session = {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event('authchange'));
  return session;
}

export function loginUser(username, password) {
  const normalizedUsername = username.trim().toLowerCase();
  const user = getUsers().find(item => item.username.toLowerCase() === normalizedUsername && item.password === password);

  if (!user) {
    return { ok: false, message: 'Usuario o contraseña incorrectos.' };
  }

  const session = {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event('authchange'));
  return { ok: true, user: session };
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event('authchange'));
  toast('Sesión cerrada correctamente');
  location.hash = '#/login';
}

export function getSafeReturnHash() {
  const params = new URLSearchParams((location.hash.split('?')[1] || '').trim());
  const raw = params.get('returnTo');

  if (!raw) return '#/shop';

  try {
    const decoded = decodeURIComponent(raw);
    if (decoded.startsWith('#/') && !decoded.startsWith('#/login') && !decoded.startsWith('#/register')) {
      return decoded;
    }
  } catch (error) {
    return '#/shop';
  }

  return '#/shop';
}
