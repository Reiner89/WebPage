import { products } from "../data.js";
import { money } from "../helpers.js";
import { addToCart } from "../cart.js";

export function renderProduct(app) {
  const id = Number(location.hash.split("/product/")[1]);
  const product = products.find((item) => item.id === id);

  if (!product) {
    app.innerHTML = `
      <section class="page max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 class="font-serif text-4xl font-bold mb-4">Producto no encontrado</h1>
        <a href="#/shop" class="underline text-brown-500">Volver a la tienda</a>
      </section>
    `;
    return;
  }

  const colorDots = {
    "Tan Brown": "#a06a35",
    Brown: "#7a4729",
    Black: "#2b261f",
    Camel: "#c2a25b",
  };

  app.innerHTML = `
    <section class="page max-w-7xl mx-auto px-6 md:px-10 py-14">
      <div class="grid grid-cols-1 lg:grid-cols-[560px_1fr] gap-12">
        <div class="grid grid-cols-[72px_1fr] gap-5">
          <div class="space-y-4">
            ${[1, 2, 3, 4]
              .map(
                () => `
              <button class="w-full aspect-square bg-brown-100 overflow-hidden border border-transparent hover:border-brown-500">
                <div class="briefcase-img w-full h-full"></div>
              </button>
            `,
              )
              .join("")}
          </div>
          <div class="briefcase-img w-full aspect-square bg-brown-50"></div>
        </div>

        <div>
          <h1 class="font-serif text-4xl md:text-5xl font-bold text-brown-700 leading-tight">${product.name}</h1>
          <p class="text-3xl mt-3 mb-8">${money(product.price)}</p>

          <div class="mb-6">
            <p class="font-medium mb-3">Color: <span class="text-brown-400 font-normal">${product.color}</span></p>
            <div class="flex gap-3">
              ${product.colors
                .map(
                  (color) => `
                <button title="${color}" class="w-9 h-9 rounded-full border border-brown-100" style="background:${colorDots[color] || "#8a6a4b"}"></button>
              `,
                )
                .join("")}
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 mb-9">
            <div class="flex border border-brown-100 h-14 w-36">
              <button id="minusQty" class="w-12 text-brown-400">-</button>
              <input id="qtyInput" value="1" readonly class="w-12 text-center outline-none" />
              <button id="plusQty" class="w-12 text-brown-400">+</button>
            </div>
            <button id="addProductBtn" class="h-14 flex-1 bg-brown-600 text-white font-semibold hover:bg-brown-700 transition">Agregar al Carrito</button>
          </div>

          <p class="text-brown-400 leading-8 text-lg max-w-2xl">${product.description}</p>
          <div class="border-t border-brown-100 my-9"></div>
          <h2 class="font-serif text-2xl font-bold mb-5">Specifications</h2>

          <div class="grid grid-cols-[120px_1fr] gap-y-3 text-brown-500">
            <strong class="text-brown-800">Model:</strong><span>${product.model}</span>
            <strong class="text-brown-800">Dimensions:</strong><span>${product.dimensions}</span>
            <strong class="text-brown-800">Material:</strong><span>${product.material}</span>
            <strong class="text-brown-800">Availability:</strong><span class="text-green-700">${product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-9">
            <div class="bg-brown-50 p-5 text-center">
              <h3 class="font-bold">Free Shipping</h3>
              <p class="text-brown-400 text-sm">On orders over S/200</p>
            </div>
            <div class="bg-brown-50 p-5 text-center">
              <h3 class="font-bold">2-Year Warranty</h3>
              <p class="text-brown-400 text-sm">Against manufacturing defects</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  let qty = 1;
  const qtyInput = document.getElementById("qtyInput");

  document.getElementById("minusQty").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    qtyInput.value = qty;
  });

  document.getElementById("plusQty").addEventListener("click", () => {
    qty += 1;
    qtyInput.value = qty;
  });

  document.getElementById("addProductBtn").addEventListener("click", () => {
    addToCart(product.id, qty);
  });
}
