"use client";

import Image from "next/image";
import { FiShoppingBag } from "react-icons/fi";
import { Plant } from "./API_Plantas";

export interface PlantCardProps extends Plant {
    onAddToCart?: () => void;
    showButton?: boolean;
}

export default function PlantCard({
    nombre,
    precio,
    imagen,
    categoria,
    onAddToCart,
    showButton = true,
}: PlantCardProps) {
    return (
        /* Double-bezel outer shell (high-end-visual-design skill) */
        <div className="group relative p-2 rounded-[2rem] bg-stone-200/50 hover:bg-pink-100/40 ring-1 ring-stone-900/5 hover:ring-pink-300/40 transition-all duration-300 ease-[var(--ease-out-expo)] flex flex-col h-full select-none">
            {/* Inner core */}
            <div className="relative rounded-[calc(2rem-0.5rem)] bg-white overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] group-hover:shadow-[0_16px_36px_-6px_rgba(212,20,90,0.12)] transition-all duration-300 ease-[var(--ease-out-expo)] flex flex-col flex-grow">
                {/* Image container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-100">
                    <Image
                        src={imagen}
                        alt={nombre}
                        width={400}
                        height={500}
                        className="w-full h-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105 will-change-transform"
                    />

                    {/* Gradient highlight on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Category micro-badge */}
                    {categoria && (
                        <div className="absolute top-3.5 left-3.5 z-10">
                            <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase text-stone-800 shadow-sm border border-white/50">
                                {categoria}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content block */}
                <div className="p-5 flex flex-col flex-grow text-left justify-between">
                    <div>
                        <h3 className="font-editorial text-lg md:text-xl font-bold text-stone-800 group-hover:text-[#D4145A] transition-colors duration-200 line-clamp-2 min-h-[3.2rem] leading-snug">
                            {nombre}
                        </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                                Precio
                            </span>
                            <span className="text-xl md:text-2xl font-black text-stone-900 tracking-tight tabular-nums">
                                S/ {precio.toFixed(2)}
                            </span>
                        </div>

                        {showButton && (
                            /* Button-in-button nested CTA (high-end-visual-design) */
                            <button
                                type="button"
                                onClick={onAddToCart}
                                style={{ touchAction: "manipulation" }}
                                aria-label={`Añadir ${nombre} al carrito`}
                                className="group/btn inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 bg-stone-900 hover:bg-[#D4145A] text-white text-xs font-semibold rounded-full shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 ease-[var(--ease-out-expo)]"
                            >
                                <span className="hidden sm:inline">Añadir</span>
                                <span className="w-8 h-8 rounded-full bg-white/15 group-hover/btn:bg-white/25 flex items-center justify-center transition-colors">
                                    <FiShoppingBag className="text-sm" />
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
