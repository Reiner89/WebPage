import { getProfile, updateProfile } from '../account.js';
import { toast } from '../helpers.js';
import { accountPage, input } from './accountLayout.js';

export function renderProfileSettings(app) {
  const user = getProfile();

  app.innerHTML = accountPage('Configuración de perfil', '#/profile-settings', `
    <form id="profileForm" class="max-w-2xl space-y-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        ${input('firstName', 'Nombres', user?.firstName || '', 'text', 'required')}
        ${input('lastName', 'Apellidos', user?.lastName || '', 'text', 'required')}
      </div>
      ${input('username', 'Correo electrónico / Usuario', user?.username || '', 'text', 'required autocomplete="username"')}
      ${input('password', 'Password', user?.password || '', 'password', 'required autocomplete="current-password"')}
      ${input('phone', 'Número telefónico', user?.phone || '', 'tel', 'required')}
      <button class="rounded-sm bg-brown-600 px-8 py-3 font-semibold text-white transition hover:bg-brown-700">Guardar</button>
    </form>
  `);

  document.getElementById('profileForm').addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.target);
    const result = updateProfile({
      firstName: form.get('firstName'),
      lastName: form.get('lastName'),
      username: form.get('username'),
      password: form.get('password'),
      phone: form.get('phone'),
    });
    toast(result.message);
  });
}
