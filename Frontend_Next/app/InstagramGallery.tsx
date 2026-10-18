"use client";

import Image from "next/image";
import { FiInstagram, FiArrowUpRight } from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";

const photos = [
    { src: "/img/img-promocion/Promocion1.jpg", alt: "Rosas rojas de exportación" },
    { src: "/img/img-promocion/Promocion2.jpg", alt: "Arreglo floral primaveral" },
    { src: "/img/img-promocion/Promocion3.jpg", alt: "Ramo de tulipanes y lirios" },
    { src: "/img/img-promocion/Promocion4.jpg", alt: "Centro de mesa para eventos" },
    { src: "/img/img-promocion/Promocion5.jpg", alt: "Bouquet nupcial de rosas" },
    { src: "/img/img-promocion/Promocion6.jpg", alt: "Arreglo luxury en caja" },
];

export default function InstagramGallery() {
    const { ref, isVisible } = useScrollReveal();

    return (
        <section
            ref={ref}
            className={`transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] will-change-transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
            <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="inline-block px-4 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-[#D4145A] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
                    Comunidad Floral
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                    Síguenos en @floreriarosmery
                </h2>
                <p className="text-stone-500 text-sm sm:text-base mt-3 leading-relaxed">
                    Inspírate con nuestras creaciones diarias, entregas en tiempo real y momentos compartidos.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 md:gap-4">
                {photos.map((photo, i) => (
                    <a
                        key={i}
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ touchAction: "manipulation" }}
                        className="group relative aspect-square overflow-hidden rounded-[1.8rem] bg-stone-100 ring-1 ring-stone-900/5 select-none"
                    >
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-108 will-change-transform"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                        />

                        {/* Glass overlay on hover */}
                        <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-white/90 text-[#D4145A] flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-md">
                                <FiInstagram size={20} />
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <div className="text-center mt-10">
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ touchAction: "manipulation" }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-100 hover:bg-pink-50 border border-stone-200/60 hover:border-pink-200 text-stone-700 hover:text-[#D4145A] text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm"
                >
                    <FiInstagram className="text-base text-[#D4145A]" /> Ver más en Instagram <FiArrowUpRight />
                </a>
            </div>
        </section>
    );
}
