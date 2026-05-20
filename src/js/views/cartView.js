import { products } from "../data.js";
import { money, productImage } from "../helpers.js";
import { getCart, removeFromCart, updateQty } from "../cart.js";

export function renderCart(app) {
  const cart = getCart();
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
  const total = subtotal;

  app.innerHTML = `
    <section class="page max-w-6xl mx-auto px-6 md:px-10 py-14">
      <h1 class="font-serif text-4xl font-bold text-brown-700 text-center mb-10">Carrito de compras</h1>
      ${
        rows.length
          ? `
        <div class="space-y-5">
            ${rows
              .map(
                (item) => `
              <article class="
                  flex items-center justify-between
                  border border-brown-100
                  p-5
                  gap-5
                "
              >
                <!-- IZQUIERDA -->
                <div class="flex items-center gap-5">
                  
                  <a
                    href="#/product/${item.product.id}"
                    class="w-24 h-24 shrink-0"
                  >
                    ${productImage(
                      item.product.category === "Bags" ? "briefcase" : "wallet",
                    )}
                  </a>

                  <div>
                    <a
                      href="#/product/${item.product.id}"
                      class="font-serif text-2xl font-bold hover:text-brown-500"
                    >
                      ${item.product.name}
                    </a>

                    <p class="text-brown-400 mt-1">
                      Color: ${item.product.color}
                    </p>

                    <p class="text-brown-400">
                      Cantidad: ${item.qty}
                    </p>
                  </div>
                </div>

                <!-- DERECHA -->
                <div class="flex items-center gap-6">
                  
                  <p class="font-bold text-2xl whitespace-nowrap">
                    ${money(item.product.price * item.qty)}
                  </p>

                  <button
                    data-remove-cart="${item.product.id}"
                    class="text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-7 h-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1.8"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 7h12"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 7V4h6v3"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10 11v6"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14 11v6"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7 7l1 12h8l1-12"
                      />
                    </svg>
                  </button>

                </div>
              </article>
            `,
              )
              .join("")}
          </div>

          <div class="flex justify-end items-center gap-6 pt-4">
            <div class="text-3xl font-bold text-brown-900">
              Total: ${money(total)}
            </div>
            <a
              href="#/checkout"
              class="
                bg-black
                text-white
                px-14 py-4
                font-semibold
                min-w-[220px]
                text-center
                hover:opacity-90
                transition
              "
            >
              Pagar
            </a>

          </div>
        </div>
      `
          : `
        <div class="bg-brown-50 p-12 text-center">
          <h2 class="font-serif text-3xl font-bold mb-3">Tu carrito está vacío</h2>
          <p class="text-brown-500 mb-6">Agrega productos para continuar.</p>
          <a href="#/shop" class="inline-block bg-brown-600 text-white px-7 py-3 hover:bg-brown-700">Ir a la tienda</a>
        </div>
      `
      }
    </section>
  `;

  document.querySelectorAll("[data-remove-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(button.dataset.removeCart);
      renderCart(app);
    });
  });

  document.querySelectorAll("[data-cart-qty]").forEach((button) => {
    button.addEventListener("click", () => {
      updateQty(button.dataset.cartQty, Number(button.dataset.qty));
      renderCart(app);
    });
  });
}
