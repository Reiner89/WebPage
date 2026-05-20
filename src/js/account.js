import { getCurrentUser, getUsers, saveUsers, refreshSessionFromUser } from './auth.js';

function getUserId() {
  return getCurrentUser()?.id || 'guest';
}

function storageKey(type) {
  return `wills_${type}_${getUserId()}`;
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getProfile() {
  const session = getCurrentUser();
  if (!session) return null;
  return getUsers().find(user => user.id === session.id) || session;
}

export function updateProfile(data) {
  const session = getCurrentUser();
  if (!session) return { ok: false, message: 'Debes iniciar sesión.' };

  const users = getUsers();
  const index = users.findIndex(user => user.id === session.id);
  if (index === -1) return { ok: false, message: 'No se encontró el usuario.' };

  const normalizedUsername = data.username.trim().toLowerCase();
  const usernameExists = users.some(user => user.id !== session.id && user.username.toLowerCase() === normalizedUsername);

  if (usernameExists) {
    return { ok: false, message: 'Ese nombre de usuario ya está en uso.' };
  }

  users[index] = {
    ...users[index],
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    username: normalizedUsername,
    phone: data.phone.trim(),
    password: data.password,
    updatedAt: new Date().toISOString(),
  };

  saveUsers(users);
  refreshSessionFromUser(users[index]);
  return { ok: true, message: 'Perfil actualizado correctamente.' };
}

export function getAddresses() {
  return readJson(storageKey('addresses'), []);
}

export function saveAddress(data) {
  const addresses = getAddresses();
  const id = data.id || String(Date.now());
  const nextAddress = {
    id,
    label: data.label.trim() || 'Dirección',
    fullName: data.fullName.trim(),
    address: data.address.trim(),
    district: data.district.trim(),
    city: data.city.trim(),
    phone: data.phone.trim(),
    reference: data.reference.trim(),
    isDefault: data.isDefault || addresses.length === 0,
    updatedAt: new Date().toISOString(),
  };

  let next = addresses.filter(item => item.id !== id);
  if (nextAddress.isDefault) next = next.map(item => ({ ...item, isDefault: false }));
  next.push(nextAddress);
  writeJson(storageKey('addresses'), next);
  return nextAddress;
}

export function deleteAddress(id) {
  const addresses = getAddresses().filter(item => item.id !== id);
  if (addresses.length && !addresses.some(item => item.isDefault)) addresses[0].isDefault = true;
  writeJson(storageKey('addresses'), addresses);
}

export function getPaymentMethods() {
  return readJson(storageKey('payment_methods'), []);
}

export function savePaymentMethod(data) {
  const methods = getPaymentMethods();
  const id = data.id || String(Date.now());
  const cleanNumber = String(data.cardNumber || '').replace(/\D/g, '');
  const brand = data.brand || detectCardBrand(cleanNumber);
  const nextMethod = {
    id,
    brand,
    last4: cleanNumber.slice(-4),
    expiry: data.expiry.trim(),
    cardName: data.cardName.trim(),
    isDefault: data.isDefault || methods.length === 0,
    updatedAt: new Date().toISOString(),
  };

  let next = methods.filter(item => item.id !== id);
  if (nextMethod.isDefault) next = next.map(item => ({ ...item, isDefault: false }));
  next.push(nextMethod);
  writeJson(storageKey('payment_methods'), next);
  return nextMethod;
}

export function deletePaymentMethod(id) {
  const methods = getPaymentMethods().filter(item => item.id !== id);
  if (methods.length && !methods.some(item => item.isDefault)) methods[0].isDefault = true;
  writeJson(storageKey('payment_methods'), methods);
}

export function getOrders() {
  return readJson(storageKey('orders'), []);
}

export function saveOrder(order) {
  const orders = getOrders();
  const nextOrder = {
    id: order.id || `#${Math.floor(100000 + Math.random() * 900000)}`,
    date: order.date || new Date().toLocaleDateString('es-PE'),
    total: order.total,
    status: order.status || 'Completado',
    items: order.items || [],
    createdAt: new Date().toISOString(),
  };
  writeJson(storageKey('orders'), [nextOrder, ...orders]);
  return nextOrder;
}

function detectCardBrand(number) {
  if (number.startsWith('4')) return 'VISA';
  if (number.startsWith('5')) return 'Mastercard';
  return 'Tarjeta';
}
