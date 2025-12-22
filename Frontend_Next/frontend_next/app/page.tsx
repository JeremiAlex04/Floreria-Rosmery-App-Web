import ProductosPrincipales from "./ProductosPrincipales";
import Carousel from "./Carrusel";

export default function HomePage() {
  return (
    <>
      <Carousel />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ProductosPrincipales />
      </main>
    </>
  );
}
