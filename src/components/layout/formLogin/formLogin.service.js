import axios from 'axios';

export function autenticar(senha, email) {
    const loginDto = {
        email: email,
        senha: senha
    }

    const baseURL = import.meta.env.VITE_BASE_URL;

    return axios.post(`${baseURL}/login`, loginDto)
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao se autenticar:", err);
            throw err; 
        });
}