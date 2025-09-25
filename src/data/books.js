import cienAnosSoledad from "../assets/img/cien-anos-soledad.jpg";
import georgeOrwel from "../assets/img/george-orwell-book.png";
import elPrincipito from "../assets/img/principito.png";
import donQuijote from "../assets/img/don-quijote.png";
import rayuela from "../assets/img/rayuela.png";
import cronicaMuerte from "../assets/img/cronica-muerte-anunciada.png";

export const availableBooks = [
  {
    id: 1,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    genre: "Realismo mágico",
    owner: "María González",
    condition: "Excelente",
    image: cienAnosSoledad,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Ficción distópica",
    owner: "Carlos Ruiz",
    condition: "Bueno",
    image: georgeOrwel,
  },
  {
    id: 3,
    title: "El Principito",
    author: "Antoine de Saint-Exupéry",
    genre: "Fábula",
    owner: "Ana Silva",
    condition: "Como nuevo",
    image: elPrincipito,
  },
  {
    id: 4,
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    genre: "Clásico",
    owner: "Pedro López",
    condition: "Bueno",
    image: donQuijote,
  },
  {
    id: 5,
    title: "Rayuela",
    author: "Julio Cortázar",
    genre: "Literatura experimental",
    owner: "Laura Mendez",
    condition: "Excelente",
    image: rayuela,
  },
  {
    id: 6,
    title: "Crónica de una muerte anunciada",
    author: "Gabriel García Márquez",
    genre: "Novela",
    owner: "Roberto Jiménez",
    condition: "Bueno",
    image: cronicaMuerte,
  },
];
