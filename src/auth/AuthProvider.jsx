import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({
                    email: decoded.sub,
                    clientId: decoded.clientId,
                });
                localStorage.setItem("token", token);
            } catch (e) {
                setUser(null);
            }
        } else {
            setUser(null);
            localStorage.removeItem("token");
        }
    }, [token]);

    function login(newToken) {
        setToken(newToken);
    }
    function logout() {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
