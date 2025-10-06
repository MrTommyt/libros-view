// UserSignIn.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
    baseURL: "http://localhost:8080", // ajusta si usas /api o context-path
    headers: { "Content-Type": "application/json" },
});

export default class UserSignIn {
    async login(email, password) {
        const { data } = await api.post("/api/v1/auth/login", { email, password });
        // data debe ser el token en texto. Si devuelves un objeto {token: "..."} ajústalo:
        const token = typeof data === "string" ? data : data.token;
        this.saveToken(token);

        const userId = this.getUserIdFromToken(token); // claim "UserId"
        if (userId) this.saveUserId(userId);

        return { token, userId };
    }

    saveToken(token) {
        localStorage.setItem("auth-token", token);
    }
    getToken() {
        return localStorage.getItem("auth-token");
    }
    clearToken() {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user-id");
    }

    saveUserId(userId) {
        localStorage.setItem("user-id", String(userId));
    }
    getUserId() {
        return localStorage.getItem("user-id");
    }

    isAuthenticated() {
        const token = this.getToken();
        if (!token) return false;
        return !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const { exp } = jwtDecode(token);
            const now = Math.floor(Date.now() / 1000);
            return exp <= now; // true si expiró
        } catch {
            return true;
        }
    }

    getUserIdFromToken(token) {
        try {
            const decoded = jwtDecode(token);
            // Backend: guardaste el ID en la claim "UserId"
            return decoded?.UserId || decoded?.sub || null;
        } catch {
            return null;
        }
    }
}
