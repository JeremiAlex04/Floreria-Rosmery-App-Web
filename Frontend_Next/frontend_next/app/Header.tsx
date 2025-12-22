"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { plants, Plant } from "./API_Plantas";
import ModalQS from "./ModalQS";

export default function Header() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Plant[]>([]);
    const pathname = usePathname();

    // Limpiar buscador al cambiar de página
    useEffect(() => {
        setQuery("");
        setSuggestions([]);
    }, [pathname]);

    // Filtrar en tiempo real
    useEffect(() => {
        if (query.trim().length > 1) {
            const filtered = plants.filter((plant) =>
                plant.nombre.toLowerCase().includes(query.toLowerCase()) ||
                plant.categoria?.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 5);
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [query]);

    // Modal QS
    const [modalQSOpen, setModalQSOpen] = useState(false);

    return (
        <nav className="bg-[#FF6F91] px-4 py-3 shadow-md sticky top-0 z-50" role="navigation" aria-label="Navegación principal">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
                    <Image
                        src="/img/img-logo/logov2.png"
                        alt="Logo Florería Rosmery"
                        width={280}
                        height={60}
                        priority
                        className="h-auto w-auto"
                    />
                </Link>

                {/* Botón menú móvil */}
                <button
                    className="lg:hidden text-white text-3xl focus:outline-none"
                    aria-label="Abrir menú"
                >
                    ☰
                </button>

                {/* Menú */}
                <div className="w-full lg:flex lg:items-center lg:w-auto">
                    <ul className="flex flex-col lg:flex-row lg:space-x-8 mt-4 lg:mt-0 text-lg font-semibold text-white">
                        <li>
                            <Link href="/" className="hover:text-pink-100 transition-colors">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/catalogo" className="hover:text-pink-100 transition-colors">
                                Catálogo
                            </Link>
                        </li>
                        <li>
                            <Link href="#contacto" className="hover:text-pink-100 transition-colors">
                                Contacto
                            </Link>
                        </li>
                        <li>
                            <Link href="#quienes-somos" onClick={(e) => { e.preventDefault(); setModalQSOpen(true); }} className="hover:text-pink-100 transition-colors">
                                Quiénes somos
                            </Link>
                            {/*Modal QS*/}
                            <ModalQS isOpen={modalQSOpen} onClose={() => setModalQSOpen(false)} />
                        </li>
                    </ul>

                    {/* Buscador con Sugerencias */}
                    <div className="relative mt-4 lg:mt-0 lg:ml-8">
                        <form className="flex" action="/buscar">
                            <input type="search" name="q" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar flores..." className="px-4 py-2 bg-white rounded-l-md font-medium text-gray-700 focus:ring-2 focus:ring-white outline-none w-full lg:w-56 transition-all" autoComplete="off" />
                            <button type="submit" className="bg-[#D4145A] hover:bg-[#B0124A] text-white font-bold px-5 py-2 rounded-r-md transition-colors">Buscar</button>
                        </form>

                        {/* Dropdown de Sugerencias */}
                        {suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-lg mt-1 overflow-hidden z-50 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                                {suggestions.map((plant) => (
                                    <Link key={plant.id} href={`/buscar?q=${plant.nombre}`} className="flex items-center gap-3 p-3 hover:bg-pink-50 transition-colors border-b last:border-0" onClick={() => setQuery("")}>
                                        <div className="w-10 h-10 relative flex-shrink-0">
                                            <Image src={plant.imagen} alt={plant.nombre} fill className="object-cover rounded-md" />
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-sm font-bold text-gray-800 truncate">{plant.nombre}</span>
                                            <span className="text-xs text-gray-400 capitalize">{plant.categoria}</span>
                                        </div>
                                        <span className="ml-auto text-sm font-bold text-[#D4145A]">S/ {plant.precio}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav >
    );
}
