"use client";

import PlantCard from "./CardPlantas";
import { plants } from "./API_Plantas";
import { useCart } from "../context/CartContext";

export default function ProductosPrincipales() {
    const { addToCart } = useCart();
    return (
        <>
            <div className="w-full p-8 rounded-2xl shadow-sm text-black bg-[#ffb6c1] bg-[url('/img/img-catalogo/BnCatalogo.png')] bg-cover bg-center mb-8 min-h-[160px] flex items-center justify-end">
                <div className="pr-12 md:pr-24 lg:pr-32 max-w-xl text-right">
                    <p className="font-black text-3xl md:text-4xl uppercase tracking-tighter text-black drop-shadow-sm">
                        Productos Populares
                    </p>
                    <div className="h-1 w-20 bg-[#D4145A] ml-auto mt-2 rounded-full"></div>
                </div>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {plants.map((plant) => (
                    <PlantCard key={plant.id} {...plant} onAddToCart={() => addToCart(plant)} />
                ))}
            </section>

           
        </>
    );
}