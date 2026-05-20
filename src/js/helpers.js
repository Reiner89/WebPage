export function money(value) {
  return `S/ ${Number(value).toFixed(2)}`;
}

export function toast(message) {
  const el = document.createElement('div');
  el.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-brown-900 text-white px-5 py-3 shadow-lg text-sm';
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}

export function getQueryParams() {
  const hash = location.hash || '#/';
  const queryString = hash.includes('?') ? hash.split('?')[1] : '';
  return new URLSearchParams(queryString);
}

export function productImage(type = 'wallet') {
  const imageClass = type === 'briefcase' ? 'briefcase-img' : type === 'wallet' ? 'wallet-img' : 'product-img';
  return `<div class="${imageClass} w-full aspect-[4/3] bg-brown-100"></div>`;
}
