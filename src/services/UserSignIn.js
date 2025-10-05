// UserSignIn.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export class UserSignIn {
    async login(email, password) {
        try {
            const response = await axios.post('auth/login', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: undefined
                },
            });
            const responseBody = response.data;
            console.log(responseBody);

            this.saveToken(responseBody);
            //this.saveUserId(responseBody);

            alert(JSON.stringify(responseBody));
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 404) {
                if (err.response.data && err.response.data.description) {
                    throw err.response.data.description;
                }
            }
        }
    }

    isAuthenticated() {
        let userId = window.localStorage.getItem("user-id");
        return (userId != null && this.isTokenExpired(this.getToken()));
    }

    saveToken(token) {
        window.localStorage.setItem('auth-token', token);
    }

    saveUserId(userId) {
        window.localStorage.setItem('user-id', userId);
    }

    getToken() {
        return window.localStorage.getItem("auth-token");
    }

    isTokenExpired(token) {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp < currentTime;
        } catch (error) {
            console.error("Invalid token:", error);
            return true;
        }
    }


}
