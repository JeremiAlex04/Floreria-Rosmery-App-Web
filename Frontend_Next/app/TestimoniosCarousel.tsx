"use client";

import { useState, useEffect, useCallback } from "react";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { fetchHomeData, Testimonial } from "../lib/homeDataClient";

const fallbackTestimonials: Testimonial[] = [];

export default function TestimoniosCarousel() {
    const [testimonios, setTestimonios] = useState<Testimonial[]>(fallbackTestimonials);
    const [current, setCurrent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const { ref, isVisible } = useScrollReveal();

    // Reset error when slide changes
    useEffect(() => {
        setImageError(false);
    }, [current]);

    // Fetch from Neon API
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const data = await fetchHomeData();
                if (data.testimonials.length > 0) {
                    setTestimonios(data.testimonials);
                }
            } catch (error) {
                console.error("Unable to load testimonials from Neon:", error);
            }
        };
        fetchTestimonials();
    }, []);

    const next = useCallback(
        () => setCurrent((prev) => (prev + 1) % testimonios.length),
        [testimonios.length]
    );
    const prev = () => setCurrent((current - 1 + testimonios.length) % testimonios.length);

    useEffect(() => {
        if (testimonios.length === 0) return;
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next, testimonios.length]);

    if (testimonios.length === 0) return null;

    const testimonio = testimonios[current];

    return (
        <section
            ref={ref}
            className={`py-12 transition-[opacity,transform] duration-400 ease-[var(--ease-out-expo)] will-change-transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
            <div className="text-center mb-12">
                <span className="text-[#D4145A] font-bold tracking-wider uppercase text-sm">Clientes Felices</span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-2 mb-4 tracking-tight">
                    Lo que dicen de nosotros
                </h2>
                <div className="h-1.5 w-24 bg-[#D4145A] mx-auto rounded-full" />
            </div>

            <div className="relative max-w-3xl mx-auto">
                {/* Card */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 md:p-12 text-center">
                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-6">
                        {Array.from({ length: testimonio.rating }).map((_, i) => (
                            <FiStar key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                        ))}
                    </div>

                    {/* Quote */}
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed italic mb-8 max-w-xl mx-auto">
                        &ldquo;{testimonio.text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-4">
                        {testimonio.avatar_url && !imageError ? (
                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-pink-100 relative">
                                <img
                                    src={testimonio.avatar_url}
                                    alt={testimonio.name}
                                    className="object-cover w-full h-full"
                                    onError={() => setImageError(true)}
                                />
                            </div>
                        ) : (
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">
                                    {testimonio.name[0]}
                                </span>
                            </div>
                        )}
                        <div className="text-left">
                            <p className="font-bold text-gray-800">{testimonio.name}</p>
                            <p className="text-sm text-gray-400">{testimonio.role}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <button
                    onClick={prev}
                    aria-label="Testimonio anterior"
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#D4145A] transition-[color,transform] duration-150 ease-out active:scale-[0.95]"
                >
                    <FiChevronLeft size={18} />
                </button>
                <button
                    onClick={next}
                    aria-label="Testimonio siguiente"
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#D4145A] transition-[color,transform] duration-150 ease-out active:scale-[0.95]"
                >
                    <FiChevronRight size={18} />
                </button>

                {/* Dots: scale-x avoids layout recalculations */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonios.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            aria-label={`Ver testimonio ${i + 1}`}
                            className={`h-2 w-6 rounded-full origin-center transition-[transform,background-color] duration-250 ease-out ${i === current ? "scale-x-100 bg-[#D4145A]" : "scale-x-[0.35] bg-gray-200 hover:bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
