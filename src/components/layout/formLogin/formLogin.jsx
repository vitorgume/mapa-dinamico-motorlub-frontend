import { useState } from 'react';
import './formLogin.css';
import { autenticar } from './formLogin.service';
import { useNavigate } from 'react-router-dom';
import { notificarErro, notificarSucesso } from '../../../utils/notificacao';

export default function FormLogin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    function togglePassword() {
        const input = document.getElementById("password");
        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        let loginResponse;

        try {
            loginResponse = await autenticar(senha, email);
        } catch (error) {
            notificarErro("Credências erradas !");
            console.error(error);
        }

        localStorage.setItem("token", loginResponse.token);
        localStorage.setItem("id-representante", loginResponse.idRepresentante);

        navigate('/menu');

        notificarSucesso("Autenticação concluida com sucesso.")
    }

    return (
        <>
            <form id="loginForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="password">Senha</label>
                    <div className="password-container">
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={togglePassword}
                        >
                            👁️
                        </button>
                    </div>
                </div>

                <button type="submit" className="login-button" id="loginBtn">
                    Entrar
                </button>
            </form>
        </>
    );
}
