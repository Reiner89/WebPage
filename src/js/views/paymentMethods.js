import { deletePaymentMethod, getPaymentMethods, savePaymentMethod } from '../account.js';
import { toast } from '../helpers.js';
import { accountPage, emptyState, escapeHtml, input } from './accountLayout.js';

export function renderPaymentMethods(app) {
  const methods = getPaymentMethods();
  const editingId = new URLSearchParams((location.hash.split('?')[1] || '')).get('edit');
  const editing = methods.find(item => item.id === editingId);
  const showForm = location.hash.includes('new=1') || Boolean(editing);

  app.innerHTML = accountPage('Métodos de pago', '#/payment-methods', `
    <div class="space-y-6">
      ${methods.length ? `
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          ${methods.map(paymentCard).join('')}
        </div>
      ` : emptyState('Aún no tienes métodos de pago guardados.')}

      ${showForm ? paymentForm(editing) : `
        <a href="#/payment-methods?new=1" class="inline-block rounded-sm bg-brown-600 px-7 py-3 font-semibold text-white transition hover:bg-brown-700">Nuevo Método</a>
      `}
    </div>
  `);

  document.querySelectorAll('[data-delete-payment]').forEach(button => {
    button.addEventListener('click', () => {
      deletePaymentMethod(button.dataset.deletePayment);
      toast('Método de pago eliminado.');
      location.hash = '#/payment-methods';
    });
  });

  const form = document.getElementById('paymentForm');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const cardNumber = formData.get('cardNumber');
      const cleanNumber = String(cardNumber).replace(/\D/g, '');

      if (!formData.get('id') && cleanNumber.length < 13) {
        toast('Ingresa un número de tarjeta válido.');
        return;
      }

      savePaymentMethod({
        id: formData.get('id'),
        brand: formData.get('brand'),
        cardNumber: cleanNumber || `000000000000${formData.get('last4') || '0000'}`,
        expiry: formData.get('expiry'),
        cardName: formData.get('cardName'),
        isDefault: formData.get('isDefault') === 'on',
      });
      toast('Método de pago guardado.');
      location.hash = '#/payment-methods';
    });
  }
}

function paymentCard(item) {
  return `
    <article class="border border-brown-200 p-6">
      <div class="flex items-start justify-between gap-4 mb-6">
        <h2 class="font-serif text-2xl font-bold text-brown-700">${escapeHtml(item.brand)}</h2>
        ${item.isDefault ? '<span class="text-xs uppercase tracking-[0.18em] text-brown-400">Default</span>' : ''}
      </div>
      <p class="font-semibold tracking-widest text-brown-700 mb-6">**** **** **** ${escapeHtml(item.last4)}</p>
      <div class="flex justify-between text-brown-600 mb-6">
        <span>Expiración</span>
        <strong class="text-brown-800">${escapeHtml(item.expiry)}</strong>
      </div>
      <div class="flex gap-3">
        <a href="#/payment-methods?edit=${item.id}" class="flex-1 rounded-sm bg-brown-600 px-5 py-2 text-center text-sm font-semibold text-white hover:bg-brown-700">Editar</a>
        <button data-delete-payment="${item.id}" class="flex-1 rounded-sm border border-brown-200 px-5 py-2 text-sm font-semibold hover:bg-brown-50">Eliminar</button>
      </div>
    </article>
  `;
}

function paymentForm(item) {
  return `
    <form id="paymentForm" class="max-w-2xl border border-brown-200 p-6 space-y-5">
      <input type="hidden" name="id" value="${item?.id || ''}" />
      <input type="hidden" name="last4" value="${item?.last4 || ''}" />
      <h2 class="font-serif text-2xl font-bold text-brown-700">${item ? 'Editar método' : 'Nuevo método'}</h2>
      <label class="block">
        <span class="block mb-2 text-sm font-medium text-brown-700">Tipo de tarjeta</span>
        <select name="brand" class="w-full rounded-sm border border-brown-200 bg-white px-4 py-3 outline-none focus:border-brown-500">
          <option ${item?.brand === 'VISA' ? 'selected' : ''}>VISA</option>
          <option ${item?.brand === 'Mastercard' ? 'selected' : ''}>Mastercard</option>
          <option ${item?.brand === 'Tarjeta' ? 'selected' : ''}>Tarjeta</option>
        </select>
      </label>
      ${input('cardNumber', item ? `Número de tarjeta actual: **** ${item.last4}` : 'Número de tarjeta', '', 'text', item ? 'placeholder="Déjalo vacío para conservarla"' : 'required placeholder="0000 0000 0000 0000"')}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        ${input('expiry', 'Expiración', item?.expiry || '', 'text', 'required placeholder="MM/AA"')}
        ${input('cardName', 'Nombre en la tarjeta', item?.cardName || '', 'text', 'required')}
      </div>
      <label class="flex items-center gap-3 text-sm text-brown-600">
        <input type="checkbox" name="isDefault" ${item?.isDefault ? 'checked' : ''} class="h-4 w-4" />
        Usar como método por defecto
      </label>
      <div class="flex flex-wrap gap-3">
        <button class="rounded-sm bg-brown-600 px-7 py-3 font-semibold text-white hover:bg-brown-700">Guardar método</button>
        <a href="#/payment-methods" class="rounded-sm border border-brown-200 px-7 py-3 font-semibold hover:bg-brown-50">Cancelar</a>
      </div>
    </form>
  `;
}
