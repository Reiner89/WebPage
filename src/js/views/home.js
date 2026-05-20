import { products, categories } from "../data.js";
import { productCard } from "../components.js";

export function renderHome(app) {
  const newProducts = products.filter((product) => product.isNew).slice(0, 4);

  app.innerHTML = `
    <section class="page">
      <div class="h-[530px] bg-[#a5a7a5] grid place-items-center text-center px-6">
        <div class="max-w-xl">
          <h1 class="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">Promociones Actuales</h1>
          <p class="text-white/85 mt-5 text-lg">Descubre nuestras ultimas ofertas y descuentos excluvivos.</p>
          <a href="#/shop" class="inline-block mt-8 bg-brown-600 text-white px-8 py-4 font-semibold hover:bg-brown-700 transition">Comprar Ahora</a>
        </div>
      </div>

      <section class="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <h2 class="font-serif text-3xl text-center font-bold text-brown-700 mb-9">Categorías Principales</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          ${categories
            .map(
              (category) => `
            <a href="${category.href}" class="group text-center">
              <div class="category-img aspect-square rounded-sm mb-4 group-hover:opacity-80 transition"></div>
              <h3 class="font-serif text-lg">${category.name}</h3>
            </a>
          `,
            )
            .join("")}
        </div>
      </section>
    </section>
  `;
}
