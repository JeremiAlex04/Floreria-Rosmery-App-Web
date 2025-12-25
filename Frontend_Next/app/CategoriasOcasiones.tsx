"use client";

import Link from "next/link";
import Image from "next/image";

const ocasiones = [
    {
        id: 1,
        titulo: "Amor y Romance",
        slug: "amor",
        imagen: "/img/img-catalogo/C-Rosas.jpg",
        color: "bg-pink-100",
    },
    {
        id: 2,
        titulo: "Cumpleaños",
        slug: "cumpleanos",
        imagen: "/img/img-catalogo/C-Cumpleaños.jpg",
        color: "bg-yellow-100",
    },
    {
        id: 3,
        titulo: "Aniversario",
        slug: "aniversario",
        imagen: "/img/img-catalogo/C-Aniversario.jpg",
        color: "bg-red-100",
    },
    {
        id: 4,
        titulo: "Condolencias",
        slug: "condolencias",
        imagen: "/img/img-catalogo/C-Condolencias.jpg",
        color: "bg-blue-100",
    },
];

export default function CategoriasOcasiones() {
    return (
        <section className="py-12 bg-gray-50/50 rounded-3xl mt-8">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2 uppercase tracking-tight">
                    Comprar por Ocasión
                </h2>
                <p className="text-gray-500 mb-10 font-medium">Encuentra el detalle perfecto para cada momento</p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {ocasiones.map((ocasion) => (
                        <Link
                            key={ocasion.id}
                            href={`/catalogo?ocasion=${ocasion.slug}`}
                            className="group relative flex flex-col items-center"
                        >
                            <div
                                className={`w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-pink-200 group-hover:border-[#FF6F91] relative`}
                            >
                                <Image
                                    src={ocasion.imagen}
                                    alt={ocasion.titulo}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:rotate-3 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                            </div>
                            <h3 className="mt-4 font-bold text-gray-800 text-lg md:text-xl transition-colors group-hover:text-[#D4145A]">
                                {ocasion.titulo}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
