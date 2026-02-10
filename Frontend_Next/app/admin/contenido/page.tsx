"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FiPlus, FiTrash2, FiEdit2, FiSave, FiX, FiCheck } from "react-icons/fi";
import Image from "next/image";

// Types
interface HeroSlide { id: number; subtitle: string; title: string; description: string; cta_text: string; cta_link: string; image_url: string; order: number; active: boolean; }
interface Promotion { id: number; title: string; description: string; image_url: string; original_price: number; sale_price: number; cta_link: string; active: boolean; expires_at: string | null; }
interface Testimonial { id: number; name: string; role: string; avatar_url: string; text: string; rating: number; active: boolean; }
interface Benefit { id: number; icon: string; title: string; description: string; order: number; active: boolean; }
interface Category { id: number; title: string; slug: string; image_url: string; order: number; active: boolean; }
interface BuyingStep { id: number; icon: string; title: string; description: string; color_class: string; order: number; active: boolean; }
interface GalleryImage { id: number; image_url: string; alt_text: string; order: number; active: boolean; }
interface CompanySettings { id: string; phone: string; whatsapp: string; email: string; address: string; schedule_mon_sat: string; instagram_url: string; facebook_url: string; tiktok_url: string; map_iframe_url: string; }

export default function ContentManager() {
    const [activeTab, setActiveTab] = useState<"hero" | "promotions" | "testimonials" | "benefits" | "categories" | "steps" | "gallery" | "settings">("hero");
    const [loading, setLoading] = useState(true);

    // Data State
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [benefits, setBenefits] = useState<Benefit[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [steps, setSteps] = useState<BuyingStep[]>([]);
    const [gallery, setGallery] = useState<GalleryImage[]>([]);
    const [settings, setSettings] = useState<CompanySettings | null>(null);

    // Edit/Create State
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        let table = "";
        if (activeTab === "hero") table = "hero_slides";
        else if (activeTab === "promotions") table = "promotions";
        else if (activeTab === "testimonials") table = "testimonials";
        else if (activeTab === "benefits") table = "benefits";
        else if (activeTab === "categories") table = "categories";
        else if (activeTab === "steps") table = "buying_steps";
        else if (activeTab === "gallery") table = "gallery_images";
        else if (activeTab === "settings") table = "company_settings";

        const { data } = await supabase.from(table).select("*").order(activeTab === "settings" ? "created_at" : "order");

        if (data) {
            if (activeTab === "hero") setSlides(data);
            else if (activeTab === "promotions") setPromotions(data);
            else if (activeTab === "testimonials") setTestimonials(data);
            else if (activeTab === "benefits") setBenefits(data);
            else if (activeTab === "categories") setCategories(data);
            else if (activeTab === "steps") setSteps(data);
            else if (activeTab === "gallery") setGallery(data);
            else if (activeTab === "settings") {
                setSettings(data[0] || null);
                if (data[0] && activeTab === "settings") setEditingItem(data[0]); // Auto-load settings form
            }
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("¿Estás seguro de eliminar este ítem?")) return;
        let table = "";
        if (activeTab === "hero") table = "hero_slides";
        else if (activeTab === "promotions") table = "promotions";
        else if (activeTab === "testimonials") table = "testimonials";
        else if (activeTab === "benefits") table = "benefits";
        else if (activeTab === "categories") table = "categories";
        else if (activeTab === "steps") table = "buying_steps";
        else if (activeTab === "gallery") table = "gallery_images";

        const { error } = await supabase.from(table).delete().eq("id", id);
        if (!error) fetchData();
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        let table = "";
        if (activeTab === "hero") table = "hero_slides";
        else if (activeTab === "promotions") table = "promotions";
        else if (activeTab === "testimonials") table = "testimonials";
        else if (activeTab === "benefits") table = "benefits";
        else if (activeTab === "categories") table = "categories";
        else if (activeTab === "steps") table = "buying_steps";
        else if (activeTab === "gallery") table = "gallery_images";
        else if (activeTab === "settings") table = "company_settings";

        const payload = { ...editingItem };
        if (activeTab !== "settings") delete payload.id;

        let error;
        if (editingItem.id) {
            const { error: err } = await supabase.from(table).update(payload).eq("id", editingItem.id);
            error = err;
        } else {
            const { error: err } = await supabase.from(table).insert([payload]);
            error = err;
        }

        if (!error) {
            if (activeTab !== "settings") {
                setEditingItem(null);
                setIsCreating(false);
            } else {
                alert("Configuración guardada exitosamente");
            }
            fetchData();
        } else {
            alert("Error al guardar: " + error.message);
        }
    };

    const openEdit = (item: any) => {
        setEditingItem(item);
        setIsCreating(false);
    };

    const openCreate = () => {
        const initial = activeTab === "hero" ? { subtitle: "", title: "", description: "", cta_text: "Ver Catálogo", cta_link: "/catalogo", image_url: "", order: 0, active: true }
            : activeTab === "promotions" ? { title: "", description: "", image_url: "", original_price: 0, sale_price: 0, cta_link: "/catalogo", active: true, expires_at: null }
                : activeTab === "testimonials" ? { name: "", role: "Cliente", avatar_url: "", text: "", rating: 5, active: true }
                    : activeTab === "benefits" ? { icon: "FiStar", title: "", description: "", order: 0, active: true }
                        : activeTab === "categories" ? { title: "", slug: "", image_url: "", order: 0, active: true }
                            : activeTab === "gallery" ? { image_url: "", alt_text: "", order: 0, active: true }
                                : { icon: "FiStar", title: "", description: "", color_class: "bg-pink-400", order: 0, active: true }; // steps
        setEditingItem(initial);
        setIsCreating(true);
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Gestión de Contenido</h1>
                    <p className="text-gray-500 mt-2">Administra todo el contenido visible en la página de inicio.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => setActiveTab("hero")} className={`px-4 py-2 rounded-xl font-bold transition-all ${activeTab === "hero" ? "bg-[#D4145A] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>Hero</button>
                    <button onClick={() => setActiveTab("promotions")} className={`px-4 py-2 rounded-xl font-bold transition-all ${activeTab === "promotions" ? "bg-[#D4145A] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>Promociones</button>
                    <button onClick={() => setActiveTab("testimonials")} className={`px-4 py-2 rounded-xl font-bold transition-all ${activeTab === "testimonials" ? "bg-[#D4145A] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>Testimonios</button>
                    <button onClick={() => setActiveTab("benefits")} className={`px-4 py-2 rounded-xl font-bold transition-all ${activeTab === "benefits" ? "bg-[#D4145A] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>Beneficios</button>
                    <button onClick={() => setActiveTab("categories")} className={`px-4 py-2 rounded-xl font-bold transition-all ${activeTab === "categories" ? "bg-[#D4145A] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>Categorías</button>
                    <button onClick={() => setActiveTab("steps")} className={`px-4 py-2 rounded-xl font-bold transition-all ${activeTab === "steps" ? "bg-[#D4145A] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>Pasos Compra</button>
                    <button onClick={() => setActiveTab("gallery")} className={`px-4 py-2 rounded-xl font-bold transition-all ${activeTab === "gallery" ? "bg-[#D4145A] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>Galería Instagram</button>
                    <button onClick={() => setActiveTab("settings")} className={`px-4 py-2 rounded-xl font-bold transition-all ${activeTab === "settings" ? "bg-[#D4145A] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>Contacto/Config</button>
                </div>
            </header>

            {/* List View */}
            {!editingItem && activeTab !== "settings" && (
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-end mb-6">
                        <button onClick={openCreate} className="flex items-center gap-2 bg-[#D4145A] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#B0124A] transition-all">
                            <FiPlus /> Agregar Nuevo
                        </button>
                    </div>

                    {loading ? (
                        <p className="text-center text-gray-500">Cargando...</p>
                    ) : (
                        <div className="space-y-4">
                            {/* GALLERY ITEMS */}
                            {activeTab === "gallery" && gallery.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-2xl hover:shadow-md transition-all">
                                    <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                                        <Image src={item.image_url} alt={item.alt_text} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800">Orden: {item.order}</h3>
                                        <p className="text-sm text-gray-500">{item.alt_text}</p>
                                    </div>
                                    <button onClick={() => openEdit(item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><FiEdit2 /></button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><FiTrash2 /></button>
                                </div>
                            ))}

                            {/* BENEFIT ITEMS */}
                            {activeTab === "benefits" && benefits.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-2xl hover:shadow-md transition-all">
                                    <div className="font-mono text-xs bg-gray-100 p-2 rounded">{item.icon}</div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800">{item.title}</h3>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                    </div>
                                    <button onClick={() => openEdit(item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><FiEdit2 /></button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><FiTrash2 /></button>
                                </div>
                            ))}

                            {/* CATEGORY ITEMS */}
                            {activeTab === "categories" && categories.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-2xl hover:shadow-md transition-all">
                                    <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                                        <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800">{item.title}</h3>
                                        <p className="text-sm text-gray-500">Slug: {item.slug}</p>
                                    </div>
                                    <button onClick={() => openEdit(item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><FiEdit2 /></button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><FiTrash2 /></button>
                                </div>
                            ))}

                            {/* STEPS ITEMS */}
                            {activeTab === "steps" && steps.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-2xl hover:shadow-md transition-all">
                                    <div className={`w-8 h-8 rounded-full ${item.color_class} flex-shrink-0`} />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800">{item.title} ({item.icon})</h3>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                    </div>
                                    <button onClick={() => openEdit(item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><FiEdit2 /></button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><FiTrash2 /></button>
                                </div>
                            ))}

                            {/* HERO LIST */}
                            {activeTab === "hero" && slides.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-2xl hover:shadow-md transition-all">
                                    <div className="w-24 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                                        <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800">{item.title}</h3>
                                        <p className="text-sm text-gray-500">{item.subtitle}</p>
                                    </div>
                                    <button onClick={() => openEdit(item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><FiEdit2 /></button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><FiTrash2 /></button>
                                </div>
                            ))}

                            {/* PROMOTIONS LIST */}
                            {activeTab === "promotions" && promotions.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-2xl hover:shadow-md transition-all">
                                    <div className="w-24 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                                        <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800">{item.title}</h3>
                                        <p className="text-sm text-gray-500">S/ {item.sale_price} <span className="line-through text-xs text-gray-400">S/ {item.original_price}</span></p>
                                    </div>
                                    <button onClick={() => openEdit(item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><FiEdit2 /></button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><FiTrash2 /></button>
                                </div>
                            ))}

                            {/* TESTIMONIALS LIST */}
                            {activeTab === "testimonials" && testimonials.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-2xl hover:shadow-md transition-all">
                                    <div className="w-12 h-12 relative rounded-full overflow-hidden flex-shrink-0">
                                        <Image src={item.avatar_url || "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg"} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                                        <p className="text-sm text-gray-500 truncate max-w-md">"{item.text}"</p>
                                    </div>
                                    <button onClick={() => openEdit(item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><FiEdit2 /></button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><FiTrash2 /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Edit/Create Form */}
            {editingItem && (
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">{activeTab === "settings" ? "Editar Configuración" : (isCreating ? "Crear Nuevo" : "Editar Ítem")}</h2>
                        {activeTab !== "settings" && <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-gray-100 rounded-full"><FiX size={24} /></button>}
                    </div>

                    <form onSubmit={handleSave} className="space-y-6">
                        {/* GALLERY FIELDS */}
                        {activeTab === "gallery" && (
                            <>
                                <div><label className="block text-sm font-bold text-gray-700">URL Imagen</label><input type="text" value={editingItem.image_url} onChange={e => setEditingItem({ ...editingItem, image_url: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Texto Alternativo (Alt)</label><input type="text" value={editingItem.alt_text} onChange={e => setEditingItem({ ...editingItem, alt_text: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Orden</label><input type="number" value={editingItem.order} onChange={e => setEditingItem({ ...editingItem, order: parseInt(e.target.value) })} className="w-full p-3 border rounded-xl mt-1" /></div>
                            </>
                        )}

                        {/* SETTINGS FIELDS */}
                        {activeTab === "settings" && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-bold text-gray-700">Teléfono</label><input type="text" value={editingItem.phone} onChange={e => setEditingItem({ ...editingItem, phone: e.target.value })} className="w-full p-3 border rounded-xl mt-1" /></div>
                                    <div><label className="block text-sm font-bold text-gray-700">WhatsApp</label><input type="text" value={editingItem.whatsapp} onChange={e => setEditingItem({ ...editingItem, whatsapp: e.target.value })} className="w-full p-3 border rounded-xl mt-1" /></div>
                                </div>
                                <div><label className="block text-sm font-bold text-gray-700">Email</label><input type="email" value={editingItem.email} onChange={e => setEditingItem({ ...editingItem, email: e.target.value })} className="w-full p-3 border rounded-xl mt-1" /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Dirección</label><input type="text" value={editingItem.address} onChange={e => setEditingItem({ ...editingItem, address: e.target.value })} className="w-full p-3 border rounded-xl mt-1" /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Horario (Lun-Sáb)</label><input type="text" value={editingItem.schedule_mon_sat} onChange={e => setEditingItem({ ...editingItem, schedule_mon_sat: e.target.value })} className="w-full p-3 border rounded-xl mt-1" /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Instagram URL</label><input type="text" value={editingItem.instagram_url} onChange={e => setEditingItem({ ...editingItem, instagram_url: e.target.value })} className="w-full p-3 border rounded-xl mt-1" /></div>
                            </>
                        )}

                        {/* HERO FIELDS */}
                        {activeTab === "hero" && (
                            <>
                                <div><label className="block text-sm font-bold text-gray-700">Título</label><input type="text" value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Subtítulo</label><input type="text" value={editingItem.subtitle} onChange={e => setEditingItem({ ...editingItem, subtitle: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Descripción</label><textarea value={editingItem.description} onChange={e => setEditingItem({ ...editingItem, description: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div><label className="block text-sm font-bold text-gray-700">URL Imagen</label><input type="text" value={editingItem.image_url} onChange={e => setEditingItem({ ...editingItem, image_url: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-bold text-gray-700">Texto Botón</label><input type="text" value={editingItem.cta_text} onChange={e => setEditingItem({ ...editingItem, cta_text: e.target.value })} className="w-full p-3 border rounded-xl mt-1" /></div>
                                    <div><label className="block text-sm font-bold text-gray-700">Link Botón</label><input type="text" value={editingItem.cta_link} onChange={e => setEditingItem({ ...editingItem, cta_link: e.target.value })} className="w-full p-3 border rounded-xl mt-1" /></div>
                                </div>
                                <div><label className="block text-sm font-bold text-gray-700">Orden</label><input type="number" value={editingItem.order} onChange={e => setEditingItem({ ...editingItem, order: parseInt(e.target.value) })} className="w-full p-3 border rounded-xl mt-1" /></div>
                            </>
                        )}

                        {/* PROMOTIONS FIELDS */}
                        {activeTab === "promotions" && (
                            <>
                                <div><label className="block text-sm font-bold text-gray-700">Título</label><input type="text" value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Descripción</label><textarea value={editingItem.description} onChange={e => setEditingItem({ ...editingItem, description: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div><label className="block text-sm font-bold text-gray-700">URL Imagen</label><input type="text" value={editingItem.image_url} onChange={e => setEditingItem({ ...editingItem, image_url: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-bold text-gray-700">Precio Original</label><input type="number" step="0.01" value={editingItem.original_price} onChange={e => setEditingItem({ ...editingItem, original_price: parseFloat(e.target.value) })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                    <div><label className="block text-sm font-bold text-gray-700">Precio Oferta</label><input type="number" step="0.01" value={editingItem.sale_price} onChange={e => setEditingItem({ ...editingItem, sale_price: parseFloat(e.target.value) })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                </div>
                                <div><label className="block text-sm font-bold text-gray-700">Expira en (Opcional)</label><input type="datetime-local" value={editingItem.expires_at || ""} onChange={e => setEditingItem({ ...editingItem, expires_at: e.target.value || null })} className="w-full p-3 border rounded-xl mt-1" /></div>
                            </>
                        )}

                        {/* TESTIMONIALS FIELDS */}
                        {activeTab === "testimonials" && (
                            <>
                                <div><label className="block text-sm font-bold text-gray-700">Nombre</label><input type="text" value={editingItem.name} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Rol</label><input type="text" value={editingItem.role} onChange={e => setEditingItem({ ...editingItem, role: e.target.value })} className="w-full p-3 border rounded-xl mt-1" /></div>
                                <div><label className="block text-sm font-bold text-gray-700">URL Avatar</label><input type="text" value={editingItem.avatar_url} onChange={e => setEditingItem({ ...editingItem, avatar_url: e.target.value })} className="w-full p-3 border rounded-xl mt-1" /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Testimonio</label><textarea value={editingItem.text} onChange={e => setEditingItem({ ...editingItem, text: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Rating (1-5)</label><input type="number" min="1" max="5" value={editingItem.rating} onChange={e => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                            </>
                        )}

                        {/* BENEFITS FIELDS */}
                        {activeTab === "benefits" && (
                            <>
                                <div><label className="block text-sm font-bold text-gray-700">Nombre Icono (Fi...)</label><input type="text" value={editingItem.icon} onChange={e => setEditingItem({ ...editingItem, icon: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required placeholder="Ej: FiTruck, FiShield" /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Título</label><input type="text" value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Descripción</label><input type="text" value={editingItem.description} onChange={e => setEditingItem({ ...editingItem, description: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Orden</label><input type="number" value={editingItem.order} onChange={e => setEditingItem({ ...editingItem, order: parseInt(e.target.value) })} className="w-full p-3 border rounded-xl mt-1" /></div>
                            </>
                        )}

                        {/* CATEGORIES FIELDS */}
                        {activeTab === "categories" && (
                            <>
                                <div><label className="block text-sm font-bold text-gray-700">Título</label><input type="text" value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Slug (URL)</label><input type="text" value={editingItem.slug} onChange={e => setEditingItem({ ...editingItem, slug: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div><label className="block text-sm font-bold text-gray-700">URL Imagen</label><input type="text" value={editingItem.image_url} onChange={e => setEditingItem({ ...editingItem, image_url: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Orden</label><input type="number" value={editingItem.order} onChange={e => setEditingItem({ ...editingItem, order: parseInt(e.target.value) })} className="w-full p-3 border rounded-xl mt-1" /></div>
                            </>
                        )}

                        {/* BUYING STEPS FIELDS */}
                        {activeTab === "steps" && (
                            <>
                                <div><label className="block text-sm font-bold text-gray-700">Nombre Icono (Fi...)</label><input type="text" value={editingItem.icon} onChange={e => setEditingItem({ ...editingItem, icon: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required placeholder="Ej: FiHeart, FiCreditCard" /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Título</label><input type="text" value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Descripción</label><textarea value={editingItem.description} onChange={e => setEditingItem({ ...editingItem, description: e.target.value })} className="w-full p-3 border rounded-xl mt-1" required /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Clase Color Tailwind</label><input type="text" value={editingItem.color_class} onChange={e => setEditingItem({ ...editingItem, color_class: e.target.value })} className="w-full p-3 border rounded-xl mt-1" placeholder="Ej: bg-pink-400" /></div>
                                <div><label className="block text-sm font-bold text-gray-700">Orden</label><input type="number" value={editingItem.order} onChange={e => setEditingItem({ ...editingItem, order: parseInt(e.target.value) })} className="w-full p-3 border rounded-xl mt-1" /></div>
                            </>
                        )}

                        <div className="flex gap-4 pt-4">
                            <button type="submit" className="flex-1 bg-[#D4145A] text-white py-3 rounded-xl font-bold hover:bg-[#B0124A] transition-all flex justify-center gap-2 items-center">
                                <FiSave /> Guardar
                            </button>
                            {activeTab !== "settings" && (
                                <button type="button" onClick={() => setEditingItem(null)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
