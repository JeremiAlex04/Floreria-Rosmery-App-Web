"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ocasiones = [
    {
        id: 1,
        titulo: "Amor y Romance",
        subtitulo: "Rosas y arreglos apasionados",
        slug: "amor",
        imagen: "/img/img-catalogo/C-Rosas.jpg",
    },
    {
        id: 2,
        titulo: "Cumpleaños",
        subtitulo: "Color y alegría para celebrar",
        slug: "cumpleanos",
        imagen: "/img/img-catalogo/C-Cumpleaños.jpg",
    },
    {
        id: 3,
        titulo: "Aniversario",
        subtitulo: "Detalles que trascienden",
        slug: "aniversario",
        imagen: "/img/img-catalogo/C-Aniversario.jpg",
    },
    {
        id: 4,
        titulo: "Condolencias",
        subtitulo: "Acompañamiento con respeto",
        slug: "condolencias",
        imagen: "/img/img-catalogo/C-Condolencias.jpg",
    },
];

export default function CategoriasOcasiones() {
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
                    Diseños para Cada Momento
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                    Comprar por Ocasión
                </h2>
                <p className="text-stone-500 text-sm sm:text-base mt-3 leading-relaxed">
                    Arreglos florales concebidos con delicadeza artística para transmitir emociones inolvidables.
                </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-7">
                {ocasiones.map((ocasion) => (
                    <Link
                        key={ocasion.id}
                        href={`/catalogo?ocasion=${ocasion.slug}`}
                        style={{ touchAction: "manipulation" }}
                        className="group relative flex flex-col p-2.5 rounded-[2.2rem] bg-stone-100/70 hover:bg-pink-100/40 ring-1 ring-stone-900/5 hover:ring-pink-300/40 transition-all duration-300 ease-[var(--ease-out-expo)] select-none"
                    >
                        <div className="relative rounded-[calc(2.2rem-0.6rem)] overflow-hidden bg-white shadow-sm flex flex-col">
                            {/* Imagen con zoom orgánico */}
                            <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                                <Image
                                    src={ocasion.imagen}
                                    alt={ocasion.titulo}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-108 will-change-transform"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300" />

                                {/* Icono flotante con Button-in-button aesthetic */}
                                <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-stone-900 group-hover:bg-[#D4145A] group-hover:text-white transition-all duration-300 shadow-sm">
                                    <FiArrowUpRight className="text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </div>

                                {/* Textos posicionados en la base del card */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white">
                                    <h3 className="font-editorial text-lg md:text-xl font-bold leading-tight drop-shadow-sm group-hover:text-pink-200 transition-colors">
                                        {ocasion.titulo}
                                    </h3>
                                    <p className="text-[11px] text-white/80 mt-1 line-clamp-1 hidden sm:block">
                                        {ocasion.subtitulo}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
