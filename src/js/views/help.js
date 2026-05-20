import { toast } from "../helpers.js";

export function renderHelp(app) {
  app.innerHTML = `
    <section class="page max-w-5xl mx-auto px-6 md:px-10 py-14 md:py-20">

      <div class="text-center mb-12">
        <h1 class="font-serif text-4xl md:text-5xl font-bold text-brown-700">
          Centro de Ayuda
        </h1>

        <input
          id="helpSearch"
          class="mt-7 w-full max-w-2xl border border-brown-200 px-5 py-4 outline-none focus:border-brown-500"
          placeholder="Buscar..."
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${helpCard(
          "chat",
          "Chatea con Nosotros",
          "Obtén respuestas automáticas a preguntas comunes.",
        )}

        ${helpCard(
          "faq",
          "Preguntas Frecuentes",
          "Encuentra respuestas a preguntas frecuentes.",
        )}

        ${helpCard(
          "form",
          "Formulario de Contacto",
          "Envíe una consulta por problemas complejos.",
          true,
        )}
      </div>

    </section>
  `;

  const form = document.getElementById("helpForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.target.reset();
      toast("Mensaje enviado de forma simulada");
    });
  }
}

function helpCard(icon, title, text, active = false) {
  return `
    <article
      class="
        border
        ${active ? "border-brown-600" : "border-brown-100"}
        p-8
        text-center
        transition
        hover:shadow-lg
      "
    >

      <div
        class="
          mx-auto mb-5
          flex items-center justify-center
          w-16 h-16 rounded-full
          ${icon === "faq" ? "bg-brown-900" : "bg-brown-600"}
          text-white
        "
      >
        ${getIcon(icon)}
      </div>

      <h3 class="font-serif text-2xl font-bold mb-3 text-brown-800">
        ${title}
      </h3>

      <p class="text-brown-400 leading-7">
        ${text}
      </p>

    </article>
  `;
}

function getIcon(icon) {
  const icons = {
    chat: `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8 10h8M8 14h5m-9 6l2.5-2.5A9 9 0 1112 21a8.96 8.96 0 01-4.5-1.2L3 20z"
        />
      </svg>
    `,

    faq: `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.09 9a3 3 0 115.82 1c0 2-3 3-3 3"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 17h.01"
        />
      </svg>
    `,

    form: `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 4h16v16H4z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8 8h8M8 12h8M8 16h5"
        />
      </svg>
    `,
  };

  return icons[icon] || "";
}
