import axios from 'axios';

export class UserSignUp {
    saveUser(user) {
        return axios.post("auth/signup", user)
            .then(response => {
                console.log("Usuario registrado exitosamente:", response.data);
                return response.data;
            })
            .catch(error => {
                console.error("Error al registrar el usuario:", error.response?.data || error.message);
                throw error;
            });
    }
}