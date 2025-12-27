"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { plants, Plant } from "../API_Plantas";
import PlantCard from "../CardPlantas";
import CardCategoria from "../CardCategoria";
import { FiSearch, FiArrowLeft, FiFilter } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

function CatalogContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { addToCart } = useCart();

    const categoryParam = searchParams.get("categoria") || "";
    const ocasionParam = searchParams.get("ocasion") || "";

    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [maxPrice, setMaxPrice] = useState(300);
    const [filteredPlants, setFilteredPlants] = useState<Plant[]>(plants);

    // Definición de categorías según el orden y nombres de las imágenes en public/img/img-catalogo
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
        let result = [...plants];

        // Filtrado por texto
        if (query) {
            result = result.filter((p) =>
                p.nombre.toLowerCase().includes(query.toLowerCase()) ||
                p.categoria.toLowerCase().includes(query.toLowerCase())
            );
        } else {
            // Filtrado por categoría o ocasión de la URL
            if (categoryParam) {
                result = result.filter((p) => p.categoria.toLowerCase() === categoryParam.toLowerCase());
            } else if (ocasionParam) {
                result = result.filter((p) =>
                    p.ocasion.some(o => o.toLowerCase() === ocasionParam.toLowerCase()) ||
                    p.categoria.toLowerCase() === ocasionParam.toLowerCase()
                );
            }
        }

        // Filtrado por precio
        result = result.filter((p) => p.precio <= maxPrice);

        // Ordenamiento
        if (sortBy === "price_asc") {
            result.sort((a, b) => a.precio - b.precio);
        } else if (sortBy === "price_desc") {
            result.sort((a, b) => b.precio - a.precio);
        } else if (sortBy === "name_asc") {
            result.sort((a, b) => a.nombre.localeCompare(b.nombre));
        }

        setFilteredPlants(result);
    }, [query, categoryParam, ocasionParam, sortBy, maxPrice]);

    const isFiltered = categoryParam || ocasionParam || query || sortBy !== "default" || maxPrice < 300;

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 ">

                {/* Header Dinámico como Banner */}
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

                {/* Barra de Búsqueda y Filtros */}
                <div className="flex flex-col gap-6 mb-12">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        {isFiltered && (
                            <button
                                onClick={() => {
                                    setQuery("");
                                    setSortBy("default");
                                    setMaxPrice(300);
                                    router.push("/catalogo");
                                }}
                                className="flex items-center gap-2 px-6 py-4 bg-white rounded-2xl shadow-sm text-gray-600 font-bold hover:text-[#D4145A] transition-all border border-gray-100 whitespace-nowrap"
                            >
                                <FiArrowLeft /> Limpiar Filtros
                            </button>
                        )}

                        <div className="relative flex-1 w-full">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                            <input
                                type="text"
                                placeholder="Buscar flores o categorías..."
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-[#FF6F91] outline-none text-gray-700 transition-all font-medium"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>

                        <div className="relative w-full md:w-64">
                            <select
                                className="w-full py-4 px-6 rounded-2xl bg-white border border-gray-100 shadow-sm text-gray-600 font-bold outline-none focus:ring-2 focus:ring-[#FF6F91] appearance-none cursor-pointer"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="default">Ordenar por</option>
                                <option value="price_asc">Precio: Menor a Mayor</option>
                                <option value="price_desc">Precio: Mayor a Menor</option>
                                <option value="name_asc">Nombre: A-Z</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <FiFilter />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 font-black uppercase text-xs tracking-tighter">Precio Máximo</span>
                            <span className="text-[#D4145A] font-black text-lg">S/ {maxPrice}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="300"
                            step="10"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#FF6F91]"
                        />
                    </div>
                </div>

                {/* Contenido Principal */}
                {isFiltered ? (
                    // Vista de Productos
                    filteredPlants.length > 0 ? (
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
                            <FiSearch className="text-[#D4145A] size-12 mx-auto mb-4 opacity-20" />
                            <h3 className="text-xl font-bold text-gray-800">No hay productos en esta selección</h3>
                        </div>
                    )
                ) : (
                    // Vista de Categorías (Listado) usando el nuevo componente CardCategoria
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categoriesData.map((cat) => (
                            <CardCategoria
                                key={cat.name}
                                name={cat.name}
                                image={cat.image}
                                onClick={() => router.push(`/catalogo?categoria=${cat.name}`)}
                            />
                        ))}
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
