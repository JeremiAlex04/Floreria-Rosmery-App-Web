'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
    {
        img: '/img/img-carrusel/foto1.jpg',
        title: 'Armonía floral en tonos suaves y vibrantes',
        text: 'Un delicado arreglo de rosas, hortensias y claveles en colores pastel y amarillos intensos, que transmiten frescura, alegría y elegancia natural.',
    },
    {
        img: '/img/img-carrusel/foto2.jpg',
        title: 'Lirio Blanco',
        text: 'Flores blancas de lirio, elegantes y puras, ideales para eventos formales.',
    },
    {
        img: '/img/img-carrusel/foto3.jpg',
        title: 'Retama',
        text: 'Flores amarillas de retama, vivaces y alegres, perfectas para transmitir energía.',
    },
];

export default function Carousel() {
    const [current, setCurrent] = useState(0);

    const prev = () =>
        setCurrent((current - 1 + slides.length) % slides.length);

    const next = () =>
        setCurrent((current + 1) % slides.length);

    useEffect(() => {
        const timer = setInterval(() => {
            next();
        }, 5000); // Cambia cada 5 segundos

        return () => clearInterval(timer);
    }, [current]);

    return (
        <div className="relative w-full h-[500px] overflow-hidden bg-gray-100">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <Image
                        src={slide.img}
                        alt={slide.title}
                        fill
                        priority={index === 0} // Precargar la primera imagen siempre
                        className="object-cover"
                        sizes="100vw"
                    />
                    {/* Overlay para texto */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-black/30 z-20">
                        <h5 className="text-xl md:text-4xl font-bold text-white drop-shadow-lg transform transition-all duration-700 delay-300 translate-y-0 opacity-100">
                            {slide.title}
                        </h5>
                        <p className="mt-4 max-w-3xl font-semibold text-white text-sm md:text-lg drop-shadow-lg transform transition-all duration-700 delay-500 translate-y-0 opacity-100 px-4">
                            {slide.text}
                        </p>
                    </div>
                </div>
            ))}

            {/* Indicadores */}
            <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`
                            h-3 w-3 rounded-full transition-all duration-300
                            ${index === current ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'}
                        `}
                        aria-label={`Ir a slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Controles */}
            <button
                onClick={prev}
                className="absolute left-6 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/20 p-4 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:scale-110 active:scale-95"
                aria-label="Anterior"
            >
                <span className="text-2xl">‹</span>
            </button>

            <button
                onClick={next}
                className="absolute right-6 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/20 p-4 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:scale-110 active:scale-95"
                aria-label="Siguiente"
            >
                <span className="text-2xl">›</span>
            </button>
        </div>
    );
}
