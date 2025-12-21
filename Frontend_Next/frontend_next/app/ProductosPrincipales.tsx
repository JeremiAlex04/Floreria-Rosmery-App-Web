"use client";

import PlantCard from "./CardPlantas";
import { plants } from "./API_Plantas";

export default function ProductosPrincipales() {
    return (
        <>
            <div className="w-full text-center p-4 rounded-lg shadow-sm text-black bg-[#ffb6c1] bg-[url('/img-catalogo/BnCatalogo.png')] bg-cover bg-center">
                <p className="font-bold text-xl">
                    Productos Populares
                </p>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {plants.map((plant) => (
                    <PlantCard
                        key={plant.id}
                        {...plant}
                        onAddToCart={() => console.log(`Añadido al carrito: ${plant.nombre}`)}
                    />
                ))}
            </section>
        </>
    );
}