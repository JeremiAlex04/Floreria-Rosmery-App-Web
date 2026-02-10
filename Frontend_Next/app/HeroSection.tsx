"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { supabase } from "../lib/supabase";

interface HeroSlide {
    id: number;
    subtitle: string;
    title: string;
    description: string;
    cta_text: string;
    cta_link: string;
    image_url: string;
}

const fallbackSlides: HeroSlide[] = [];

export default function HeroSection() {
    const [slides, setSlides] = useState<HeroSlide[]>(fallbackSlides);
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);

    // Fetch slides from Supabase
    useEffect(() => {
        const fetchSlides = async () => {
            const { data, error } = await supabase
                .from("hero_slides")
                .select("*")
                .eq("active", true)
                .order("order", { ascending: true });

            if (!error && data && data.length > 0) {
                setSlides(data);
            }
        };
        fetchSlides();
    }, []);

    const goTo = (index: number) => {
        setIsAnimating(false);
        setTimeout(() => {
            setCurrent(index);
            setIsAnimating(true);
        }, 50);
    };

    const prev = () => goTo((current - 1 + slides.length) % slides.length);
    const next = () => goTo((current + 1) % slides.length);

    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => next(), 6000);
        return () => clearInterval(timer);
    }, [current, slides.length]);

    if (slides.length === 0) return null;

    const slide = slides[current];

    return (
        <section className="relative w-full h-[85vh] min-h-[550px] max-h-[800px] overflow-hidden">
            {/* Background Images */}
            {slides.map((s, i) => (
                <div
                    key={s.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
                >
                    <Image
                        src={s.image_url}
                        alt={s.title}
                        fill
                        priority={i === 0}
                        className="object-cover"
                        sizes="100vw"
                    />
                </div>
            ))}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />

            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="max-w-xl">
                        <span
                            className={`inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-bold tracking-widest uppercase mb-6 transition-all duration-700 ${isAnimating ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                        >
                            {slide.subtitle}
                        </span>

                        <h1
                            className={`text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 transition-all duration-700 delay-100 ${isAnimating ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                                }`}
                        >
                            {slide.title}
                        </h1>

                        <p
                            className={`text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-md transition-all duration-700 delay-200 ${isAnimating ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                                }`}
                        >
                            {slide.description}
                        </p>

                        <div
                            className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${isAnimating ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                                }`}
                        >
                            <Link
                                href={slide.cta_link}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4145A] text-white font-bold rounded-full hover:bg-[#B0124A] transition-all shadow-xl shadow-pink-900/30 hover:shadow-2xl hover:scale-105 active:scale-95 text-sm uppercase tracking-wider"
                            >
                                {slide.cta_text} <FiArrowRight />
                            </Link>
                            <Link
                                href="#contacto"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-all text-sm uppercase tracking-wider"
                            >
                                Contactar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <button
                onClick={prev}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
                <FiChevronLeft size={20} />
            </button>
            <button
                onClick={next}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
                <FiChevronRight size={20} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-10 bg-[#D4145A]" : "w-4 bg-white/40 hover:bg-white/60"
                            }`}
                    />
                ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50/30 to-transparent z-20" />
        </section>
    );
}
