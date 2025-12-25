export default function TestimonioReseña() {
    return (
        <>
            {/*Testimonio y reseña*/}
            <div className="w-full p-8 rounded-2xl shadow-sm text-black bg-[#ffb6c1] bg-[url('')] bg-cover bg-center mb-8 min-h-[160px] flex items-center justify-end">
                <div className="pr-12 md:pr-24 lg:pr-32 max-w-xl text-right">
                    <p className="font-black text-3xl md:text-4xl uppercase tracking-tighter text-black drop-shadow-sm">
                        Testimonios y Reseñas
                    </p>
                    <div className="h-1 w-20 bg-[#D4145A] ml-auto mt-2 rounded-full"></div>
                </div>
            </div>
            <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 p-6">
                <div className="md:flex">
                    {/* Contenedor de Imagen/Avatar */}
                    <div className="md:shrink-0 flex justify-center items-center">
                        <img className="h-24 w-24 rounded-full object-cover" src="via.placeholder.com" alt="Avatar del Cliente" />
                    </div>
                    {/* Contenido del Testimonio */}
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Testimonio</div>
                        <p className="mt-2 text-gray-500 italic">"Esta herramienta ha transformado nuestro flujo de trabajo. ¡Increíblemente fácil de usar y muy potente!"</p>
                        <div className="mt-4">
                            <div className="font-bold text-lg text-gray-900">Ana María López</div>
                            <p className="text-gray-600">Directora de Marketing</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}