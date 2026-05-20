export function renderAbout(app) {
  app.innerHTML = `
    <section class="page max-w-6xl mx-auto px-6 md:px-10 pt-14 md:pt-20">
      <div class="text-center max-w-3xl mx-auto mb-20">
        <h1 class="font-serif text-4xl md:text-5xl font-bold text-brown-700">Conócenos...</h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        <div class="artisan-img rounded-sm aspect-[4/3]"></div>
        <div>
          <h2 class="font-serif text-3xl font-bold text-brown-700 mb-6">Nuestro Patrimonio</h2>
          <p class="text-brown-400 leading-8 mb-5">
            Enraizada en las ricas tradiciones de la marroquinería peruana, cada pieza de Wills es un testimonio de la habilidad y la dedicación de nuestros maestros artesanos. Seleccionamos solo los mejores cueros de plena flor, lo que garantiza que cada accesorio no solo luzca exquisito, sino que también desarrolle una pátina única con el tiempo.
          </p>
          <p class="text-brown-400 leading-8">
            Nuestro compromiso con la calidad significa que nunca transigimos en cuanto a materiales o confección. Desde el corte inicial hasta la última puntada, nuestro proceso se guía por la pasión por la perfección.
          </p>
        </div>
      </div>

      <div class="bg-brown-50 px-6 md:px-12 py-12 mb-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="font-serif text-3xl font-bold text-brown-700 mb-6">Diseño distintivo</h2>
            <p class="text-brown-400 leading-8 mb-5">
              Lo que distingue a un accesorio Wills es nuestro exclusivo grabado geométrico. Inspirados en los antiguos textiles y la arquitectura peruana, estos llamativos diseños añaden profundidad y exclusividad a nuestras colecciones.
            </p>
            <p class="text-brown-400 leading-8">
              Este intrincado diseño se aplica con precisión, reflejando los valores fundamentales de nuestra marca: exclusividad, sofisticación, durabilidad y funcionalidad sin concesiones.
            </p>
          </div>
          <div class="pattern-img rounded-sm aspect-[4/3]"></div>
        </div>
      </div>
    </section>
  `;
}

function valueCard(title, text) {
  return `
    <article class="border border-brown-100 p-7 text-center">
      <h3 class="font-serif text-xl font-bold mb-3">${title}</h3>
      <p class="text-brown-400 leading-6">${text}</p>
    </article>
  `;
}
