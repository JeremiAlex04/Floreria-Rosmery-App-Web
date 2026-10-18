import dynamic from "next/dynamic";
import HeroSection from "./HeroSection";
import Beneficios from "./Beneficios";
import CategoriasOcasiones from "./CategoriasOcasiones";
import ProductosPrincipales from "./ProductosPrincipales";
import PromoBanner from "./PromoBanner";
import ComoComprar from "./ComoComprar";

// Componentes cualitativos cargados de forma diferida (sin métricas cuantitativas)
const TestimoniosCarousel = dynamic(() => import("./TestimoniosCarousel"), { ssr: true });
const InstagramGallery = dynamic(() => import("./InstagramGallery"), { ssr: true });
const ContactSection = dynamic(() => import("./ContactSection"), { ssr: true });

export default function HomePage() {
  return (
    <div className="bg-[#FAFAF8] text-stone-900 min-h-screen selection:bg-pink-150 selection:text-pink-900">
      {/* Above-the-fold crítico */}
      <HeroSection />
      <Beneficios />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 space-y-28 md:space-y-36">
        <CategoriasOcasiones />
        <ProductosPrincipales />
        <PromoBanner />
        <ComoComprar />
        {/* Se retiran contadores cuantitativos para mantener un tono puramente cualitativo y artesanal */}
        <TestimoniosCarousel />
        <InstagramGallery />
        <ContactSection />
      </main>
    </div>
  );
}
