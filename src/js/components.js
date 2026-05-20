import { money, productImage } from "./helpers.js";

export function productCard(product) {
  const type = product.category === "Bags" ? "briefcase" : "wallet";

  return `
    <article class="group">
      <a href="#/product/${product.id}" class="block overflow-hidden bg-white">
        ${productImage(type)}
      </a>
      <div class="pt-4">
        <a href="#/product/${product.id}" class="font-serif text-lg hover:text-brown-500">${product.name}</a>
        <p class="text-brown-500 mt-1">${money(product.price)}</p>
        <button data-add-cart="${product.id}" class="mt-3 border border-brown-300 px-4 py-2 text-sm hover:bg-brown-600 hover:text-white transition">
          Agregar al Carrito
        </button>
      </div>
    </article>
  `;
}

export function selectField(name, label, options, value) {
  return `
    <div>
      <label class="block mb-2 font-medium">${label}</label>
      <select name="${name}" class="w-full border border-brown-200 px-3 py-3 outline-none focus:border-brown-500 text-brown-500">
        <option value="">Selecciona ${label.toLowerCase()}...</option>
        ${options.map((option) => `<option value="${option}" ${value === option ? "selected" : ""}>${option}</option>`).join("")}
      </select>
    </div>
  `;
}
