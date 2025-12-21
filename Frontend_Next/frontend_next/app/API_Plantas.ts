export interface Plant {
    id: number;
    nombre: string;
    precio: number;
    categoria?: string;
    imagen: string;
}

export const plants: Plant[] = [
    {
        id: 1,
        nombre: "Gerberas rosadas",
        precio: 60,
        categoria: "Gerberas",
        imagen: "/img/img-tarjeta/f1.jpg",
    },
    {
        id: 2,
        nombre: "Rosas blancas y lisianthus lila",
        precio: 72,
        categoria: "Rosas",
        imagen: "/img/img-tarjeta/f2.jpg",
    },
    {
        id: 3,
        nombre: "Tulipanes rojos",
        precio: 85,
        categoria: "Tulipanes",
        imagen: "/img/img-tarjeta/f3.jpg",
    },
    {
        id: 4,
        nombre: "Rosas naranjas y tulipanes blancos",
        precio: 75,
        categoria: "Rosas",
        imagen: "/img/img-tarjeta/f6.jpg",
    },
    {
        id: 5,
        nombre: "Ramo de tulipanes rosados",
        precio: 45,
        categoria: "Tulipanes",
        imagen: "/img/img-tarjeta/f8.jpg",
    },
    {
        id: 6,
        nombre: "Ramos de Rosas",
        precio: 105,
        categoria: "Rosas",
        imagen: "/img/img-tarjeta/f6.jpg",
    },
    {
        id: 7,
        nombre: "Flor hellebore verde y blanca",
        precio: 90,
        categoria: "Hellebore",
        imagen: "/img/img-tarjeta/f10.jpg",
    }
];
