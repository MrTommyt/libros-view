import React from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import BooksSection from "./components/BooksSection.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Footer from "./components/Footer.jsx";

// Importa router de react-router-dom v7
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllBooks from "./components/AllBooks.jsx";

// Define tus rutas
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
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
