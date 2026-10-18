'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
    const [isPaused, setIsPaused] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);

    const total = slides.length;

    const prev = useCallback(() => {
        setCurrent((curr) => (curr - 1 + total) % total);
    }, [total]);

    const next = useCallback(() => {
        setCurrent((curr) => (curr + 1) % total);
    }, [total]);

    // Autoplay con pausa en interacción
    useEffect(() => {
        if (isPaused || isDragging) return;
        const timer = setInterval(() => {
            next();
        }, 5000);

        return () => clearInterval(timer);
    }, [isPaused, isDragging, next]);

    // mobile-native: Gestos táctiles fluidos con prevención de bloqueo de scroll
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        setIsDragging(true);
        setDragOffset(0);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current === null || touchStartY.current === null) return;
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = currentX - touchStartX.current;
        const diffY = currentY - touchStartY.current;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            const isAtStart = current === 0 && diffX > 0;
            const isAtEnd = current === total - 1 && diffX < 0;
            const resistance = isAtStart || isAtEnd ? 0.35 : 1;
            setDragOffset(diffX * resistance);
        }
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        const threshold = 50;
        if (dragOffset < -threshold) {
            next();
        } else if (dragOffset > threshold) {
            prev();
        }
        setIsDragging(false);
        setDragOffset(0);
        touchStartX.current = null;
        touchStartY.current = null;
    };

    return (
        <section
            role="region"
            aria-roledescription="carousel"
            aria-label="Galería floral destacada"
            className="relative w-full h-[460px] md:h-[540px] overflow-hidden bg-stone-900 select-none"
            style={{ touchAction: 'pan-y' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
        >
            {/* animate skill: Track horizontal acelerado por GPU (transform translate3d) */}
            <div
                className="flex w-full h-full will-change-transform"
                style={{
                    transform: `translate3d(calc(-${current * 100}% + ${dragOffset}px), 0, 0)`,
                    transition: isDragging
                        ? 'none'
                        : 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1)',
                }}
            >
                {slides.map((slide, index) => {
                    const isActive = index === current;
                    return (
                        <div
                            key={index}
                            role="tabpanel"
                            aria-roledescription="slide"
                            aria-label={`${index + 1} de ${total}: ${slide.title}`}
                            aria-hidden={!isActive}
                            className="relative w-full h-full shrink-0 flex-grow-0"
                        >
                            <Image
                                src={slide.img}
                                alt={slide.title}
                                fill
                                priority={index === 0}
                                className={`object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] ${
                                    isActive ? 'scale-100' : 'scale-105'
                                }`}
                                sizes="100vw"
                            />
                            {/* Overlay cinemático */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-black/40 z-20">
                                <h3
                                    className="text-2xl md:text-5xl font-bold text-white drop-shadow-md max-w-3xl transition-[transform,opacity] duration-400 ease-[var(--ease-out-expo)] font-editorial"
                                    style={{
                                        transform: isActive
                                            ? 'translate3d(0, 0, 0)'
                                            : 'translate3d(0, 14px, 0)',
                                        opacity: isActive ? 1 : 0,
                                        transitionDelay: isActive ? '100ms' : '0ms',
                                    }}
                                >
                                    {slide.title}
                                </h3>
                                <p
                                    className="mt-4 max-w-2xl text-white/90 text-sm md:text-lg leading-relaxed drop-shadow px-4 transition-[transform,opacity] duration-400 ease-[var(--ease-out-expo)]"
                                    style={{
                                        transform: isActive
                                            ? 'translate3d(0, 0, 0)'
                                            : 'translate3d(0, 14px, 0)',
                                        opacity: isActive ? 1 : 0,
                                        transitionDelay: isActive ? '180ms' : '0ms',
                                    }}
                                >
                                    {slide.text}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Indicadores de barra y puntos */}
            <div
                role="tablist"
                aria-label="Controles de diapositivas"
                className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 px-3 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/20"
            >
                {slides.map((_, index) => {
                    const isSelected = index === current;
                    return (
                        <button
                            key={index}
                            role="tab"
                            type="button"
                            aria-selected={isSelected}
                            onClick={() => setCurrent(index)}
                            className={`h-2 rounded-full transition-all duration-300 ease-[var(--ease-out-expo)] active:scale-90 ${
                                isSelected
                                    ? 'w-7 bg-[#D4145A]'
                                    : 'w-2 bg-white/40 hover:bg-white/70'
                            }`}
                            style={{ touchAction: 'manipulation' }}
                            aria-label={`Ir a slide ${index + 1}`}
                        />
                    );
                })}
            </div>

            {/* Controles de navegación */}
            <button
                type="button"
                onClick={prev}
                className="hidden sm:flex absolute left-5 top-1/2 z-30 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-md border border-white/20 hover:bg-black/50 hover:scale-105 active:scale-90 transition-[transform,background-color] duration-150 ease-out"
                style={{ touchAction: 'manipulation' }}
                aria-label="Slide anterior"
            >
                <span className="text-xl">‹</span>
            </button>

            <button
                type="button"
                onClick={next}
                className="hidden sm:flex absolute right-5 top-1/2 z-30 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-md border border-white/20 hover:bg-black/50 hover:scale-105 active:scale-90 transition-[transform,background-color] duration-150 ease-out"
                style={{ touchAction: 'manipulation' }}
                aria-label="Slide siguiente"
            >
                <span className="text-xl">›</span>
            </button>
        </section>
    );
}
