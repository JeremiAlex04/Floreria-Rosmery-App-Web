"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { fetchHomeData, HeroSlide, defaultHomeData } from "../lib/homeDataClient";

export default function HeroSection() {
    const [slides, setSlides] = useState<HeroSlide[]>(defaultHomeData.heroSlides);
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [timerKey, setTimerKey] = useState(0);

    const pointerStartX = useRef<number | null>(null);
    const pointerStartY = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Fetch dynamic slides from API/Neon
    useEffect(() => {
        let isMounted = true;
        const loadSlides = async () => {
            try {
                const data = await fetchHomeData();
                if (isMounted && data.heroSlides && data.heroSlides.length > 0) {
                    setSlides(data.heroSlides);
                }
            } catch (error) {
                console.error("Unable to load hero slides:", error);
            }
        };
        loadSlides();
        return () => {
            isMounted = false;
        };
    }, []);

    const slideCount = slides.length;

    const nextSlide = useCallback(() => {
        if (slideCount === 0) return;
        setCurrent((prev) => (prev + 1) % slideCount);
        setTimerKey((k) => k + 1);
    }, [slideCount]);

    const prevSlide = useCallback(() => {
        if (slideCount === 0) return;
        setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
        setTimerKey((k) => k + 1);
    }, [slideCount]);

    const goToSlide = (index: number) => {
        if (index === current) return;
        setCurrent(index);
        setTimerKey((k) => k + 1);
    };

    // Autoplay continuo con pausa inteligente en hover o arrastre (animate skill: 5500ms)
    useEffect(() => {
        if (slideCount <= 1 || isPaused || isDragging) return;
        const timer = setInterval(() => {
            nextSlide();
        }, 5500);
        return () => clearInterval(timer);
    }, [slideCount, isPaused, isDragging, nextSlide]);

    // Navegación por teclado (Flecha izquierda / derecha)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowLeft") {
            prevSlide();
        } else if (e.key === "ArrowRight") {
            nextSlide();
        }
    };

    // animate + mobile-native: Arrastre unificado con Pointer Events (Mouse + Touch)
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest("a, button")) return;
        pointerStartX.current = e.clientX;
        pointerStartY.current = e.clientY;
        setIsDragging(true);
        setDragOffset(0);
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging || pointerStartX.current === null || pointerStartY.current === null) return;
        const diffX = e.clientX - pointerStartX.current;
        const diffY = e.clientY - pointerStartY.current;

        // Si el desplazamiento horizontal predomina, se acompaña el gesto
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Resistencia elástica en extremos
            const isAtStart = current === 0 && diffX > 0;
            const isAtEnd = current === slideCount - 1 && diffX < 0;
            const resistance = isAtStart || isAtEnd ? 0.35 : 1;
            setDragOffset(diffX * resistance);
        }
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        const threshold = 50; // Umbral de píxeles para cambio con inercia
        if (dragOffset < -threshold) {
            nextSlide();
        } else if (dragOffset > threshold) {
            prevSlide();
        }
        setIsDragging(false);
        setDragOffset(0);
        pointerStartX.current = null;
        pointerStartY.current = null;
        try {
            (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {
            // Silenciar si ya fue liberado
        }
    };

    if (slideCount === 0) return null;

    return (
        <section
            ref={containerRef}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Colecciones destacadas de Florería Rosmery"
            className="relative w-full h-[85svh] min-h-[520px] max-h-[820px] overflow-hidden select-none bg-stone-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4145A]"
            style={{ touchAction: "pan-y" }}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
        >
            {/* Pista de diapositivas acelerada en GPU (animate skill: transform translate3d) */}
            <div
                className="flex w-full h-full will-change-transform"
                style={{
                    transform: `translate3d(calc(-${current * 100}% + ${dragOffset}px), 0, 0)`,
                    transition: isDragging
                        ? "none"
                        : "transform 480ms cubic-bezier(0.23, 1, 0.32, 1)",
                }}
            >
                {slides.map((s, i) => {
                    const isActive = i === current;
                    return (
                        <div
                            key={s.id || i}
                            role="tabpanel"
                            aria-roledescription="slide"
                            aria-label={`${i + 1} de ${slideCount}: ${s.title}`}
                            aria-hidden={!isActive}
                            className="relative w-full h-full shrink-0 flex-grow-0 overflow-hidden"
                        >
                            {/* Imagen de fondo con zoom cinemático activo (Ken Burns suave) */}
                            <Image
                                src={s.image_url}
                                alt={s.title}
                                fill
                                priority={i === 0}
                                className={`object-cover transform transition-transform duration-[6000ms] ease-[var(--ease-cinematic)] will-change-transform ${
                                    isActive ? "scale-105" : "scale-100"
                                }`}
                                sizes="100vw"
                            />

                            {/* Gradiente cinemático de fondo para legibilidad tipográfica */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20 z-10" />

                            {/* Contenido con microanimación escalonada (animate skill) */}
                            <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-center">
                                <div className="max-w-xl text-left">
                                    {/* 1. Eyebrow badge (0ms delay) */}
                                    <div
                                        className="transition-[transform,opacity] duration-400 ease-[var(--ease-out-expo)]"
                                        style={{
                                            transform: isActive
                                                ? "translate3d(0, 0, 0)"
                                                : "translate3d(0, 14px, 0)",
                                            opacity: isActive ? 1 : 0,
                                            transitionDelay: isActive ? "60ms" : "0ms",
                                        }}
                                    >
                                        <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/25 rounded-full text-white text-xs font-semibold tracking-widest uppercase mb-5">
                                            {s.subtitle}
                                        </span>
                                    </div>

                                    {/* 2. Título principal (70ms delay) */}
                                    <h1
                                        className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-5 tracking-tight transition-[transform,opacity] duration-400 ease-[var(--ease-out-expo)]"
                                        style={{
                                            transform: isActive
                                                ? "translate3d(0, 0, 0)"
                                                : "translate3d(0, 18px, 0)",
                                            opacity: isActive ? 1 : 0,
                                            transitionDelay: isActive ? "130ms" : "0ms",
                                        }}
                                    >
                                        {s.title}
                                    </h1>

                                    {/* 3. Descripción (140ms delay) */}
                                    <p
                                        className="text-white/85 text-base sm:text-lg leading-relaxed mb-8 max-w-md transition-[transform,opacity] duration-400 ease-[var(--ease-out-expo)]"
                                        style={{
                                            transform: isActive
                                                ? "translate3d(0, 0, 0)"
                                                : "translate3d(0, 18px, 0)",
                                            opacity: isActive ? 1 : 0,
                                            transitionDelay: isActive ? "200ms" : "0ms",
                                        }}
                                    >
                                        {s.description}
                                    </p>

                                    {/* 4. Botones de acción (210ms delay) */}
                                    <div
                                        className="flex flex-wrap items-center gap-4 transition-[transform,opacity] duration-400 ease-[var(--ease-out-expo)]"
                                        style={{
                                            transform: isActive
                                                ? "translate3d(0, 0, 0)"
                                                : "translate3d(0, 18px, 0)",
                                            opacity: isActive ? 1 : 0,
                                            transitionDelay: isActive ? "270ms" : "0ms",
                                        }}
                                    >
                                        <Link
                                            href={s.cta_link || "/catalogo"}
                                            style={{ touchAction: "manipulation" }}
                                            className="group/btn inline-flex items-center gap-3 pl-7 pr-2.5 py-2.5 bg-[#D4145A] hover:bg-[#B0124A] text-white font-semibold rounded-full shadow-lg shadow-pink-900/30 hover:shadow-xl active:scale-95 transition-all duration-200 ease-[var(--ease-out-expo)] text-sm tracking-wide"
                                        >
                                            <span>{s.cta_text || "Ver Catálogo"}</span>
                                            <span className="w-8 h-8 rounded-full bg-white/20 group-hover/btn:bg-white/30 flex items-center justify-center transition-colors">
                                                <FiArrowRight className="text-sm group-hover/btn:translate-x-0.5 transition-transform" />
                                            </span>
                                        </Link>

                                        <Link
                                            href="#contacto"
                                            style={{ touchAction: "manipulation" }}
                                            className="inline-flex items-center px-7 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full hover:bg-white/20 active:scale-95 transition-all duration-200 ease-[var(--ease-out-expo)] text-sm tracking-wide"
                                        >
                                            Contactar
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Flechas de navegación con microinteracción física al hacer click */}
            <button
                type="button"
                onClick={prevSlide}
                aria-label="Slide anterior"
                style={{ touchAction: "manipulation" }}
                className="hidden sm:flex absolute left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/20 items-center justify-center text-white hover:bg-black/55 hover:scale-105 active:scale-90 transition-all duration-150 ease-out"
            >
                <FiChevronLeft size={22} />
            </button>

            <button
                type="button"
                onClick={nextSlide}
                aria-label="Slide siguiente"
                style={{ touchAction: "manipulation" }}
                className="hidden sm:flex absolute right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/20 items-center justify-center text-white hover:bg-black/55 hover:scale-105 active:scale-90 transition-all duration-150 ease-out"
            >
                <FiChevronRight size={22} />
            </button>

            {/* Indicadores con barra de progreso continua en el slide activo (animate skill) */}
            <div
                role="tablist"
                aria-label="Diapositivas del carrusel"
                className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-black/35 backdrop-blur-md border border-white/15"
            >
                {slides.map((_, i) => {
                    const isSelected = i === current;
                    return (
                        <button
                            key={i}
                            role="tab"
                            type="button"
                            aria-selected={isSelected}
                            aria-label={`Ir al slide ${i + 1}`}
                            onClick={() => goToSlide(i)}
                            style={{ touchAction: "manipulation" }}
                            className={`h-2 rounded-full overflow-hidden transition-all duration-300 ease-[var(--ease-out-expo)] active:scale-90 relative ${
                                isSelected
                                    ? "w-12 bg-white/20"
                                    : "w-2.5 bg-white/40 hover:bg-white/70"
                            }`}
                        >
                            {/* Barra de progreso visual que se llena con linear timing durante los 5.5s */}
                            {isSelected && (
                                <span
                                    key={timerKey}
                                    className={`absolute inset-0 bg-[#D4145A] carousel-progress-bar ${
                                        isPaused || isDragging ? "carousel-progress-paused" : ""
                                    }`}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Sombra de transición inferior suave hacia la siguiente sección */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAFAF8] to-transparent z-20" />
        </section>
    );
}
