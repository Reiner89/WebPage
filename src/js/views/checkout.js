import { products } from "../data.js";
import { money, toast } from "../helpers.js";
import { getCart, clearCart } from "../cart.js";
import { getAddresses, getPaymentMethods, getProfile, saveAddress, saveOrder, savePaymentMethod } from "../account.js";

export function renderCheckout(app) {
  const cart = getCart();
  const profile = getProfile();
  const defaultAddress = getAddresses().find(item => item.isDefault) || getAddresses()[0];
  const defaultPayment = getPaymentMethods().find(item => item.isDefault) || getPaymentMethods()[0];
  const rows = cart
    .map((item) => {
      const product = products.find((product) => product.id === item.id);
      return { ...item, product };
    })
    .filter((item) => item.product);

  const subtotal = rows.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0,
  );
  const shipping = subtotal >= 200 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  app.innerHTML = `
    <section class="page max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-16">
      <div class="text-center mb-10">
        <h1 class="font-serif text-4xl md:text-5xl font-bold text-brown-700">Finalizar compra</h1>
      </div>

      ${
        rows.length
          ? `
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
          <form id="checkoutForm" class="space-y-10">
            <section>
              <div class="flex items-center gap-3 border-b border-brown-100 pb-3 mb-6">
                <span class="w-8 h-8 rounded-full bg-brown-600 text-white grid place-items-center font-bold">1</span>
                <h2 class="font-serif text-2xl md:text-3xl font-bold text-brown-700">Información de Envío</h2>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                ${inputField("firstName", "Nombres", profile?.firstName || "", "text", "on")}
                ${inputField("lastName", "Apellidos", profile?.lastName || "", "text", "on")}
                <div class="md:col-span-2">${inputField("address", "Dirección", defaultAddress?.address || "", "text", "on")}</div>
                ${inputField("department", "Departamento", defaultAddress?.city?.split(',')[0] || "Lima", "text", "on")}
                ${inputField("province", "Provincia", "Lima", "text", "on")}
                ${inputField("district", "Distrito", defaultAddress?.district || "", "text", "on")}
                ${inputField("postalCode", "Código Postal", "", "text", "on", false)}
                <div class="md:col-span-2">${inputField("reference", "Referencia", defaultAddress?.reference || "", "text", "on", false)}</div>
                <div class="md:col-span-2">${inputField("phone", "Teléfono", defaultAddress?.phone || profile?.phone || "", "tel", "on")}</div>
              </div>
            </section>

            <section>
              <div class="flex items-center gap-3 border-b border-brown-100 pb-3 mb-6">
                <span class="w-8 h-8 rounded-full bg-brown-600 text-white grid place-items-center font-bold">2</span>
                <h2 class="font-serif text-2xl md:text-3xl font-bold text-brown-700">Información de Pago</h2>
              </div>

              ${defaultPayment ? `
                <div class="mb-5 border border-brown-100 bg-brown-50/60 p-4 text-sm text-brown-600">
                  Método guardado por defecto: <strong>${defaultPayment.brand} **** ${defaultPayment.last4}</strong>.
                  Puedes ingresar otro método abajo si deseas reemplazarlo para esta compra.
                </div>
              ` : ''}

              <div class="border border-brown-100 p-6 md:p-7">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div class="md:col-span-2">${inputField("cardNumber", "Número de Tarjeta", "", "text", "off", !defaultPayment, defaultPayment ? `placeholder=\"Usar tarjeta guardada **** ${defaultPayment.last4}\"` : 'placeholder="0000 0000 0000 0000"')}</div>
                  ${inputField("expiry", "Venc. (MM/AA)", defaultPayment?.expiry || "", "text", "off")}
                  ${inputField("cvv", "CVV", "", "text", "off", false, 'placeholder="123"')}
                  <div class="md:col-span-2">${inputField("cardName", "Nombre en la Tarjeta", defaultPayment?.cardName || `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim(), "text", "off")}</div>
                </div>
              </div>
            </section>
          </form>

          <aside class="border border-brown-200 p-6 md:p-7 lg:sticky lg:top-24">
            <h2 class="font-serif text-2xl font-bold text-brown-700 mb-6">Resumen de Compra</h2>

            <div class="space-y-4 pb-6 border-b border-brown-100">
              ${rows
                .map(
                  (item) => `
                <div class="flex justify-between gap-4">
                  <span class="text-brown-700">${item.product.name} x${item.qty}</span>
                  <strong>${money(item.product.price * item.qty)}</strong>
                </div>
              `,
                )
                .join("")}
            </div>

            <div class="space-y-4 py-6 border-b border-brown-100 text-brown-500">
              <div class="flex justify-between"><span>Subtotal</span><span>${money(subtotal)}</span></div>
              <div class="flex justify-between"><span>Envío</span><span>${shipping === 0 ? "Gratis" : money(shipping)}</span></div>
            </div>

            <div class="flex justify-between items-center py-6 font-bold text-xl">
              <span>Total</span>
              <span>${money(total)}</span>
            </div>

            <button form="checkoutForm" class="w-full bg-brown-600 text-white py-4 font-semibold hover:bg-brown-700 transition">
              Confirmar Compra
            </button>
          </aside>
        </div>
      `
          : `
        <div class="max-w-2xl mx-auto bg-brown-50 p-10 text-center">
          <h2 class="font-serif text-3xl font-bold mb-3">No hay productos para pagar</h2>
          <p class="text-brown-500 mb-6">Agrega productos al carrito antes de continuar.</p>
          <a href="#/shop" class="inline-block bg-brown-600 text-white px-7 py-3 hover:bg-brown-700">Ir a la tienda</a>
        </div>
      `
      }
    </section>
  `;

  const form = document.getElementById("checkoutForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const cardNumber = String(formData.get('cardNumber') || '').replace(/\D/g, '');

      saveAddress({
        id: defaultAddress?.id,
        label: 'Dirección de facturación',
        fullName: `${formData.get('firstName')} ${formData.get('lastName')}`,
        address: formData.get('address'),
        district: formData.get('district'),
        city: `${formData.get('department')}, Perú`,
        phone: formData.get('phone'),
        reference: formData.get('reference') || '',
        isDefault: true,
      });

      if (cardNumber) {
        savePaymentMethod({
          cardNumber,
          expiry: formData.get('expiry'),
          cardName: formData.get('cardName'),
          isDefault: true,
        });
      }

      saveOrder({
        total,
        items: rows.map(item => ({
          id: item.product.id,
          name: item.product.name,
          qty: item.qty,
          price: item.product.price,
        })),
      });

      clearCart();
      toast("Compra confirmada. Pedido guardado en tu historial.");
      setTimeout(() => {
        location.hash = "#/order-history";
      }, 900);
    });
  }
}

function inputField(
  name,
  label,
  value = "",
  type = "text",
  autocomplete = "on",
  required = true,
  extraAttrs = "",
) {
  return `
    <label class="block">
      <span class="block mb-2 font-medium">${label}</span>
      <input
        name="${name}"
        type="${type}"
        autocomplete="${autocomplete}"
        ${required ? 'required' : ''}
        value="${String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"
        ${extraAttrs}
        class="w-full border border-brown-200 bg-white px-4 py-3 outline-none focus:border-brown-500"
      />
    </label>
  `;
}
