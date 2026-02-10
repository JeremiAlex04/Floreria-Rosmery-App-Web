"use client";

import { useEffect, useState } from "react";
import * as Icons from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { supabase } from "../lib/supabase";

interface BuyingStep {
    id: number;
    icon: string;
    title: string;
    description: string;
    color_class: string;
}

export default function ComoComprar() {
    const { ref, isVisible } = useScrollReveal();
    const [steps, setSteps] = useState<BuyingStep[]>([]);

    useEffect(() => {
        const fetchSteps = async () => {
            const { data } = await supabase.from("buying_steps").select("*").eq("active", true).order("order");
            if (data) setSteps(data);
        };
        fetchSteps();
    }, []);

    if (steps.length === 0) return null;

    return (
        <section
            ref={ref}
            className={`py-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
            <div className="text-center mb-16">
                <span className="text-gray-400 font-bold tracking-widest uppercase text-xs">Fácil y Rápido</span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-2 tracking-tight">
                    ¿Cómo Comprar?
                </h2>
                <div className="h-1.5 w-16 bg-gray-200 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative px-4">
                {/* Connector Line */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-100 -z-10" />

                {steps.map((step, index) => {
                    const IconComponent = (Icons as any)[step.icon] || Icons.FiHeart;
                    return (
                        <div
                            key={step.id}
                            className="flex flex-col items-center text-center group"
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            <div className={`w-24 h-24 rounded-3xl ${step.color_class} shadow-lg flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300 mb-6 relative`}>
                                <IconComponent className="w-7 h-7 text-white" />
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center font-black text-gray-400 text-sm shadow-sm">
                                    {index + 1}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                            <p className="text-gray-500 max-w-xs leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
