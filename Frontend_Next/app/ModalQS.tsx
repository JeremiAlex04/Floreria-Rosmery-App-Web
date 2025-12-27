import React from "react";

interface ModalQSProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalQS({ isOpen, onClose }: ModalQSProps) {
    // Bloquear scroll cuando el modal está abierto
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Fondo oscuro con blur */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Contenedor del modal */}
            <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-300">

                {/* Header con Imagen de Fondo */}
                <div className="relative h-40 bg-[#FF6F91] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/img/img-catalogo/BnCatalogo.png')] bg-cover bg-center opacity-50"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    <div className="relative z-10 text-center">
                        <img
                            src="/img/img-logo/logov2.png"
                            alt="Logo Florería Rosmery"
                            className="h-16 w-auto mx-auto mb-2 brightness-0 invert drop-shadow-md"
                        />
                        <h2 className="text-3xl font-bold text-white tracking-wide uppercase drop-shadow-sm">
                            Quiénes Somos
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 p-2 rounded-full transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Contenido */}
                <div className="p-8 md:p-10 space-y-6 text-gray-600 leading-relaxed text-lg">
                    <p>
                        En <span className="text-[#D4145A] font-bold">Florería Rosmery</span>, creemos que las flores tienen el poder de transformar momentos y transmitir sentimientos que a veces las palabras no alcanzan.
                    </p>

                    <p>
                        Nacimos con la ilusión de llenar de <span className="font-semibold text-gray-800">color, aroma y vida</span> cada detalle importante en la vida de nuestros clientes. Desde un pequeño ramo para alegrar el día, hasta la decoración completa de un evento especial.
                    </p>

                    <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100 flex gap-4 items-start">
                        <span className="text-4xl">🌸</span>
                        <p className="italic text-gray-700 font-medium">
                            "Trabajamos únicamente con flores frescas y seleccionadas, combinando creatividad, calidad y amor por lo que hacemos."
                        </p>
                    </div>

                    <p className="text-center font-bold text-gray-800 text-xl pt-2">
                        No solo vendemos flores, <br />
                        <span className="text-[#D4145A]">creamos recuerdos inolvidables.</span>
                    </p>
                </div>

                {/* Footer del Modal */}
                <div className="bg-gray-50 px-8 py-4 flex justify-center border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#D4145A] text-white font-bold shadow-lg hover:bg-[#B0124A] hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
}
