"use client";

import Image from "next/image";
import { Plant } from "./API_Plantas";

export interface PlantCardProps extends Plant {
    onAddToCart?: () => void;
    showButton?: boolean;
}

const PlantCard = ({
    nombre,
    precio,
    imagen,
    categoria,
    onAddToCart,
    showButton = true,
}: PlantCardProps) => {
    return (
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">

            {/* Contenedor de Imagen con altura fija */}
            <div className="relative h-64 w-full overflow-hidden">
                <Image
                    src={imagen}
                    alt={nombre}
                    width={400}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
            </div>

            {/* Contenido con flex-grow para alinear el botón al final */}
            <div className="p-5 flex flex-col flex-grow text-center">

                <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
                    {nombre}
                </h3>

                {categoria && (
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                        {categoria}
                    </p>
                )}

                <div className="mt-auto">
                    <p className="text-2xl font-black text-[#D4145A] mb-4">
                        S/ {precio.toFixed(2)}
                    </p>

                    {showButton && (
                        <button
                            onClick={onAddToCart}
                            className="w-full bg-[#FF6F91] hover:bg-[#D4145A] text-white font-bold py-3 rounded-xl transition-colors shadow-md hover:shadow-lg active:scale-95"
                        >
                            Añadir al carrito
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlantCard;
