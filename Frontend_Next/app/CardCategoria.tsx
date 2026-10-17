"use client";

import Image from "next/image";

interface CardCategoriaProps {
    name: string;
    image: string;
    onClick: () => void;
}

export default function CardCategoria({ name, image, onClick }: CardCategoriaProps) {
    return (
        <button
            onClick={onClick}
            className="group relative h-80 w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-[box-shadow,transform] duration-300 ease-out active:scale-[0.98]"
        >
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0 will-change-transform"
            />
            {/* Overlay gradiente para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <div className="absolute bottom-8 left-8 text-left">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                    {name}
                </h3>
                {/* Indicador visual de interacción: scale-x en vez de width para evitar Layout */}
                <div className="w-24 h-1 bg-[#FF6F91] origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-200 ease-out"></div>
                <p className="text-white/80 mt-4 text-sm font-bold uppercase tracking-widest opacity-0 translate-y-3 transition-[opacity,transform] duration-200 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                    Explorar Colección
                </p>
            </div>
        </button>
    );
}
