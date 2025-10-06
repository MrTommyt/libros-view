import React from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import BooksSection from "./components/BooksSection.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Footer from "./components/Footer.jsx";
import AllBooks from "./components/AllBooks.jsx";
import PublishBook from "./components/PublishBook.jsx";
import LoginPage from "./auth/LoginPage.jsx";
import RegisterPage from "./auth/RegisterPage.jsx";
import Profile from "./auth/Profile.jsx";
import MyBooks from "./pages/MyBooks.jsx";
import MySentExchanges from "./pages/MySentExchanges.jsx";
import MyReceivedExchanges from "./pages/MyReceivedExchanges.jsx";
import ConfirmExchange from "./pages/ConfirmExchange.jsx";
import { AuthProvider } from "./auth/AuthProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyExchanges from "./pages/MyExchanges";

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
        path: "/publish",
        element: (
            <>
                <Header />
                <PublishBook
                    // El clientId aquí sería dinámico si el usuario está logueado
                    // Puedes obtener el clientId del contexto de autenticación
                    titlesBase="http://localhost:8080/api/v1/titles"
                    booksBase="http://localhost:8080/api/v1/books"
                />
                <Footer />
            </>
        ),
    },
    {
        path: "/login",
        element: (
            <>
                <Header />
                <LoginPage />
                <Footer />
            </>
        ),
    },
    {
        path: "/register",
        element: (
            <>
                <Header />
                <RegisterPage />
                <Footer />
            </>
        ),
    },
    {
        path: "/profile",
        element: (
            <>
                <Header />
                <Profile />
                <Footer />
            </>
        ),
    },
    {
        path: "/my-books",
        element: (
            <>
                <Header />
                <MyBooks />
                <Footer />
            </>
        ),
    },
    {
        path: "/my-exchanges/sent",
        element: (
            <>
                <Header />
                <MySentExchanges />
                <Footer />
            </>
        ),
    },
    {
        path: "/my-exchanges/received",
        element: (
            <>
                <Header />
                <MyReceivedExchanges />
                <Footer />
            </>
        ),
    },
    {
        path: "/exchange/confirm/:bookId",
        element: (
            <>
                <Header />
                <ConfirmExchange />
                <Footer />
            </>
        ),
    },
    {
        path: "/my-exchanges",
        element: (
            <>
                <Header />
                <MyExchanges />
                <Footer />
            </>
        ),
    }
]);

export default function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}
