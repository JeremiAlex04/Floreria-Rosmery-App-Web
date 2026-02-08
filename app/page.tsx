import ProductosPrincipales from "./ProductosPrincipales";
import Carousel from "./Carrusel";
import Beneficios from "./Beneficios";
import TestimonioReseña from "./TestimonioReseña";
import CategoriasOcasiones from "./CategoriasOcasiones";
import ComoComprar from "./ComoComprar";

export default function HomePage() {
  return (
    <div className="bg-gray-50/30 min-h-screen">
      <Carousel />
      <Beneficios />
      <main className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        <CategoriasOcasiones />
        <ProductosPrincipales />
        <ComoComprar />
        <TestimonioReseña />
      </main>
    </div>
  );
}
