interface ModalQSProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalQS({ isOpen, onClose }: ModalQSProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Fondo oscuro */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            {/* Contenedor del modal */}
            <div className="relative z-10 w-full max-w-md rounded-lg shadow-lg bg-[url('/img-catalogo/BnCatalogo.png')] bg-cover bg-center bg-no-repeat" style={{ backgroundColor: '#FFB6C1' }}>
                {/* Header */}
                <div className="flex items-center gap-3 p-4 border-b border-black/10" style={{ backgroundColor: '#e74a6199', justifyContent: 'center' }}>
                    <img src="/img/img-logo/logov2.png" alt="Logo" className="h-12 w-auto" />
                    <h5 className="text-black text-2xl ml-2 self-end justify-end items-end font-semibold">
                        Quiénes Somos
                    </h5>
                </div>

                <div className="p-6 text-black text-base leading-relaxed tracking-wide max-w-prose mx-auto space-y-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <p>
                        En <strong>Florería Rosmery</strong> creemos que las flores tienen el poder de
                        transformar momentos y transmitir sentimientos que a veces las palabras no alcanzan.
                    </p>

                    <p>
                        Nacimos con la ilusión de llenar de color, aroma y vida cada detalle importante en la
                        vida de nuestros clientes. Desde un pequeño ramo para alegrar el día, hasta la
                        decoración completa de un evento especial, ponemos dedicación y cariño en cada creación.
                    </p>

                    <p>
                        Trabajamos únicamente con flores frescas y seleccionadas, combinando creatividad,
                        calidad y amor por lo que hacemos. Para nosotros, cada arreglo es único, porque cada
                        persona y cada ocasión también lo son.
                    </p>

                    <p className="font-semibold">
                        En Florería Rosmery no solo vendemos flores,<br />
                        creamos recuerdos inolvidables.
                    </p>
                </div>

                {/* Footer */}
                <div className="flex justify-end px-6 py-4 border-t border-black/10">
                    <button onClick={onClose} className="px-5 py-2 rounded-md bg-red-600 text-white font-bold transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-red-400">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
