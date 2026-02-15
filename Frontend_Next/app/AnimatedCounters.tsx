"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FiPackage, FiHeart, FiStar, FiShoppingBag } from "react-icons/fi";
import { fetchHomeData, HomeStats } from "../lib/homeDataClient";

function AnimatedNumber({ target, suffix, decimals = 0, start }: { target: number; suffix: string; decimals?: number; start: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;
        let current = 0;
        const step = target / 60;
        const interval = setInterval(() => {
            current += step;
            if (current >= target) {
                setCount(target);
                clearInterval(interval);
            } else {
                setCount(current);
            }
        }, 25);
        return () => clearInterval(interval);
    }, [start, target]);

    return (
        <span className="text-3xl md:text-4xl font-black text-gray-900">
            {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
            {suffix}
        </span>
    );
}

export default function AnimatedCounters() {
    const { ref, isVisible } = useScrollReveal(0.3);
    const [stats, setStats] = useState<HomeStats | null>(null);

    // Fetch real-time stats from Neon API
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await fetchHomeData();
                setStats(data.stats);
            } catch (error) {
                console.error("Unable to load homepage stats from Neon:", error);
            }
        };
        fetchStats();
    }, []);

    const counters = [
        {
            icon: <FiPackage />,
            target: stats?.total_orders || 0,
            suffix: "+",
            label: "Pedidos Entregados",
        },
        {
            icon: <FiHeart />,
            target: stats?.total_customers || 0,
            suffix: "+",
            label: "Clientes Felices",
        },
        {
            icon: <FiStar />,
            target: 4.9, // Rating can remain static or be fetched if we had a ratings table average
            suffix: "",
            label: "Rating Promedio",
            decimals: 1,
        },
        {
            icon: <FiShoppingBag />,
            target: stats?.total_products || 0,
            suffix: "+",
            label: "Productos Disponibles",
        },
    ];

    if (!stats) return null;

    return (
        <section
            ref={ref}
            className={`py-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {counters.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-pink-50 text-[#D4145A] rounded-2xl text-xl mb-4">
                                {stat.icon}
                            </div>
                            <div className="mb-1">
                                <AnimatedNumber
                                    target={stat.target}
                                    suffix={stat.suffix}
                                    decimals={stat.decimals}
                                    start={isVisible}
                                />
                            </div>
                            <p className="text-sm text-gray-400 font-semibold">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
