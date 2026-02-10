"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiInstagram } from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { supabase } from "../lib/supabase";

interface GalleryImage {
    id: number;
    image_url: string;
    alt_text: string;
}

export default function InstagramGallery() {
    const { ref, isVisible } = useScrollReveal();
    const [photos, setPhotos] = useState<GalleryImage[]>([]);

    useEffect(() => {
        const fetchGallery = async () => {
            const { data } = await supabase.from("gallery_images").select("*").eq("active", true).order("order");
            if (data) setPhotos(data);
        };
        fetchGallery();
    }, []);

    if (photos.length === 0) return null;

    return (
        <section
            ref={ref}
            className={`py-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-4">
                    <FiInstagram className="text-[#D4145A]" size={22} />
                    <span className="text-[#D4145A] font-bold tracking-wider uppercase text-sm">@floreriarosmery</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                    Síguenos en Instagram
                </h2>
                <p className="text-gray-400 mt-3 font-medium">Descubre nuestros últimos arreglos y tendencias florales</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {photos.map((photo, i) => (
                    <a
                        key={i}
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative aspect-square overflow-hidden rounded-2xl"
                        style={{
                            transitionDelay: `${i * 100}ms`,
                        }}
                    >
                        <Image
                            src={photo.image_url}
                            alt={photo.alt_text}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                                <FiInstagram className="text-white" size={32} />
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <div className="text-center mt-8">
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-bold rounded-full hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-sm uppercase tracking-wider"
                >
                    <FiInstagram size={16} /> Seguir en Instagram
                </a>
            </div>
        </section>
    );
}
