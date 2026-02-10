"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { plants, Plant } from "../API_Plantas";
import PlantCard from "../CardPlantas";
import CardCategoria from "../CardCategoria";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { supabase } from "../../lib/supabase";

function CatalogContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { addToCart } = useCart();

    const categoryParam = searchParams.get("categoria") || "";
    const ocasionParam = searchParams.get("ocasion") || "";

    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [maxPrice, setMaxPrice] = useState(300);
    const [allPlants, setAllPlants] = useState<Plant[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(true);

    const categoriesData = [
        { name: "Aniversario", image: "/img/img-catalogo/C-Aniversario.jpg" },
        { name: "Arreglos en Caja", image: "/img/img-catalogo/C-Arregloscaja.jpg" },
        { name: "Bodas", image: "/img/img-catalogo/C-Bodas.jpg" },
        { name: "Centros de Mesa", image: "/img/img-catalogo/C-Centrosdemesa.jpg" },
        { name: "Condolencias", image: "/img/img-catalogo/C-Condolencias.jpg" },
        { name: "Cumpleaños", image: "/img/img-catalogo/C-Cumpleaños.jpg" },
        { name: "Día del Padre", image: "/img/img-catalogo/C-DiadelPadre.jpg" },
        { name: "Día de la Madre", image: "/img/img-catalogo/C-DiadelaMadre.jpg" },
        { name: "Girasoles", image: "/img/img-catalogo/C-Girasoles.jpg" },
        { name: "Graduaciones", image: "/img/img-catalogo/C-Graduaciones.jpg" },
        { name: "Orquídeas", image: "/img/img-catalogo/C-Orquideas.jpg" },
        { name: "Ramos de Mano", image: "/img/img-catalogo/C-Ramosdemano.jpg" },
        { name: "Ramos Premium", image: "/img/img-catalogo/C-Ramospremium.jpg" },
        { name: "Rosas", image: "/img/img-catalogo/C-Rosas.jpg" },
        { name: "San Valentín", image: "/img/img-catalogo/C-Sanvalentin.jpg" },
        { name: "Tulipanes", image: "/img/img-catalogo/C-Tulipanes.jpg" },
    ];

    useEffect(() => {
        const fetchAll = async () => {
            const { data, error } = await supabase.from("products").select("*");
            if (!error && data) {
                setAllPlants(data as any);
            } else {
                setAllPlants([]);
            }
            setLoading(false);
        };
        fetchAll();
    }, []);

    useEffect(() => {
        let result = [...allPlants];

        if (query) {
            result = result.filter((p) =>
                p.nombre.toLowerCase().includes(query.toLowerCase()) ||
                p.categoria.toLowerCase().includes(query.toLowerCase())
            );
        } else {
            if (categoryParam) {
                result = result.filter((p) => p.categoria.toLowerCase() === categoryParam.toLowerCase());
            } else if (ocasionParam) {
                result = result.filter((p) =>
                    p.ocasion.some(o => o.toLowerCase() === ocasionParam.toLowerCase()) ||
                    p.categoria.toLowerCase() === ocasionParam.toLowerCase()
                );
            }
        }

        result = result.filter((p) => p.precio <= maxPrice);

        if (sortBy === "price_asc") {
            result.sort((a, b) => a.precio - b.precio);
        } else if (sortBy === "price_desc") {
            result.sort((a, b) => b.precio - a.precio);
        } else if (sortBy === "name_asc") {
            result.sort((a, b) => a.nombre.localeCompare(b.nombre));
        }

        setFilteredPlants(result);
    }, [query, categoryParam, ocasionParam, sortBy, maxPrice, allPlants]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#D4145A] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const isFiltered = categoryParam || ocasionParam || query || sortBy !== "default" || maxPrice < 300;

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* Banner */}
                <div className="mb-12 text-center bg-[url('/img/img-catalogo/BnCatalogo.png')] bg-cover bg-center p-8 md:p-20 rounded-3xl shadow-sm relative overflow-hidden flex flex-col items-center justify-center min-h-[200px]">
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter drop-shadow-sm">
                            {isFiltered ? (categoryParam || ocasionParam || "Resultados") : "Nuestras Categorías"}
                        </h1>
                        <div className="h-1.5 w-24 bg-[#D4145A] mx-auto rounded-full mb-6"></div>
                        {!isFiltered && (
                            <p className="text-gray-700 max-w-2xl mx-auto font-bold italic bg-white/40 backdrop-blur-sm px-4 py-1 rounded-full inline-block">
                                Selecciona una categoría para explorar nuestros arreglos exclusivos.
                            </p>
                        )}
                        {isFiltered && (
                            <p className="text-gray-600 font-bold bg-white/60 px-4 py-1 rounded-full inline-block text-sm uppercase tracking-widest">
                                {filteredPlants.length} Arreglos encontrados
                            </p>
                        )}
                    </div>
                </div>

                {/* Buscador */}
                <div className="flex flex-col gap-8 mb-16">
                    <div className="relative max-w-3xl mx-auto w-full group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6F91] to-[#D4145A] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative flex items-center bg-white rounded-2xl shadow-xl overflow-hidden ring-1 ring-gray-100">
                            <div className="pl-6 text-[#D4145A]"><FiSearch size={24} /></div>
                            <input
                                type="text"
                                placeholder="¿Qué estás buscando hoy?"
                                className="w-full py-5 px-4 text-lg outline-none text-gray-700 font-medium bg-transparent"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {query && (
                                <button onClick={() => setQuery("")} className="p-2 mr-2 text-gray-400 hover:text-[#D4145A]"><FiX size={20} /></button>
                            )}
                        </div>
                    </div>

                    {/* Chips */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => { router.push("/catalogo"); setQuery(""); }}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${!categoryParam && !query ? "bg-[#D4145A] text-white" : "bg-white text-gray-600"}`}
                        >
                            Todas
                        </button>
                        {categoriesData.slice(0, 7).map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => { router.push(`/catalogo?categoria=${cat.name}`); setQuery(""); }}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${categoryParam === cat.name ? "bg-[#D4145A] text-white" : "bg-white text-gray-600"}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Filtros */}
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <span className="text-gray-400 text-xs font-bold uppercase">Ordenar:</span>
                            <select
                                className="w-full sm:w-64 py-3 px-5 rounded-xl bg-gray-50 border-none text-gray-700 font-bold outline-none ring-1 ring-gray-100"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="default">Relevancia</option>
                                <option value="price_asc">Precio: Menor a Mayor</option>
                                <option value="price_desc">Precio: Mayor a Menor</option>
                                <option value="name_asc">Nombre: A-Z</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className="flex-1 md:w-64">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-400 text-xs font-bold">Precio Máx:</span>
                                    <span className="text-[#D4145A] font-black">S/ {maxPrice}</span>
                                </div>
                                <input
                                    type="range" min="0" max="300" step="10"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#D4145A]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {isFiltered ? (
                    filteredPlants.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredPlants.map((plant) => (
                                <PlantCard key={plant.id} {...plant} onAddToCart={() => addToCart(plant)} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                            <FiSearch className="text-[#D4145A] size-12 mx-auto mb-4 opacity-20" />
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No encontramos resultados</h3>
                            <button onClick={() => { setQuery(""); setSortBy("default"); setMaxPrice(300); router.push("/catalogo"); }} className="px-6 py-3 bg-[#D4145A] text-white rounded-xl font-bold">Ver Todo</button>
                        </div>
                    )
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categoriesData.map((cat) => (
                            <CardCategoria key={cat.name} name={cat.name} image={cat.image} onClick={() => router.push(`/catalogo?categoria=${cat.name}`)} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function CatalogPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center spinner"></div>}>
            <CatalogContent />
        </Suspense>
    );
}
