export default function TestimonioReseña() {
    return (
        <>
            {/* Banner Superior */}
            <div className="w-full mt-16 p-8 rounded-2xl shadow-sm text-black bg-[url('/img/img-catalogo/BnCatalogo.png')] bg-cover bg-center mb-8 min-h-[160px] flex items-center justify-end" style={{ padding: '12px' }}>
                <div className="pr-12 md:pr-24 lg:pr-32 max-w-xl text-right">
                    <p className="font-black text-3xl md:text-4xl uppercase tracking-tighter text-black drop-shadow-sm">
                        Testimonios y Reseñas
                    </p>
                    <div className="h-1 w-20 bg-[#D4145A] ml-auto mt-2 rounded-full"></div>
                </div>
            </div>

            {/* CONTENEDOR FLEX PARA LAS TARJETAS */}
            <div className="flex flex-wrap justify-center gap-4 w-full px-4">

                {/* Tarjeta 1 */}
                <div className="max-w-sm bg-white rounded-xl shadow-md overflow-hidden md:max-w-xl p-6" style={{ backgroundColor: '#ff8ab5ff' }}>
                    <div className="md:flex md:flex-row">
                        <div className="md:shrink-0 flex justify-center items-center">
                            <img className="h-24 w-24 rounded-full object-cover" src="https://overbrand.pe/blog/wp-content/uploads/2019/04/Overbrand_testimonios_uno-1000x550.jpg" alt="Avatar del Cliente" />
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-white font-semibold">Testimonio</div>
                            <p className="mt-2 italic text-white">"Excelente servicio, productos de alta calidad y precios competitivos. ¡Recomendamos fuertemente esta tienda!"</p>
                            <div className="mt-4">
                                <div className="font-bold text-lg text-white">Ana María López</div>
                                <p className="text-white opacity-90">Cliente Satisfecho</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tarjeta 2 */}
                <div className="max-w-sm bg-white rounded-xl shadow-md overflow-hidden md:max-w-xl p-6" style={{ backgroundColor: '#ff8ab5ff' }}>
                    <div className="md:flex md:flex-row">
                        <div className="md:shrink-0 flex justify-center items-center">
                            <img className="h-24 w-24 rounded-full object-cover" src="https://img.freepik.com/foto-gratis/joven-hombre-barbudo-camisa-rayas_273609-5677.jpg?semt=ais_hybrid&w=740&q=80" alt="Avatar del Cliente" />
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-white font-semibold">Testimonio</div>
                            <p className="mt-2 italic text-white">"Es una super tienda, los precios son muy competitivos y el servicio es excelente."</p>
                            <div className="mt-4">
                                <div className="font-bold text-lg text-white">Juan Pérez</div>
                                <p className="text-white opacity-90">Cliente Satisfecho</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}