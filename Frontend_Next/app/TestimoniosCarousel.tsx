"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { fetchHomeData, Testimonial, defaultHomeData } from "../lib/homeDataClient";

export default function TestimoniosCarousel() {
    const [testimonios, setTestimonios] = useState<Testimonial[]>(defaultHomeData.testimonials);
    const [current, setCurrent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);

    const { ref, isVisible } = useScrollReveal();

    // Reset error when slide changes
    useEffect(() => {
        setImageError(false);
    }, [current]);

    useEffect(() => {
        let isMounted = true;
        const fetchTestimonials = async () => {
            try {
                const data = await fetchHomeData();
                if (isMounted && data.testimonials && data.testimonials.length > 0) {
                    setTestimonios(data.testimonials);
                }
            } catch (error) {
                console.error("Unable to load testimonials:", error);
            }
        };
        fetchTestimonials();
        return () => {
            isMounted = false;
        };
    }, []);

    const total = testimonios.length;

    const next = useCallback(() => {
        if (total === 0) return;
        setCurrent((prev) => (prev + 1) % total);
    }, [total]);

    const prev = useCallback(() => {
        if (total === 0) return;
        setCurrent((prev) => (prev - 1 + total) % total);
    }, [total]);

    useEffect(() => {
        if (total <= 1 || isPaused || isDragging) return;
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [next, total, isPaused, isDragging]);

    // mobile-native: Gestos táctiles
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        setIsDragging(true);
        setDragOffset(0);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current === null || touchStartY.current === null) return;
        const diffX = e.touches[0].clientX - touchStartX.current;
        const diffY = e.touches[0].clientY - touchStartY.current;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            setDragOffset(diffX * 0.4);
        }
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        if (dragOffset < -45) next();
        else if (dragOffset > 45) prev();

        setIsDragging(false);
        setDragOffset(0);
        touchStartX.current = null;
        touchStartY.current = null;
    };

    if (total === 0) return null;

    const testimonio = testimonios[current];

    return (
        <section
            ref={ref}
            className={`transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] will-change-transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
            <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="inline-block px-4 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-[#D4145A] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
                    Opiniones Reales
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                    Experiencias que Emocionan
                </h2>
                <p className="text-stone-500 text-sm sm:text-base mt-3 leading-relaxed">
                    La confianza de nuestros clientes es el mayor testimonio de nuestro compromiso floral.
                </p>
            </div>

            <div
                className="relative max-w-3xl mx-auto select-none"
                style={{ touchAction: "pan-y" }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Double-bezel card */}
                <div className="p-2 sm:p-2.5 rounded-[2.5rem] bg-stone-200/50 ring-1 ring-stone-900/5">
                    <div className="relative rounded-[calc(2.5rem-0.6rem)] bg-white p-8 sm:p-12 md:p-14 text-center shadow-sm">
                        {/* Rating stars */}
                        <div className="flex justify-center gap-1.5 mb-6">
                            {Array.from({ length: testimonio.rating }).map((_, i) => (
                                <FiStar key={i} className="text-amber-400 fill-amber-400 text-lg" />
                            ))}
                        </div>

                        {/* Quote text */}
                        <blockquote className="font-editorial text-xl sm:text-2xl md:text-3xl text-stone-800 leading-snug italic mb-8 max-w-xl mx-auto">
                            &ldquo;{testimonio.text}&rdquo;
                        </blockquote>

                        {/* Author info */}
                        <div className="flex items-center justify-center gap-4">
                            {testimonio.avatar_url && !imageError ? (
                                <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-pink-200 relative shrink-0">
                                    <img
                                        src={testimonio.avatar_url}
                                        alt={testimonio.name}
                                        className="object-cover w-full h-full"
                                        onError={() => setImageError(true)}
                                    />
                                </div>
                            ) : (
                                <div className="w-13 h-13 rounded-full bg-gradient-to-br from-pink-400 to-[#D4145A] flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0">
                                    {testimonio.name[0]}
                                </div>
                            )}
                            <div className="text-left">
                                <p className="font-bold text-stone-900 text-sm md:text-base">{testimonio.name}</p>
                                <p className="text-xs text-stone-400 font-medium">{testimonio.role}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Navigation Controls */}
                <button
                    type="button"
                    onClick={prev}
                    aria-label="Testimonio anterior"
                    style={{ touchAction: "manipulation" }}
                    className="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-lg border border-stone-200/60 items-center justify-center text-stone-700 hover:text-[#D4145A] hover:scale-105 active:scale-95 transition-all duration-200"
                >
                    <FiChevronLeft size={20} />
                </button>
                <button
                    type="button"
                    onClick={next}
                    aria-label="Testimonio siguiente"
                    style={{ touchAction: "manipulation" }}
                    className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-lg border border-stone-200/60 items-center justify-center text-stone-700 hover:text-[#D4145A] hover:scale-105 active:scale-95 transition-all duration-200"
                >
                    <FiChevronRight size={20} />
                </button>

                {/* Indicator Dots */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    {testimonios.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setCurrent(i)}
                            aria-label={`Ver testimonio ${i + 1}`}
                            style={{ touchAction: "manipulation" }}
                            className={`h-2 rounded-full transition-all duration-300 ease-[var(--ease-out-expo)] active:scale-90 ${
                                i === current ? "w-8 bg-[#D4145A]" : "w-2 bg-stone-300 hover:bg-stone-400"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
