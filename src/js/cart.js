import { products } from './data.js';
import { toast } from './helpers.js';

export function getCart() {
  return JSON.parse(localStorage.getItem('wills_cart')) || [];
}

export function setCart(cart) {
  localStorage.setItem('wills_cart', JSON.stringify(cart));
  updateCartCount();
}

export function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  const total = getCart().reduce((sum, item) => sum + item.qty, 0);
  if (cartCount) cartCount.textContent = total;
}

export function addToCart(id, qty = 1) {
  const product = products.find(item => item.id === Number(id));
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) existing.qty += qty;
  else cart.push({ id: product.id, qty });

  setCart(cart);
  toast(`${product.name} agregado al carrito`);
}

export function removeFromCart(id) {
  const cart = getCart().filter(item => item.id !== Number(id));
  setCart(cart);
}

export function updateQty(id, qty) {
  const cart = getCart();
  const item = cart.find(product => product.id === Number(id));
  if (!item) return;
  item.qty = Math.max(1, qty);
  setCart(cart);
}

export function clearCart() {
  localStorage.removeItem('wills_cart');
  updateCartCount();
}
