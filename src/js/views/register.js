import { registerUser } from "../auth.js";
import { toast } from "../helpers.js";

export function renderRegister(app) {
  app.innerHTML = `
    <section class="page bg-white px-6 py-14 md:py-16">
      <div class="mx-auto w-full max-w-3xl rounded-sm border border-brown-200 bg-white p-7 md:p-10 shadow-sm">
        <div class="mb-8 text-center">
          <h1 class="font-serif text-4xl font-bold text-brown-700">Crear Usuario</h1>
        </div>

        <form id="registerForm" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block mb-2 font-medium" for="lastName">Apellidos</label>
              <input id="lastName" name="lastName" type="text" required class="w-full rounded-sm border border-brown-200 px-4 py-3 outline-none focus:border-brown-500" placeholder="Apellidos" />
            </div>
            <div>
              <label class="block mb-2 font-medium" for="firstName">Nombres</label>
              <input id="firstName" name="firstName" type="text" required class="w-full rounded-sm border border-brown-200 px-4 py-3 outline-none focus:border-brown-500" placeholder="Nombres" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
            <div>
              <label class="block mb-2 font-medium" for="gender">Sexo</label>
              <select id="gender" name="gender" required class="w-full rounded-sm border border-brown-200 px-4 py-3 outline-none focus:border-brown-500">
                <option value="">Selecciona</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div>
              <label class="block mb-2 font-medium" for="birthDate">Fecha de Nac.</label>
              <input id="birthDate" name="birthDate" type="date" required class="w-full rounded-sm border border-brown-200 px-4 py-3 outline-none focus:border-brown-500" />
            </div>
          </div>

          <div class="grid grid-cols-[110px_1fr] gap-5">
            <div>
              <label class="block mb-2 font-medium" for="phonePrefix">Código</label>
              <select id="phonePrefix" name="phonePrefix" class="w-full rounded-sm border border-brown-200 px-3 py-3 outline-none focus:border-brown-500">
                <option value="+51">+51</option>
                <option value="+57">+57</option>
                <option value="+56">+56</option>
                <option value="+52">+52</option>
              </select>
            </div>
            <div>
              <label class="block mb-2 font-medium" for="phone">Teléfono</label>
              <input id="phone" name="phone" type="tel" required class="w-full rounded-sm border border-brown-200 px-4 py-3 outline-none focus:border-brown-500" placeholder="Teléfono" />
            </div>
          </div>

          <div>
            <label class="block mb-2 font-medium" for="username">Nombre de Usuario</label>
            <input id="username" name="username" type="text" required autocomplete="username" class="w-full rounded-sm border border-brown-200 px-4 py-3 outline-none focus:border-brown-500" placeholder="Nombre de Usuario" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block mb-2 font-medium" for="password">Contraseña</label>
              <input id="password" name="password" type="password" required minlength="6" autocomplete="new-password" class="w-full rounded-sm border border-brown-200 px-4 py-3 outline-none focus:border-brown-500" placeholder="Contraseña" />
            </div>
            <div>
              <label class="block mb-2 font-medium" for="confirmPassword">Confirmar Contraseña</label>
              <input id="confirmPassword" name="confirmPassword" type="password" required minlength="6" autocomplete="new-password" class="w-full rounded-sm border border-brown-200 px-4 py-3 outline-none focus:border-brown-500" placeholder="Confirmar Contraseña" />
            </div>
          </div>

          <button class="w-full rounded-sm bg-brown-600 px-5 py-4 font-semibold text-white transition hover:bg-brown-700">
            Registrarse
          </button>
        </form>

        <p class="mt-7 text-center text-brown-500">
          ¿Ya tienes una cuenta?
          <a href="#/login" class="font-semibold text-brown-600 hover:text-brown-700">Inicia sesión</a>
        </p>
      </div>
    </section>
  `;

  document
    .getElementById("registerForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(event.target);
      const password = form.get("password");
      const confirmPassword = form.get("confirmPassword");

      if (password !== confirmPassword) {
        toast("Las contraseñas no coinciden.");
        return;
      }

      const result = registerUser({
        lastName: form.get("lastName"),
        firstName: form.get("firstName"),
        gender: form.get("gender"),
        birthDate: form.get("birthDate"),
        phonePrefix: form.get("phonePrefix"),
        phone: form.get("phone"),
        username: form.get("username"),
        password,
      });

      toast(result.message);
      if (result.ok) location.hash = "#/login";
    });
}
