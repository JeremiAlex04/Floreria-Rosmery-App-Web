"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ocasiones = [
    {
        id: 1,
        titulo: "Amor y Romance",
        slug: "amor",
        imagen: "/img/img-catalogo/C-Rosas.jpg",
    },
    {
        id: 2,
        titulo: "Cumpleaños",
        slug: "cumpleanos",
        imagen: "/img/img-catalogo/C-Cumpleaños.jpg",
    },
    {
        id: 3,
        titulo: "Aniversario",
        slug: "aniversario",
        imagen: "/img/img-catalogo/C-Aniversario.jpg",
    },
    {
        id: 4,
        titulo: "Condolencias",
        slug: "condolencias",
        imagen: "/img/img-catalogo/C-Condolencias.jpg",
    },
];

export default function CategoriasOcasiones() {
    const { ref, isVisible } = useScrollReveal();

    return (
        <section
            ref={ref}
            className={`py-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
            <div className="text-center mb-12">
                <span className="text-gray-400 font-bold tracking-widest uppercase text-xs">Para cada momento</span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-2 tracking-tight">
                    Comprar por Ocasión
                </h2>
                <div className="h-1.5 w-16 bg-gray-200 mx-auto mt-4 rounded-full" />
                <p className="text-gray-500 mt-4 font-medium">Encuentra el detalle perfecto para cada momento</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {ocasiones.map((ocasion, i) => (
                    <Link
                        key={ocasion.id}
                        href={`/catalogo?ocasion=${ocasion.slug}`}
                        className="group relative flex flex-col items-center"
                        style={{ transitionDelay: `${i * 150}ms` }}
                    >
                        <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-pink-200/50 relative border-4 border-white">
                            <Image
                                src={ocasion.imagen}
                                alt={ocasion.titulo}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <h3 className="mt-5 font-bold text-gray-800 text-base md:text-lg transition-colors group-hover:text-[#D4145A]">
                            {ocasion.titulo}
                        </h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}
