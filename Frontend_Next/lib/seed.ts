import { supabase } from "./supabase";
import { plants } from "../app/API_Plantas";

export async function seedProducts() {
    console.log("Iniciando migración de datos...");

    // 1. Limpiar tabla actual (opcional, comentar si no se desea borrar todo)
    // const { error: deleteError } = await supabase.from("products").delete().neq("id", 0);
    // if (deleteError) console.error("Error al limpiar:", deleteError);

    // 2. Preparar datos para insertar (quitando el ID si es autoincremental en Supabase, o manteniéndolo si quieres conservar IDs exactos)
    const productsToInsert = plants.map(p => ({
        nombre: p.nombre,
        precio: p.precio,
        categoria: p.categoria,
        ocasion: p.ocasion,
        imagen: p.imagen,
        popular: p.popular || false,
        stock: 100, // Stock por defecto
        descripcion: `Hermoso arreglo floral de la categoría ${p.categoria}. Ideal para ${p.ocasion.join(", ")}.`
    }));

    // 3. Insertar por lotes (Supabase soporta esto)
    const { data, error } = await supabase.from("products").insert(productsToInsert);

    if (error) {
        console.error("Error insertando datos:", error);
        return { success: false, error };
    }

    console.log("Migración completada con éxito!");
    return { success: true, count: productsToInsert.length };
}
