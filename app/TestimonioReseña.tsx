export default function TestimonioReseña() {
    return (
        <section className="mb-12">
            <div className="text-center mb-12">
                <span className="text-[#D4145A] font-bold tracking-wider uppercase text-sm">Clientes Felices</span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-2 mb-4 tracking-tight">
                    Testimonios y Reseñas
                </h2>
                <div className="h-1.5 w-24 bg-[#D4145A] mx-auto rounded-full"></div>
                <p className="max-w-2xl mx-auto mt-4 text-gray-500 text-lg">
                    Lo que dicen quienes han compartido emociones con nosotros.
                </p>
            </div>

            {/* CONTENEDOR FLEX PARA LAS TARJETAS */}
            <div className="flex flex-wrap justify-center gap-6 w-full px-4">

                {/* Tarjeta 1 */}
                <div className="max-w-sm w-full bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300" style={{ backgroundColor: '#ff8ab5ff' }}>
                    <div className="md:flex md:flex-row">
                        <div className="md:shrink-0 flex justify-center items-center p-4 md:p-0 md:pl-4">
                            <img className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-sm" src="https://overbrand.pe/blog/wp-content/uploads/2019/04/Overbrand_testimonios_uno-1000x550.jpg" alt="Avatar del Cliente" />
                        </div>
                        <div className="p-6 md:p-8">
                            <div className="uppercase tracking-wide text-xs text-white/80 font-bold mb-2">Testimonio verificado</div>
                            <p className="mt-2 text-white font-medium italic leading-relaxed">"Excelente servicio, productos de alta calidad y precios competitivos. ¡Recomendamos fuertemente esta tienda!"</p>
                            <div className="mt-4 border-t border-white/20 pt-4">
                                <div className="font-bold text-lg text-white">Ana María López</div>
                                <p className="text-white/80 text-sm">Cliente Frecuente</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tarjeta 2 */}
                <div className="max-w-sm w-full bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300" style={{ backgroundColor: '#ff8ab5ff' }}>
                    <div className="md:flex md:flex-row">
                        <div className="md:shrink-0 flex justify-center items-center p-4 md:p-0 md:pl-4">
                            <img className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-sm" src="https://img.freepik.com/foto-gratis/joven-hombre-barbudo-camisa-rayas_273609-5677.jpg?semt=ais_hybrid&w=740&q=80" alt="Avatar del Cliente" />
                        </div>
                        <div className="p-6 md:p-8">
                            <div className="uppercase tracking-wide text-xs text-white/80 font-bold mb-2">Testimonio verificado</div>
                            <p className="mt-2 text-white font-medium italic leading-relaxed">"Es una super tienda, los precios son muy competitivos y el servicio es excelente."</p>
                            <div className="mt-4 border-t border-white/20 pt-4">
                                <div className="font-bold text-lg text-white">Juan Pérez</div>
                                <p className="text-white/80 text-sm">Compró hace 2 días</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}