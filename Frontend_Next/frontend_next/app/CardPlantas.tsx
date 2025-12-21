"use client";

import Image from "next/image";
import { Plant } from "./API_Plantas";

export interface PlantCardProps extends Plant {
    onAddToCart?: () => void;
    showButton?: boolean;
}

//Contenedor de la tarjeta de la planta
//Contenido Inicial
const PlantCard = ({
    nombre,
    precio,
    imagen,
    categoria,
    onAddToCart,
    showButton = true,
}: PlantCardProps) => {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">

            {/* Imagen */}
            <Image
                src={imagen}
                alt={nombre}
                width={400}
                height={500}
                className="w-full h-[300px] object-cover"
            />

            {/* Contenido */}
            <div className="p-4 text-center">

                <h3 className="font-bold text-lg mb-1">
                    {nombre}
                </h3>

                {categoria && (
                    <p className="text-sm text-gray-500 mb-2">
                        {categoria}
                    </p>
                )}

                <p className="text-xl font-bold text-red-600 mb-4">
                    S/ {precio.toFixed(2)}
                </p>

                {showButton && (
                    <button
                        onClick={onAddToCart}
                        className="w-full bg-[#FF6F91] hover:bg-pink-600 text-white font-bold py-2 rounded-lg transition"
                    >
                        Añadir al carrito
                    </button>
                )}

            </div>
        </div>
    );
};

export default PlantCard;
