import ProductosPrincipales from "./ProductosPrincipales";
import Carousel from "./Carrusel";
import Beneficios from "./Beneficios";
import TestimonioReseña from "./TestimonioReseña";
import CategoriasOcasiones from "./CategoriasOcasiones";

export default function HomePage() {
  return (
    <>
      <Carousel />
      <Beneficios />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <CategoriasOcasiones />
        <ProductosPrincipales />
        <TestimonioReseña />
      </main>
    </>
  );
}
