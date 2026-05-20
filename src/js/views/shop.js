import { products } from "../data.js";
import { getQueryParams } from "../helpers.js";
import { productCard, selectField } from "../components.js";

export function renderShop(app) {
  const params = getQueryParams();
  const selectedCategory = params.get("category") || "";
  const query = params.get("q") || "";
  const sort = params.get("sort") || "relevance";
  const minPrice = Number(params.get("min")) || 0;
  const maxPrice = Number(params.get("max")) || 500;
  const color = params.get("color") || "";
  const size = params.get("size") || "";
  const material = params.get("material") || "";
  const gender = params.get("gender") || "";
  const page = Number(params.get("page")) || 1;
  const perPage = 8;

  let filtered = products.filter((product) => {
    return (
      (!selectedCategory || product.category === selectedCategory) &&
      (!query || product.name.toLowerCase().includes(query.toLowerCase())) &&
      product.price >= minPrice &&
      product.price <= maxPrice &&
      (!color || product.colors.includes(color) || product.color === color) &&
      (!size || product.size === size) &&
      (!material || product.material === material) &&
      (!gender || product.gender === gender)
    );
  });

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sort === "new")
    filtered.sort((a, b) => Number(b.isNew) - Number(a.isNew));

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  function paginationButton(targetPage, label, disabled, active = false) {
    const nextParams = new URLSearchParams(params);
    nextParams.set("page", targetPage);

    if (disabled) {
      return `<span class="w-10 h-10 grid place-items-center border border-brown-100 text-brown-200">${label}</span>`;
    }

    return `<a href="#/shop?${nextParams.toString()}" class="w-10 h-10 grid place-items-center border ${active ? "bg-brown-600 text-white border-brown-600" : "border-brown-100 hover:bg-brown-50"}">${label}</a>`;
  }

  app.innerHTML = `
    <section class="page max-w-7xl mx-auto px-6 md:px-10 py-10">
      <div class="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-10">
        <aside>
          <h2 class="font-serif text-2xl font-bold mb-6 text-brown-700">Filtrar Búsqueda</h2>
          <form id="filterForm" class="space-y-5">
            <input type="hidden" name="category" value="${selectedCategory}" />
            <input type="hidden" name="q" value="${query}" />
            <div>
              <label class="block mb-2 font-medium">Price S/</label>
              <div class="grid grid-cols-2 gap-3">
                <input name="min" type="number" value="${minPrice}" class="border border-brown-200 px-3 py-2 w-full outline-none focus:border-brown-500" />
                <input name="max" type="number" value="${maxPrice}" class="border border-brown-200 px-3 py-2 w-full outline-none focus:border-brown-500" />
              </div>
            </div>
            ${selectField("color", "Color", ["Brown", "Black", "Camel", "Tan Brown"], color)}
            ${selectField("size", "Tamaño", ["Small", "Medium", "Large"], size)}
            ${selectField("material", "Material", ["Leather", "Premium leather", "Full-grain leather"], material)}
            ${selectField("gender", "Género", ["Men", "Women", "Unisex"], gender)}
            <button class="w-full border border-brown-500 px-5 py-3 hover:bg-brown-600 hover:text-white transition">Aplicar</button>
            <a href="#/shop" class="block text-center text-sm underline text-brown-500">Limpiar filtros</a>
          </form>
        </aside>

        <section>
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
            <div class="flex items-center justify-center w-full">
              <h1 class="font-serif text-3xl font-bold text-brown-700">${query ? `Resultados para “${query}”` : selectedCategory || "Resultados de Búsqueda"}</h1>
            </div>
            <label class="flex items-center gap-3 hidden">
              <span class="text-brown-400">Sort by:</span>
              <select id="sortSelect" class="px-3 py-2 border border-brown-100 outline-none">
                <option value="relevance" ${sort === "relevance" ? "selected" : ""}>Relevance</option>
                <option value="new" ${sort === "new" ? "selected" : ""}>New arrivals</option>
                <option value="price-asc" ${sort === "price-asc" ? "selected" : ""}>Precio menor</option>
                <option value="price-desc" ${sort === "price-desc" ? "selected" : ""}>Precio mayor</option>
              </select>
            </label>
          </div>

          ${
            visible.length
              ? `
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7">${visible.map(productCard).join("")}</div>
          `
              : `
            <div class="bg-brown-50 p-10 text-center">
              <h3 class="font-serif text-2xl font-bold mb-2">No hay productos</h3>
              <p class="text-brown-500">Prueba cambiando los filtros de búsqueda.</p>
            </div>
          `
          }

          <div class="flex justify-center gap-2 mt-12">
            ${paginationButton(currentPage - 1, "‹", currentPage === 1)}
            ${Array.from({ length: totalPages }, (_, index) => paginationButton(index + 1, index + 1, false, index + 1 === currentPage)).join("")}
            ${paginationButton(currentPage + 1, "›", currentPage === totalPages)}
          </div>
        </section>
      </div>
    </section>
  `;

  document.getElementById("filterForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const next = new URLSearchParams();

    for (const [key, value] of form.entries()) {
      if (value !== "") next.set(key, value);
    }

    next.set("sort", sort);
    next.set("page", 1);
    location.hash = `#/shop?${next.toString()}`;
  });

  document.getElementById("sortSelect").addEventListener("change", (event) => {
    params.set("sort", event.target.value);
    params.set("page", 1);
    location.hash = `#/shop?${params.toString()}`;
  });
}
