"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <nav className="bg-[#FF6F91] px-4 py-3 shadow-md" role="navigation" aria-label="Navegación principal">
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
                            <Link href="#quienes-somos" className="hover:text-pink-100 transition-colors">
                                Quiénes somos
                            </Link>
                        </li>
                        <li>
                            <Link href="/carrito" className="hover:text-pink-100 transition-colors">
                                Carrito
                            </Link>
                        </li>
                    </ul>

                    {/* Buscador */}
                    <form className="flex mt-4 lg:mt-0 lg:ml-8" action="/buscar">
                        <input
                            type="search"
                            name="q"
                            placeholder="Buscar flores..."
                            //input color blanco
                            className="px-4 py-2 bg-white rounded-l-md font-medium text-gray-700 focus:ring-2 focus:ring-white outline-none w-full lg:w-48"
                            aria-label="Buscar"
                        />
                        <button
                            type="submit"
                            className="bg-[#D4145A] hover:bg-[#B0124A] text-white font-bold px-5 py-2 rounded-r-md transition-colors"
                        >
                            Buscar
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}
