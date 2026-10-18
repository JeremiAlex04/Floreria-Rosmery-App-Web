"use client";

import { useEffect, useState, useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FiPackage, FiHeart, FiStar, FiShoppingBag } from "react-icons/fi";
import { fetchHomeData, HomeStats, defaultHomeData } from "../lib/homeDataClient";

function AnimatedNumber({
    target,
    suffix,
    decimals = 0,
    start,
}: {
    target: number;
    suffix: string;
    decimals?: number;
    start: boolean;
}) {
    const spanRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = spanRef.current;
        if (!el) return;
        if (!start) {
            el.textContent = `${decimals > 0 ? (0).toFixed(decimals) : 0}${suffix}`;
            return;
        }

        let startTimestamp: number | null = null;
        const duration = 1200;
        let rafId: number;

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = easeOut * target;

            el.textContent = `${decimals > 0 ? current.toFixed(decimals) : Math.floor(current)}${suffix}`;

            if (progress < 1) {
                rafId = requestAnimationFrame(step);
            }
        };

        rafId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafId);
    }, [start, target, suffix, decimals]);

    return (
        <span ref={spanRef} className="font-editorial text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tabular-nums">
            {decimals > 0 ? (0).toFixed(decimals) : 0}{suffix}
        </span>
    );
}

export default function AnimatedCounters() {
    const { ref, isVisible } = useScrollReveal(0.2);
    const [stats, setStats] = useState<HomeStats>(defaultHomeData.stats);

    useEffect(() => {
        let isMounted = true;
        const fetchStats = async () => {
            try {
                const data = await fetchHomeData();
                if (isMounted && data.stats) {
                    setStats(data.stats);
                }
            } catch (error) {
                console.error("Unable to load stats:", error);
            }
        };
        fetchStats();
        return () => {
            isMounted = false;
        };
    }, []);

    const counters = [
        {
            icon: <FiPackage className="text-xl" />,
            target: stats.total_orders,
            suffix: "+",
            label: "Pedidos Entregados",
        },
        {
            icon: <FiHeart className="text-xl" />,
            target: stats.total_customers,
            suffix: "+",
            label: "Clientes Satisfechos",
        },
        {
            icon: <FiStar className="text-xl text-amber-500" />,
            target: 4.9,
            suffix: "",
            label: "Calificación Promedio",
            decimals: 1,
        },
        {
            icon: <FiShoppingBag className="text-xl" />,
            target: stats.total_products,
            suffix: "+",
            label: "Diseños Florales",
        },
    ];

    return (
        <section
            ref={ref}
            className={`transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] will-change-transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
            {/* Double-bezel wrapper */}
            <div className="p-2 sm:p-2.5 rounded-[2.5rem] bg-stone-200/50 ring-1 ring-stone-900/5 select-none">
                <div className="relative rounded-[calc(2.5rem-0.6rem)] bg-white p-8 md:p-14 shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-stone-100">
                        {counters.map((stat, i) => (
                            <div key={i} className={`flex flex-col items-center text-center ${i > 0 ? "pt-6 md:pt-0" : ""}`}>
                                <div className="w-12 h-12 rounded-2xl bg-pink-50/80 border border-pink-100 flex items-center justify-center text-[#D4145A] mb-4">
                                    {stat.icon}
                                </div>
                                <div className="mb-2">
                                    <AnimatedNumber
                                        target={stat.target}
                                        suffix={stat.suffix}
                                        decimals={stat.decimals}
                                        start={isVisible}
                                    />
                                </div>
                                <p className="text-xs sm:text-sm text-stone-500 font-semibold tracking-wide">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
