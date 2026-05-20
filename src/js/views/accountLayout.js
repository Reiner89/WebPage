export function accountPage(title, activeRoute, content) {
  const links = [
    ['#/profile-settings', 'Configuración de perfil'],
    ['#/my-addresses', 'Mis direcciones'],
    ['#/payment-methods', 'Métodos de pago'],
    ['#/order-history', 'Historial de pedidos'],
  ];

  return `
    <section class="page max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-12">
      <div class="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
        <aside class="border-b lg:border-b-0 lg:border-r border-brown-100 pb-5 lg:pb-0 lg:pr-8">
          <nav class="flex lg:block gap-3 overflow-x-auto text-sm">
            ${links.map(([href, label]) => `
              <a href="${href}" class="block whitespace-nowrap py-2 ${activeRoute === href ? 'font-bold text-brown-700' : 'text-brown-500 hover:text-brown-700'}">${label}</a>
            `).join('')}
          </nav>
        </aside>

        <section>
          <h1 class="font-serif text-3xl md:text-4xl font-bold text-brown-700 mb-8">${title}</h1>
          ${content}
        </section>
      </div>
    </section>
  `;
}

export function input(name, label, value = '', type = 'text', attrs = '') {
  return `
    <label class="block">
      <span class="block mb-2 text-sm font-medium text-brown-700">${label}</span>
      <input name="${name}" type="${type}" value="${escapeAttr(value)}" ${attrs}
        class="w-full rounded-sm border border-brown-200 bg-white px-4 py-3 outline-none transition focus:border-brown-500" />
    </label>
  `;
}

export function emptyState(message) {
  return `
    <div class="border border-dashed border-brown-200 bg-brown-50/60 p-8 text-center text-brown-500">
      ${message}
    </div>
  `;
}

export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function escapeAttr(value = '') {
  return escapeHtml(value);
}
