"use client";

import { useEffect, useState } from "react";
import * as Icons from "react-icons/fi"; // Import all icons
import { useScrollReveal } from "../hooks/useScrollReveal";
import { supabase } from "../lib/supabase";

interface Benefit {
    id: number;
    icon: string;
    title: string;
    description: string;
}

export default function Beneficios() {
    const { ref, isVisible } = useScrollReveal();
    const [beneficios, setBeneficios] = useState<Benefit[]>([]);

    useEffect(() => {
        const fetchBenefits = async () => {
            const { data } = await supabase.from("benefits").select("*").eq("active", true).order("order");
            if (data) setBeneficios(data);
        };
        fetchBenefits();
    }, []);

    if (beneficios.length === 0) return null;

    return (
        <section
            ref={ref}
            className={`py-10 bg-white transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {beneficios.map((item, index) => {
                        // Dynamic Icon Rendering
                        const IconComponent = (Icons as any)[item.icon] || Icons.FiStar;

                        return (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 p-5 rounded-2xl hover:bg-pink-50/50 transition-all duration-300 group"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="p-3 bg-pink-50 rounded-xl text-[#D4145A] group-hover:bg-[#D4145A] group-hover:text-white transition-colors duration-300 flex-shrink-0">
                                    <IconComponent className="text-2xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-sm">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 font-medium mt-0.5">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
