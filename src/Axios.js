import axios from "axios"

axios.defaults.baseURL = 'http://localhost:8080/'
// const api = axios.create({ baseURL: "http://localhost:8080/api/v1" });
// api.get("/exchange/sent");
// api.get("/exchange/received");

const token = window.localStorage.getItem('auth-token')

if (token !== null) {
    axios.defaults.headers.common['Authorization'] ='Bearer ' + token
    console.log(token);
}