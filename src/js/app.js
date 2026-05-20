import { render } from "./router.js";
import { updateCartCount } from "./cart.js";
import { toast } from "./helpers.js";
import { getCurrentUser, isLoggedIn, logoutUser } from "./auth.js";

const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");
const searchModal = document.getElementById("searchModal");
const searchInput = document.getElementById("searchInput");
const accountDrawerLinks = document.getElementById("accountDrawerLinks");

function closeDrawer() {
  drawer.classList.remove("drawer-open");
  overlay.classList.add("hidden");
}

function renderAccountDrawerLinks() {
  if (!accountDrawerLinks) return;

  if (!isLoggedIn()) {
    accountDrawerLinks.innerHTML = `
      <div class="">
        <p class="text-xs uppercase tracking-[0.2em] text-brown-400 mb-3">Cuenta</p>
        <a class="drawer-link block py-3 border-b border-brown-100 hover:text-brown-500" href="#/login">Iniciar sesión</a>
        <a class="drawer-link block py-3 border-b border-brown-100 hover:text-brown-500" href="#/register">Crear usuario</a>
      </div>
    `;
    return;
  }

  const user = getCurrentUser();
  accountDrawerLinks.innerHTML = `
    <div class="">
      <p class="text-xs uppercase tracking-[0.2em] text-brown-400 mb-1">Mi cuenta</p>
      <p class="text-sm text-brown-600 mb-3">${user?.firstName || user?.username || "Usuario"}</p>
      <a class="drawer-link block py-3 border-b border-brown-100 hover:text-brown-500" href="#/profile-settings">Configuración de Perfil</a>
      <a class="drawer-link block py-3 border-b border-brown-100 hover:text-brown-500" href="#/my-addresses">Mis direcciones</a>
      <a class="drawer-link block py-3 border-b border-brown-100 hover:text-brown-500" href="#/payment-methods">Métodos de Pago</a>
      <a class="drawer-link block py-3 border-b border-brown-100 hover:text-brown-500" href="#/order-history">Historial de pedidos</a>
      <button id="logoutBtn" class="w-full text-left block py-3 text-brown-500 hover:text-brown-700">Cerrar sesión</button>
    </div>
  `;

  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    closeDrawer();
    logoutUser();
  });
}

document.getElementById("menuBtn").addEventListener("click", () => {
  renderAccountDrawerLinks();
  drawer.classList.add("drawer-open");
  overlay.classList.remove("hidden");
});

document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);

drawer.addEventListener("click", (event) => {
  const link = event.target.closest(".drawer-link");
  if (link) closeDrawer();
});

document.getElementById("searchBtn").addEventListener("click", () => {
  if (!isLoggedIn()) {
    location.hash = `#/login?returnTo=${encodeURIComponent("#/shop")}`;
    return;
  }

  searchModal.classList.remove("hidden");
  setTimeout(() => searchInput.focus(), 100);
});

document.getElementById("closeSearch").addEventListener("click", () => {
  searchModal.classList.add("hidden");
});

document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const value = searchInput.value.trim();

  if (value) {
    searchModal.classList.add("hidden");
    location.hash = `#/shop?q=${encodeURIComponent(value)}`;
  }
});

document.getElementById("userBtn").addEventListener("click", () => {
  if (isLoggedIn()) {
    renderAccountDrawerLinks();
    drawer.classList.add("drawer-open");
    overlay.classList.remove("hidden");
    return;
  }

  location.hash = "#/login";
});

document
  .getElementById("newsletterForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    event.target.reset();
    toast("Suscripción simulada");
  });

window.addEventListener("hashchange", render);
window.addEventListener("authchange", renderAccountDrawerLinks);

renderAccountDrawerLinks();
updateCartCount();
render();
