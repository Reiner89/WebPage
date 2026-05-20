import { getSafeReturnHash, loginUser } from "../auth.js";
import { toast } from "../helpers.js";

export function renderLogin(app) {
  app.innerHTML = `
    <section class="page min-h-[calc(100vh-4rem)] bg-white px-6 py-16 md:py-20">
      <div class="mx-auto w-full max-w-md rounded-sm border border-brown-200 bg-white px-8 py-10 shadow-sm">
        <div class="text-center mb-9">
          <h1 class="font-serif text-4xl font-bold text-brown-700">¡Bienvenido!</h1>
        </div>

        <form id="loginForm" class="space-y-5">
          <div>
            <label class="sr-only" for="loginUsername">Usuario</label>
            <input
              id="loginUsername"
              name="username"
              type="text"
              required
              autocomplete="username"
              class="w-full rounded-sm border border-brown-200 bg-white px-5 py-4 outline-none transition focus:border-brown-500"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div>
            <label class="sr-only" for="loginPassword">Contraseña</label>
            <input
              id="loginPassword"
              name="password"
              type="password"
              required
              autocomplete="current-password"
              class="w-full rounded-sm border border-brown-200 bg-white px-5 py-4 outline-none transition focus:border-brown-500"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <div class="flex items-center justify-end text-sm">
            <a href="#/help" class="text-brown-500 hover:text-brown-700">¿Olvidaste tu contraseña?</a>
          </div>

          <button class="w-full rounded-sm bg-brown-600 px-5 py-4 font-semibold text-white transition hover:bg-brown-700">
            Iniciar Sesión
          </button>
        </form>

        <p class="mt-7 text-center text-brown-500">
          ¿No tienes una cuenta?
          <a href="#/register" class="font-semibold text-brown-600 hover:text-brown-700">Regístrate</a>
        </p>
      </div>
    </section>
  `;

  document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const result = loginUser(form.get("username"), form.get("password"));

    if (!result.ok) {
      toast(result.message);
      return;
    }

    toast(`Bienvenido, ${result.user.firstName || result.user.username}`);
    location.hash = getSafeReturnHash();
  });
}
