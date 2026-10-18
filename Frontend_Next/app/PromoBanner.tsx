"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiArrowRight, FiStar, FiHeart, FiCheckCircle, FiAward } from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { fetchHomeData, Promotion, defaultHomeData } from "../lib/homeDataClient";

export default function PromoBanner() {
    const { ref, isVisible } = useScrollReveal();
    const [promo, setPromo] = useState<Promotion | null>(defaultHomeData.promotion);

    useEffect(() => {
        let isMounted = true;
        const fetchPromo = async () => {
            try {
                const data = await fetchHomeData();
                if (isMounted && data.promotion) {
                    setPromo(data.promotion);
                }
            } catch (error) {
                console.error("Unable to load promotion:", error);
            }
        };
        fetchPromo();
        return () => {
            isMounted = false;
        };
    }, []);

    if (!promo) return null;

    return (
        <section
            ref={ref}
            className={`transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] will-change-transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
            {/* Double-bezel wrapper (high-end-visual-design) */}
            <div className="p-2 sm:p-2.5 rounded-[2.6rem] bg-stone-200/50 ring-1 ring-stone-900/5 select-none">
                <div className="relative overflow-hidden rounded-[calc(2.6rem-0.6rem)] bg-gradient-to-br from-[#1C1917] via-[#2A1D22] to-[#1C1917] text-white p-7 sm:p-10 md:p-14 shadow-2xl">
                    {/* Background glow orbs */}
                    <div className="absolute -top-28 -right-28 w-96 h-96 bg-[#D4145A]/25 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                        {/* Info Column */}
                        <div className="lg:col-span-7 flex flex-col items-start text-left">
                            {/* Eyebrow badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-pink-300 text-xs font-bold tracking-widest uppercase mb-6">
                                <FiAward className="text-sm" /> Creación de Autor
                            </div>

                            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5 tracking-tight text-white">
                                {promo.title}
                            </h2>

                            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                                {promo.description}
                            </p>

                            {/* Precios y distinción cualitativa */}
                            <div className="flex flex-wrap items-baseline gap-4 mb-6">
                                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#FF6F91] tabular-nums">
                                    S/ {promo.sale_price.toFixed(2)}
                                </span>
                                {promo.original_price && (
                                    <span className="text-xl sm:text-2xl text-white/40 line-through tabular-nums">
                                        S/ {promo.original_price.toFixed(2)}
                                    </span>
                                )}
                                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold tracking-wider">
                                    Edición Especial de Temporada
                                </span>
                            </div>

                            {/* Atributos cualitativos de la colección */}
                            <div className="mb-9 flex flex-wrap gap-2.5">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/90">
                                    <FiStar className="text-pink-400 text-sm" /> Arreglo de Autor
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/90">
                                    <FiHeart className="text-rose-400 text-sm" /> Flores Seleccionadas a Mano
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/90">
                                    <FiCheckCircle className="text-emerald-400 text-sm" /> Máxima Frescura Garantizada
                                </span>
                            </div>

                            {/* CTA button-in-button */}
                            <Link
                                href={promo.cta_link || "/catalogo"}
                                style={{ touchAction: "manipulation" }}
                                className="group inline-flex items-center gap-3 pl-8 pr-2.5 py-2.5 bg-[#D4145A] hover:bg-[#B0124A] text-white font-bold rounded-full shadow-lg shadow-pink-900/40 hover:shadow-xl active:scale-95 transition-all duration-200 ease-[var(--ease-out-expo)] text-sm tracking-wide"
                            >
                                <span>Aprovechar Oferta</span>
                                <span className="w-9 h-9 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                                    <FiArrowRight className="text-base group-hover:translate-x-0.5 transition-transform" />
                                </span>
                            </Link>
                        </div>

                        {/* Image Column */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative p-2 rounded-[2.2rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                                <div className="relative aspect-[4/4] sm:aspect-[4/3] lg:aspect-[4/5] rounded-[calc(2.2rem-0.5rem)] overflow-hidden">
                                    <Image
                                        src={promo.image_url}
                                        alt={promo.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] hover:scale-105 will-change-transform"
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
