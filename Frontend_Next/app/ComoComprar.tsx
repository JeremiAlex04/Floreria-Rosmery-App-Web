import { FiHeart, FiCreditCard, FiTruck } from "react-icons/fi";

const steps = [
    {
        icon: <FiHeart className="w-8 h-8 text-white" />,
        title: "1. Elige tu Detalle",
        description: "Explora nuestro catálogo y selecciona el arreglo perfecto para esa persona especial.",
        color: "bg-pink-400"
    },
    {
        icon: <FiCreditCard className="w-8 h-8 text-white" />,
        title: "2. Realiza tu Pedido",
        description: "Coordina, paga de forma segura y personaliza tu mensaje desde la web o WhatsApp.",
        color: "bg-[#D4145A]"
    },
    {
        icon: <FiTruck className="w-8 h-8 text-white" />,
        title: "3. Recibe Sonrisas",
        description: "Nos encargamos del envío rápido y cuidadoso. ¡Solo prepárate para los agradecimientos!",
        color: "bg-purple-400"
    }
];

export default function ComoComprar() {
    return (
        <section className="py-12">
            <div className="text-center mb-16">
                <span className="text-gray-400 font-bold tracking-widest uppercase text-xs">Fácil y Rápido</span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-2 tracking-tight">
                    ¿Cómo Comprar?
                </h2>
                <div className="h-1.5 w-16 bg-gray-200 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative px-4">
                {/* Connector Line (Desktop Only) */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-100 -z-10"></div>

                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center group">
                        <div className={`w-24 h-24 rounded-3xl ${step.color} shadow-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300 mb-6 relative`}>
                            {step.icon}
                            {/* Number Badge */}
                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center font-black text-gray-400 text-sm shadow-sm">
                                {index + 1}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                        <p className="text-gray-500 max-w-xs leading-relaxed">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
