import { getOrders } from '../account.js';
import { money, toast } from '../helpers.js';
import { accountPage, emptyState, escapeHtml } from './accountLayout.js';

export function renderOrderHistory(app) {
  const orders = getOrders();

  app.innerHTML = accountPage('Historial de pedidos', '#/order-history', `
    ${orders.length ? `
      <div class="overflow-x-auto border border-brown-200">
        <table class="w-full min-w-[760px] text-left text-sm">
          <thead class="bg-brown-100/80 text-brown-800">
            <tr>
              <th class="px-4 py-4 font-semibold">Nro Orden</th>
              <th class="px-4 py-4 font-semibold">Fecha</th>
              <th class="px-4 py-4 font-semibold">Monto Total</th>
              <th class="px-4 py-4 font-semibold">Estado</th>
              <th class="px-4 py-4 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${orders.map((order, index) => `
              <tr class="${index % 2 === 0 ? 'bg-brown-50/70' : 'bg-white'} border-t border-brown-100">
                <td class="px-4 py-4 font-semibold text-brown-800">${escapeHtml(order.id)}</td>
                <td class="px-4 py-4">${escapeHtml(order.date)}</td>
                <td class="px-4 py-4">${money(order.total)}</td>
                <td class="px-4 py-4">${escapeHtml(order.status)}</td>
                <td class="px-4 py-4 text-center">
                  <button data-download-order="${escapeHtml(order.id)}" class="inline-grid h-9 w-9 place-items-center rounded-full hover:bg-brown-100" title="Descargar comprobante">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14" />
                    </svg>
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : emptyState('Aún no tienes pedidos registrados. Cuando completes una compra, aparecerá aquí.')}
  `);

  document.querySelectorAll('[data-download-order]').forEach(button => {
    button.addEventListener('click', () => {
      toast(`Descarga simulada del pedido ${button.dataset.downloadOrder}`);
    });
  });
}
