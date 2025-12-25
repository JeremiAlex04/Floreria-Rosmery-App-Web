"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { plants, Plant } from "../API_Plantas";
import PlantCard from "../CardPlantas";
import CardCategoria from "../CardCategoria";
import { FiSearch, FiArrowLeft } from "react-icons/fi";
import { useCart } from "../../context/CartContext";


function CatalogContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { addToCart } = useCart();

    const categoryParam = searchParams.get("categoria") || "";
    const ocasionParam = searchParams.get("ocasion") || "";

    const [query, setQuery] = useState("");
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
        let result = plants;

        if (query) {
            result = result.filter((p) =>
                p.nombre.toLowerCase().includes(query.toLowerCase()) ||
                p.categoria.toLowerCase().includes(query.toLowerCase())
            );
        } else {
            if (categoryParam) {
                result = result.filter((p) => p.categoria.toLowerCase() === categoryParam.toLowerCase());
            } else if (ocasionParam) {
                // Si no hay categoría pero sí ocasión, filtramos por ocasión
                result = result.filter((p) =>
                    p.ocasion.some(o => o.toLowerCase() === ocasionParam.toLowerCase()) ||
                    p.categoria.toLowerCase() === ocasionParam.toLowerCase()
                );
            }
        }

        setFilteredPlants(result);
    }, [query, categoryParam, ocasionParam]);

    const isFiltered = categoryParam || ocasionParam || query;

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 ">

                {/* Header Dinámico como Banner */}
                <div className="mb-12 text-center bg-[url('/img/img-catalogo/BnCatalogo.png')] bg-cover bg-center p-12 md:p-20 rounded-3xl shadow-sm relative overflow-hidden flex flex-col items-center justify-center min-h-[200px]">
                    {/* Overlay suave para legibilidad */}
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>

                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter drop-shadow-sm">
                            {isFiltered ? (categoryParam || ocasionParam || "Resultados") : "Nuestras Categorías"}
                        </h1>
                        <div className="h-1.5 w-24 bg-[#D4145A] mx-auto rounded-full mb-6"></div>
                        {!isFiltered && (
                            <p className="text-gray-700 max-w-2xl mx-auto font-bold italic bg-white/40 backdrop-blur-sm px-4 py-1 rounded-full inline-block">
                                Selecciona una categoría para explorar nuestros arreglos exclusivos.
                            </p>
                        )}
                    </div>
                </div>

                {/* Barra de Búsqueda y Navegación */}
                <div className="flex flex-col md:flex-row gap-4 mb-10 items-center">
                    {isFiltered && (
                        <button
                            onClick={() => {
                                setQuery("");
                                router.push("/catalogo");
                            }}
                            className="flex items-center gap-2 px-6 py-4 bg-white rounded-2xl shadow-sm text-gray-600 font-bold hover:text-[#D4145A] transition-all border border-gray-100"
                        >
                            <FiArrowLeft /> Volver a Categorías
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
        </div >
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
