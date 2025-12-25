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
            className="group relative h-80 w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
        >
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
            />
            {/* Overlay gradiente para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <div className="absolute bottom-8 left-8 text-left">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                    {name}
                </h3>
                {/* Indicador visual de interacción */}
                <div className="w-12 h-1 bg-[#FF6F91] transition-all duration-300 group-hover:w-24"></div>
                <p className="text-white/80 mt-4 text-sm font-bold uppercase tracking-widest opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Explorar Colección
                </p>
            </div>
        </button>
    );
}
