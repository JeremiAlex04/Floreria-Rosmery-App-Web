import Link from "next/link";
import { FiPhone, FiTruck, FiInstagram, FiFacebook, FiMapPin } from "react-icons/fi";

export default function TopBar() {
    return (
        <div className="bg-[#D4145A] text-white py-2 px-4 text-xs md:text-sm font-medium z-50 relative">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">

                {/* Contacto & Ubicación */}
                <div className="flex items-center gap-4 md:gap-6">
                    <a href="tel:+51912053432" className="flex items-center gap-2 hover:text-pink-200 transition-colors">
                        <FiPhone /> <span>Pedidos: 912 053 432</span>
                    </a>
                    <span className="hidden md:flex items-center gap-2">
                        <FiMapPin /> <span>Av. Las Flores 123, Lima</span>
                    </span>
                </div>

                {/* Mensaje Central (USP) */}
                <div className="hidden lg:flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                    <FiTruck className="text-yellow-300" />
                    <span className="tracking-wide">Envíos Express en menos de 2 horas ⚡</span>
                </div>

                {/* Redes & Rastreo */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 border-r border-white/20 pr-4">
                        <Link href="https://instagram.com" target="_blank" className="hover:text-pink-200 transition-transform hover:scale-110">
                            <FiInstagram size={16} />
                        </Link>
                        <Link href="https://facebook.com" target="_blank" className="hover:text-pink-200 transition-transform hover:scale-110">
                            <FiFacebook size={16} />
                        </Link>
                    </div>
                    <Link href="/rastreo" className="hover:underline decoration-white/50 underline-offset-2">
                        Rastrear Pedido
                    </Link>
                </div>
            </div>
        </div>
    );
}
