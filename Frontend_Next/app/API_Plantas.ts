export interface Plant {
    id: number;
    nombre: string;
    precio: number;
    categoria: string;
    ocasion: string[];
    imagen: string;
    popular?: boolean;
}

export const plants: Plant[] = [
    {
        id: 1,
        nombre: "Gerberas rosadas",
        precio: 60,
        categoria: "Ramos premium",
        ocasion: ["amor", "cumpleaños"],
        imagen: "/img/img-tarjeta/f1.jpg",
        popular: true,
    },
    {
        id: 2,
        nombre: "Rosas blancas y lisianthus lila",
        precio: 72,
        categoria: "Rosas",
        ocasion: ["cumpleaños", "aniversario"],
        imagen: "/img/img-tarjeta/f2.jpg",
        popular: true,
    },
    {
        id: 3,
        nombre: "Tulipanes rojos",
        precio: 85,
        categoria: "Tulipanes",
        ocasion: ["amor", "aniversario"],
        imagen: "/img/img-tarjeta/f3.jpg",
        popular: true,
    },
    {
        id: 4,
        nombre: "Rosas naranjas y tulipanes blancos",
        precio: 75,
        categoria: "Rosas",
        ocasion: ["cumpleaños"],
        imagen: "/img/img-tarjeta/f6.jpg",
        popular: true,
    },
    {
        id: 5,
        nombre: "Ramo de tulipanes rosados",
        precio: 45,
        categoria: "Tulipanes",
        ocasion: ["amor"],
        imagen: "/img/img-tarjeta/f8.jpg",
        popular: true,
    },
    {
        id: 6,
        nombre: "Ramos de Rosas",
        precio: 105,
        categoria: "Rosas",
        ocasion: ["amor", "aniversario"],
        imagen: "/img/img-tarjeta/f6.jpg",
        popular: true,
    },
    {
        id: 7,
        nombre: "Flor hellebore verde y blanca",
        precio: 90,
        categoria: "Centros de Mesa",
        ocasion: ["condolencias"],
        imagen: "/img/img-tarjeta/f10.jpg",
        popular: true,
    },
    {
        id: 8,
        nombre: "Arreglo Fúnebre Elegancia",
        precio: 120,
        categoria: "Condolencias",
        ocasion: ["condolencias"],
        imagen: "/img/img-catalogo/C-Condolencias.jpg",
        popular: false,
    },
    {
        id: 9,
        nombre: "Caja de 24 Rosas Rojas",
        precio: 150,
        categoria: "Arreglos en Caja",
        ocasion: ["amor", "aniversario"],
        imagen: "/img/img-catalogo/C-Rosas.jpg",
        popular: false,
    },
    {
        id: 10,
        nombre: "Canasta de Flores Primaverales",
        precio: 95,
        categoria: "Cumpleaños",
        ocasion: ["cumpleaños"],
        imagen: "/img/img-catalogo/C-Cumpleaños.jpg",
        popular: false,
    },
    {
        id: 11,
        nombre: "Orquídea Blanca Premium",
        precio: 130,
        categoria: "Orquídeas",
        ocasion: ["aniversario", "condolencias"],
        imagen: "/img/img-tarjeta/f10.jpg",
        popular: false,
    },
    {
        id: 12,
        nombre: "Corazón de Rosas Rosadas",
        precio: 180,
        categoria: "Aniversario",
        ocasion: ["amor", "aniversario"],
        imagen: "/img/img-tarjeta/f1.jpg",
        popular: false,
    },
    {
        id: 13,
        nombre: "Ramo de Novia Imperial",
        precio: 250,
        categoria: "Bodas",
        ocasion: ["amor"],
        imagen: "/img/img-catalogo/C-Bodas.jpg",
        popular: false,
    }
];
