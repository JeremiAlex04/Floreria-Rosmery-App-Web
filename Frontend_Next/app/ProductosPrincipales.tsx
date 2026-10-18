"use client";

import { useEffect, useState } from "react";
import PlantCard from "./CardPlantas";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { fetchHomeData, defaultHomeData } from "../lib/homeDataClient";

export default function ProductosPrincipales() {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<any[]>(defaultHomeData.popularProducts);
    const { ref, isVisible } = useScrollReveal();

    useEffect(() => {
        let isMounted = true;
        const fetchPopular = async () => {
            try {
                const data = await fetchHomeData();
                if (isMounted && data.popularProducts && data.popularProducts.length > 0) {
                    setProducts(data.popularProducts);
                }
            } catch (error) {
                console.error("Unable to load popular products:", error);
            }
        };

        fetchPopular();
        return () => {
            isMounted = false;
        };
    }, []);

    if (products.length === 0) return null;

    return (
        <section
            ref={ref}
            className={`transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] will-change-transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
            <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="inline-block px-4 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-[#D4145A] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
                    Colección Exclusiva
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                    Arreglos Más Populares
                </h2>
                <p className="text-stone-500 text-sm sm:text-base mt-3 leading-relaxed">
                    Nuestras composiciones florales favoritas, creadas con flores frescas y diseño de autor.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
                {products.map((plant) => (
                    <PlantCard key={plant.id} {...plant} onAddToCart={() => addToCart(plant)} />
                ))}
            </div>

            {/* Button-in-button bottom CTA */}
            <div className="text-center mt-14">
                <Link
                    href="/catalogo"
                    style={{ touchAction: "manipulation" }}
                    className="group inline-flex items-center gap-3 pl-7 pr-2.5 py-2.5 bg-stone-900 hover:bg-[#D4145A] text-white font-semibold rounded-full shadow-md hover:shadow-xl active:scale-95 transition-all duration-300 ease-[var(--ease-out-expo)] text-sm tracking-wide"
                >
                    <span>Ver Colección Completa</span>
                    <span className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-colors">
                        <FiArrowRight className="text-sm group-hover:translate-x-0.5 transition-transform" />
                    </span>
                </Link>
            </div>
        </section>
    );
}
