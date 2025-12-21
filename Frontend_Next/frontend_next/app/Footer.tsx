"use client";
import { BsTelephoneFill, BsWhatsapp, BsInstagram, BsTiktok, } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";


export default function Footer() {
    return (
        <>
            {/* Footer principal */}
            <footer className="bg-[#FF6F91] text-black py-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Contacto */}
                        <div>
                            <h5 className="font-bold text-lg mb-2">Contacto</h5>
                            <p>Puedes contactarnos llamando al:</p>
                            <p className="font-bold flex justify-center items-center gap-2">
                                <BsTelephoneFill /> (01) 245-8365
                            </p>
                            <p className="mt-2">A través de Whatsapp al:</p>
                            <p className="font-bold flex justify-center items-center gap-2">
                                <BsWhatsapp /> (+51) 12053432
                            </p>
                        </div>

                        {/* Redes sociales */}
                        <div>
                            <h5 className="font-bold text-lg mb-2">Redes Sociales</h5>
                            <p className="flex justify-center items-center gap-2">
                                <BsInstagram className="text-red-600" /> Instagram
                            </p>
                            <p className="flex justify-center items-center gap-2">
                                <BsTiktok /> TikTok
                            </p>
                            <p className="flex justify-center items-center gap-2">
                                <FaXTwitter /> Twitter-X
                            </p>
                        </div>

                        {/* Legales */}
                        <div>
                            <h5 className="font-bold text-lg mb-2">Legales</h5>
                            <p>Términos y condiciones</p>
                            <p>Políticas de cookies</p>
                            <p>Libro de reclamaciones</p>
                        </div>

                    </div>
                </div>
            </footer>

            {/* Derechos de autor */}
            <footer className="bg-black py-4">
                <div className="text-center">
                    <p className="text-white text-sm mb-0">
                        © FLORERIA ROSMERY 2025 | TODOS LOS DERECHOS RESERVADOS
                    </p>
                </div>
            </footer>
        </>
    );
}