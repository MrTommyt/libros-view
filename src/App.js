import React from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import BooksSection from "./components/BooksSection.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Footer from "./components/Footer.jsx";
import AllBooks from "./components/AllBooks.jsx";
import PublishBook from "./components/PublishBook.jsx"; // <-- nuevo

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Hero />
        <BooksSection />
        <HowItWorks />
        <Footer />
      </>
    ),
  },
  {
    path: "/AllBooks",
    element: (
      <>
        <Header />
        <AllBooks />
        <Footer />
      </>
    ),
  },
  {
    path: "/publish", // <-- nueva ruta
    element: (
      <>
        <Header />
        <PublishBook
          clientId={null}
          titlesBase="http://localhost:8080/api/v1/titles" // <-- backend
          booksBase="http://localhost:8080/api/v1/books"   // <-- backend
        />

        <Footer />
      </>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
