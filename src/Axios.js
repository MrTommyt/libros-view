import axios from "axios"

axios.defaults.baseURL = 'http://localhost:8080/'

const token = window.localStorage.getItem('auth-token')

if (token !== null) {
    axios.defaults.headers.common['Authorization'] ='Bearer ' + token
    console.log(token);
}