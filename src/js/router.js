import { renderHome } from "./views/home.js";
import { renderShop } from "./views/shop.js";
import { renderProduct } from "./views/product.js";
import { renderCart } from "./views/cartView.js";
import { renderCheckout } from "./views/checkout.js";
import { renderAbout } from "./views/about.js";
import { renderHelp } from "./views/help.js";
import { renderLogin } from "./views/login.js";
import { renderRegister } from "./views/register.js";
import { renderProfileSettings } from "./views/profileSettings.js";
import { renderMyAddresses } from "./views/myAddresses.js";
import { renderPaymentMethods } from "./views/paymentMethods.js";
import { renderOrderHistory } from "./views/orderHistory.js";
import { isLoggedIn } from "./auth.js";
import { addToCart } from "./cart.js";

const publicRoutes = ["#/about", "#/help", "#/login", "#/register"];

function isHomeRoute(hash) {
  return hash === "#/" || hash === "" || hash.startsWith("#/?");
}

function isPublicRoute(hash) {
  return (
    isHomeRoute(hash) || publicRoutes.some((route) => hash.startsWith(route))
  );
}

function redirectToLogin(hash) {
  const returnTo = encodeURIComponent(hash || "#/");
  location.hash = `#/login?returnTo=${returnTo}`;
}

export function render() {
  const app = document.getElementById("app");
  const hash = location.hash || "#/";

  window.scrollTo(0, 0);

  if (!isLoggedIn() && !isPublicRoute(hash)) {
    redirectToLogin(hash);
    return;
  }

  if (
    isLoggedIn() &&
    (hash.startsWith("#/login") || hash.startsWith("#/register"))
  ) {
    location.hash = "#/shop";
    return;
  }

  if (hash.startsWith("#/login")) renderLogin(app);
  else if (hash.startsWith("#/register")) renderRegister(app);
  else if (hash.startsWith("#/product/")) renderProduct(app);
  else if (hash.startsWith("#/shop")) renderShop(app);
  else if (hash.startsWith("#/cart")) renderCart(app);
  else if (hash.startsWith("#/checkout")) renderCheckout(app);
  else if (hash.startsWith("#/profile-settings")) renderProfileSettings(app);
  else if (hash.startsWith("#/my-addresses")) renderMyAddresses(app);
  else if (hash.startsWith("#/payment-methods")) renderPaymentMethods(app);
  else if (hash.startsWith("#/order-history")) renderOrderHistory(app);
  else if (hash.startsWith("#/about")) renderAbout(app);
  else if (hash.startsWith("#/help")) renderHelp(app);
  else renderHome(app);

  bindGlobalProductButtons();
}

function bindGlobalProductButtons() {
  document.querySelectorAll("[data-add-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!isLoggedIn()) {
        redirectToLogin(location.hash || "#/shop");
        return;
      }

      addToCart(button.dataset.addCart, 1);
    });
  });
}
