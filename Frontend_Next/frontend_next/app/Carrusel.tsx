'use client';

import { useState, useEffect } from 'react';

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
        <div className="relative w-full overflow-hidden" style={{ height: '500px' }}>
            {slides.map((slide, index) => (
                <div key={index} className={`absolute inset-0 transition-opacity duration-700 ${index === current ? 'opacity-100 z-10' : 'opacity-0'}`}>
                    <img src={slide.img} alt={slide.title} className="w-full h-[500px] object-cover" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-black/30">
                        <h5 className="text-2xl font-bold text-white drop-shadow-lg">
                            {slide.title}
                        </h5>
                        <p className="mt-3 max-w-3xl font-semibold text-white drop-shadow-lg">
                            {slide.text}
                        </p>
                    </div>
                </div>
            ))}

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`
              h-3 w-3 rounded-full transition
              ${index === current ? 'bg-white' : 'bg-white/50'}
            `}
                    />
                ))}
            </div>

            {/* Controles */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white hover:bg-black/60"
            >
                ‹
            </button>

            <button
                onClick={next}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white hover:bg-black/60"
            >
                ›
            </button>
        </div>
    );
}
