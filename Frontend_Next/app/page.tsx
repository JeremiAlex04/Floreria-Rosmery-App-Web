import HeroSection from "./HeroSection";
import Beneficios from "./Beneficios";
import CategoriasOcasiones from "./CategoriasOcasiones";
import ProductosPrincipales from "./ProductosPrincipales";
import PromoBanner from "./PromoBanner";
import ComoComprar from "./ComoComprar";
import AnimatedCounters from "./AnimatedCounters";
import TestimoniosCarousel from "./TestimoniosCarousel";
import InstagramGallery from "./InstagramGallery";
import ContactSection from "./ContactSection";

export default function HomePage() {
  return (
    <div className="bg-gray-50/30 min-h-screen">
      <HeroSection />
      <Beneficios />
      <main className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        <CategoriasOcasiones />
        <ProductosPrincipales />
        <PromoBanner />
        <ComoComprar />
        <AnimatedCounters />
        <TestimoniosCarousel />
        <InstagramGallery />
        <ContactSection />
      </main>
    </div>
  );
}
