"use client";

import { plants } from "@/app/API_Plantas";
import PlantCard from "@/app/CardPlantas";
import { useCart } from "@/context/CartContext";

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
    const query = searchParams.q || "";
    const { addToCart } = useCart();

    // Filtrar plantas por nombre o categoría
    const filteredPlants = plants.filter((plant) =>
        plant.nombre.toLowerCase().includes(query.toLowerCase()) ||
        plant.categoria?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">
                Resultados para: <span className="text-[#D4145A]">"{query}"</span>
            </h1>

            {filteredPlants.length > 0 ? (
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredPlants.map((plant) => (
                        <PlantCard
                            key={plant.id}
                            {...plant}
                            onAddToCart={() => addToCart(plant)}
                        />
                    ))}
                </section>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-500">No encontramos flores que coincidan con tu búsqueda.</p>
                </div>
            )}
        </main>
    );
}