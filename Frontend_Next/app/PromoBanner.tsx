"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiClock, FiArrowRight } from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { supabase } from "../lib/supabase";

interface Promotion {
    id: number;
    title: string;
    description: string;
    image_url: string;
    original_price: number;
    sale_price: number;
    discount_percent: number;
    cta_link: string;
    expires_at: string | null;
}

const fallbackPromo: Promotion | null = null;

export default function PromoBanner() {
    const { ref, isVisible } = useScrollReveal();
    const [promo, setPromo] = useState<Promotion | null>(null);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    // Fetch active promotion from Supabase
    useEffect(() => {
        const fetchPromo = async () => {
            const { data, error } = await supabase
                .from("promotions")
                .select("*")
                .eq("active", true)
                .order("created_at", { ascending: false })
                .limit(1)
                .single();

            if (!error && data) {
                setPromo(data);
            }
        };
        fetchPromo();
    }, []);

    // Countdown timer
    useEffect(() => {
        if (!promo) return;
        const updateTimer = () => {
            const now = new Date();
            const end = promo.expires_at ? new Date(promo.expires_at) : new Date();
            if (!promo.expires_at) {
                end.setHours(23, 59, 59, 999);
            }
            const diff = Math.max(0, end.getTime() - now.getTime());
            setTimeLeft({
                hours: Math.floor(diff / (1000 * 60 * 60)),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        };
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [promo]);

    if (!promo) return null;

    return (
        <section ref={ref} className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#D4145A] via-[#FF6F91] to-[#FF9EB5] p-8 md:p-12">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-white rounded-full" />
                    <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white rounded-full" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    {/* Image */}
                    <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-3xl overflow-hidden shadow-2xl shadow-pink-900/30 flex-shrink-0 border-4 border-white/20">
                        <Image
                            src={promo.image_url}
                            alt={promo.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="text-center md:text-left flex-1">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
                            <FiClock className="text-white" size={14} />
                            <span className="text-white text-xs font-bold uppercase tracking-wider">Oferta del Día</span>
                        </div>

                        <h3 className="text-2xl md:text-4xl font-black text-white mb-3 leading-tight">
                            {promo.title}
                        </h3>
                        <p className="text-white/80 mb-6 max-w-md">
                            {promo.description}
                        </p>

                        {/* Price */}
                        <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
                            <span className="text-white/50 line-through text-xl font-bold">S/ {promo.original_price.toFixed(2)}</span>
                            <span className="text-white text-4xl font-black">S/ {promo.sale_price.toFixed(2)}</span>
                            <span className="bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full">-{promo.discount_percent}%</span>
                        </div>

                        {/* Countdown */}
                        <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
                            <span className="text-white/60 text-xs font-bold uppercase">Termina en:</span>
                            {[
                                { value: timeLeft.hours, label: "Hrs" },
                                { value: timeLeft.minutes, label: "Min" },
                                { value: timeLeft.seconds, label: "Seg" },
                            ].map((unit, i) => (
                                <div key={i} className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 text-center min-w-[50px]">
                                    <span className="text-white font-black text-lg block leading-none">
                                        {String(unit.value).padStart(2, "0")}
                                    </span>
                                    <span className="text-white/60 text-[10px] font-bold uppercase">{unit.label}</span>
                                </div>
                            ))}
                        </div>

                        <Link
                            href={promo.cta_link}
                            className="inline-flex items-center gap-2 bg-white text-[#D4145A] font-bold px-8 py-3.5 rounded-full hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-sm uppercase tracking-wider"
                        >
                            Comprar Ahora <FiArrowRight />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
