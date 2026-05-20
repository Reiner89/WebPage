import { deleteAddress, getAddresses, getProfile, saveAddress } from '../account.js';
import { toast } from '../helpers.js';
import { accountPage, emptyState, escapeHtml, input } from './accountLayout.js';

export function renderMyAddresses(app) {
  const addresses = getAddresses();
  const editingId = new URLSearchParams((location.hash.split('?')[1] || '')).get('edit');
  const editing = addresses.find(item => item.id === editingId);
  const showForm = location.hash.includes('new=1') || Boolean(editing);
  const user = getProfile();

  app.innerHTML = accountPage('Mis direcciones', '#/my-addresses', `
    <div class="space-y-6">
      ${addresses.length ? `
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-5">
          ${addresses.map(addressCard).join('')}
        </div>
      ` : emptyState('Aún no tienes direcciones guardadas.')}

      ${showForm ? addressForm(editing, user) : `
        <a href="#/my-addresses?new=1" class="inline-block rounded-sm bg-brown-600 px-7 py-3 font-semibold text-white transition hover:bg-brown-700">Nueva Dirección</a>
      `}
    </div>
  `);

  document.querySelectorAll('[data-delete-address]').forEach(button => {
    button.addEventListener('click', () => {
      deleteAddress(button.dataset.deleteAddress);
      toast('Dirección eliminada.');
      location.hash = '#/my-addresses';
    });
  });

  const form = document.getElementById('addressForm');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      saveAddress({
        id: formData.get('id'),
        label: formData.get('label'),
        fullName: formData.get('fullName'),
        address: formData.get('address'),
        district: formData.get('district'),
        city: formData.get('city'),
        phone: formData.get('phone'),
        reference: formData.get('reference'),
        isDefault: formData.get('isDefault') === 'on',
      });
      toast('Dirección guardada.');
      location.hash = '#/my-addresses';
    });
  }
}

function addressCard(item) {
  return `
    <article class="border border-brown-200 p-6">
      <div class="flex items-start justify-between gap-4 mb-4">
        <h2 class="font-serif text-xl font-bold text-brown-700">${escapeHtml(item.label)}${item.isDefault ? ' por defecto' : ''}</h2>
        ${item.isDefault ? '<span class="text-xs uppercase tracking-[0.18em] text-brown-400">Default</span>' : ''}
      </div>
      <div class="space-y-1 text-brown-600 leading-relaxed">
        <p class="font-semibold text-brown-800">${escapeHtml(item.fullName)}</p>
        <p>${escapeHtml(item.address)}</p>
        <p>${escapeHtml(item.district)}, ${escapeHtml(item.city)}</p>
        <p>T: ${escapeHtml(item.phone)}</p>
        ${item.reference ? `<p class="text-sm text-brown-400">Ref: ${escapeHtml(item.reference)}</p>` : ''}
      </div>
      <div class="mt-6 flex gap-3">
        <a href="#/my-addresses?edit=${item.id}" class="rounded-sm bg-brown-600 px-6 py-2 text-sm font-semibold text-white hover:bg-brown-700">Editar</a>
        <button data-delete-address="${item.id}" class="rounded-sm border border-brown-200 px-6 py-2 text-sm font-semibold hover:bg-brown-50">Eliminar</button>
      </div>
    </article>
  `;
}

function addressForm(item, user) {
  return `
    <form id="addressForm" class="max-w-2xl border border-brown-200 p-6 space-y-5">
      <input type="hidden" name="id" value="${item?.id || ''}" />
      <h2 class="font-serif text-2xl font-bold text-brown-700">${item ? 'Editar dirección' : 'Nueva dirección'}</h2>
      ${input('label', 'Nombre de la dirección', item?.label || 'Dirección de facturación', 'text', 'required')}
      ${input('fullName', 'Nombre completo', item?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim(), 'text', 'required')}
      ${input('address', 'Dirección', item?.address || '', 'text', 'required')}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        ${input('district', 'Distrito', item?.district || '', 'text', 'required')}
        ${input('city', 'Ciudad', item?.city || 'Lima, Perú', 'text', 'required')}
      </div>
      ${input('phone', 'Teléfono', item?.phone || user?.phone || '', 'tel', 'required')}
      ${input('reference', 'Referencia', item?.reference || '', 'text')}
      <label class="flex items-center gap-3 text-sm text-brown-600">
        <input type="checkbox" name="isDefault" ${item?.isDefault ? 'checked' : ''} class="h-4 w-4" />
        Usar como dirección por defecto
      </label>
      <div class="flex flex-wrap gap-3">
        <button class="rounded-sm bg-brown-600 px-7 py-3 font-semibold text-white hover:bg-brown-700">Guardar dirección</button>
        <a href="#/my-addresses" class="rounded-sm border border-brown-200 px-7 py-3 font-semibold hover:bg-brown-50">Cancelar</a>
      </div>
    </form>
  `;
}
