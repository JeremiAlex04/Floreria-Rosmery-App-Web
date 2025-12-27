"use client";

import PlantCard from "./CardPlantas";
import { plants } from "./API_Plantas";
import { useCart } from "../context/CartContext";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function ProductosPrincipales() {
    const { addToCart } = useCart();
    return (
        <section>
            <div className="text-center mb-12">
                <span className="text-[#D4145A] font-bold tracking-wider uppercase text-sm">Favoritos del mes</span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-2 mb-4 tracking-tight">
                    Productos Populares
                </h2>
                <div className="h-1.5 w-24 bg-[#D4145A] mx-auto rounded-full"></div>
                <p className="max-w-2xl mx-auto mt-4 text-gray-500 text-lg">
                    Descubre los arreglos que están enamorando a nuestros clientes.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {plants.filter(p => p.popular).map((plant) => (
                    <PlantCard key={plant.id} {...plant} onAddToCart={() => addToCart(plant)} />
                ))}
            </div>

            <div className="text-center mt-12">
                <Link
                    href="/catalogo"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-[#D4145A] text-[#D4145A] font-bold rounded-full hover:bg-[#D4145A] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg uppercase tracking-wider text-sm"
                >
                    Ver Catálogo Completo <FiArrowRight />
                </Link>
            </div>
        </section>
    );
}