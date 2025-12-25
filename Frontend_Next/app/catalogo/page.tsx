"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { plants, Plant } from "../API_Plantas";
import PlantCard from "../CardPlantas";
import { FiSearch, FiFilter } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

function CatalogContent() {
    const searchParams = useSearchParams();
    const { addToCart } = useCart();

    const initialOcasion = searchParams.get("ocasion") || "";
    const [query, setQuery] = useState("");
    const [selectedOcasion, setSelectedOcasion] = useState(initialOcasion);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredPlants, setFilteredPlants] = useState<Plant[]>(plants);

    // Obtener categorías únicas
    const categories = Array.from(new Set(plants.map((p) => p.categoria)));
    const ocasiones = ["amor", "cumpleanos", "aniversario", "condolencias"];

    useEffect(() => {
        let result = plants;

        if (query) {
            result = result.filter((p) =>
                p.nombre.toLowerCase().includes(query.toLowerCase()) ||
                p.categoria.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (selectedOcasion) {
            result = result.filter((p) => p.ocasion.includes(selectedOcasion));
        }

        if (selectedCategory) {
            result = result.filter((p) => p.categoria === selectedCategory);
        }

        setFilteredPlants(result);
    }, [query, selectedOcasion, selectedCategory]);

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header Catálogo */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 uppercase tracking-tighter">
                        Nuestro Catálogo
                    </h1>
                    <div className="h-1.5 w-24 bg-[#D4145A] mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-500 max-w-2xl mx-auto font-medium">
                        Explora nuestra selección exclusiva de flores frescas y arreglos diseñados para cada momento especial de tu vida.
                    </p>
                </div>

                {/* Filtros y Búsqueda */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row gap-6 items-center">
                    <div className="relative flex-1 w-full">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                        <input
                            type="text"
                            placeholder="¿Qué flores buscas hoy?"
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#FF6F91] outline-none text-gray-700 transition-all font-medium"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 w-full md:w-auto">
                        <select
                            className="bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FF6F91] outline-none text-gray-700 font-bold capitalize cursor-pointer"
                            value={selectedOcasion}
                            onChange={(e) => setSelectedOcasion(e.target.value)}
                        >
                            <option value="">Todas las Ocasiones</option>
                            {ocasiones.map((o) => (
                                <option key={o} value={o}>{o.replace("cumpleanos", "cumpleaños")}</option>
                            ))}
                        </select>

                        <select
                            className="bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FF6F91] outline-none text-gray-700 font-bold capitalize cursor-pointer"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Categorías</option>
                            {categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>

                        {(query || selectedOcasion || selectedCategory) && (
                            <button
                                onClick={() => { setQuery(""); setSelectedOcasion(""); setSelectedCategory(""); }}
                                className="text-[#D4145A] font-bold text-sm hover:underline"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                </div>

                {/* Resultados */}
                {filteredPlants.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredPlants.map((plant) => (
                            <PlantCard
                                key={plant.id}
                                {...plant}
                                onAddToCart={() => addToCart(plant)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                        <div className="bg-pink-50 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <FiSearch className="text-[#D4145A] size-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No encontramos resultados</h3>
                        <p className="text-gray-500">Intenta buscando con palabras diferentes o limpiando los filtros.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function CatalogPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#FF6F91] border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <CatalogContent />
        </Suspense>
    );
}
