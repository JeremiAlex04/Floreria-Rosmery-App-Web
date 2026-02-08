import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

const services = [
    {
        title: "Bodas de Ensueño",
        description: "Desde el ramo de la novia hasta los centros de mesa más espectaculares. Creamos la atmósfera perfecta.",
        img: "/img/img-Servicios/ServiceBodaEnsueño.jpg"
    },
    {
        title: "Eventos Corporativos",
        description: "Elegancia para tu oficina o evento empresarial. Flores frescas que comunican profesionalismo.",
        img: "/img/img-Servicios/ServiceEventosCorporativos.jpg"
    },
    {
        title: "Quinceañeros & Fiestas",
        description: "Decoración integral con flores para celebrar la vida. Diseños juveniles y modernos.",
        img: "/img/img-Servicios/ServiceQuinceaneros.jpg"
    }
];

export default function EventosPage() {
    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] bg-black">
                <div
                    className="absolute inset-0 bg-[url('/img/img-catalogo/BnCatalogo.png')] bg-cover bg-center opacity-60"
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
                    <span className="text-[#D4145A] font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Florería Rosmery Eventos
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
                        Creamos Momentos <br /> Inolvidables
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl max-w-2xl font-light">
                        Diseño floral exclusivo para transformar tus celebraciones en experiencias mágicas.
                    </p>
                    <Link
                        href="#cotizar"
                        className="mt-10 px-10 py-4 bg-[#D4145A] hover:bg-[#B0124A] text-white rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-[#D4145A]/50 transform hover:-translate-y-1"
                    >
                        Solicitar Cotización
                    </Link>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
                    <div className="h-1.5 w-24 bg-[#D4145A] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {services.map((service, idx) => (
                        <div key={idx} className="group relative overflow-hidden rounded-3xl shadow-xl aspect-[4/5]">
                            <img
                                src={service.img}
                                alt={service.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                                <p className="text-gray-300 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    {service.description}
                                </p>
                                <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:bg-[#D4145A] group-hover:border-[#D4145A] transition-all">
                                    <FiCheckCircle size={24} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Form Section */}
            <div id="cotizar" className="bg-gray-50 py-24">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden md:flex">
                        <div className="bg-[#1a1a1a] text-white p-12 md:w-2/5 flex flex-col justify-center">
                            <h3 className="text-3xl font-bold mb-6">Hablemos de tu Evento</h3>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Déjanos tus datos y un asesor especializado te contactará para diseñar una propuesta a tu medida.
                            </p>
                            <ul className="space-y-4 text-sm font-medium text-gray-300">
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#D4145A]"></span>
                                    Atención Personalizada
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#D4145A]"></span>
                                    Catálogo Exclusivo
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#D4145A]"></span>
                                    Instalación Incluida
                                </li>
                            </ul>
                        </div>

                        <div className="p-12 md:w-3/5">
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo</label>
                                    <input type="text" className="w-full px-6 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#D4145A] focus:ring-0 transition-all font-medium" placeholder="Tu nombre" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Evento</label>
                                    <select className="w-full px-6 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#D4145A] focus:ring-0 transition-all font-medium">
                                        <option>Boda</option>
                                        <option>Corporativo</option>
                                        <option>Cumpleaños</option>
                                        <option>Otros</option>
                                    </select>
                                </div>
                                <button className="w-full py-4 bg-[#D4145A] hover:bg-[#B0124A] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
                                    Enviar Solicitud
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
