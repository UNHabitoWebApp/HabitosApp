import React, { useState } from 'react';
import './Registro.css';
import register from '../assets/register.png';

function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  
  // Mensaje de error si las contraseñas no coinciden
  const passwordMismatch = password !== confirm && confirm.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordMismatch) {
      alert('¡Las contraseñas no coinciden!');
      return;
    }
    // Lógica de registro aquí
    console.log({ email, password, confirm });
  };

return (
    <div className="registro-container">
        {/* Barra superior */}
        <div className="header-bar"></div>

        {/* Barra inferior */}
        <div className="footer-bar"></div>

        {/* Caja principal con campos */}
        <div className="form-box">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="label-campo">
                    E-MAIL
                </label>
                <input
                    type="email"
                    id="email"
                    className="input-campo"
                    placeholder="Ingresa tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                <label htmlFor="password" className="label-campo">
                    CONTRASEÑA
                </label>
                <input
                    type="password"
                    id="password"
                    className="input-campo"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="confirm" className="label-campo">
                    CONFIRMAR CONTRASEÑA
                </label>
                <input
                    type="password"
                    id="confirm"
                    className="input-campo"
                    placeholder="Repite tu contraseña"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />

                {passwordMismatch && (
                    <p className="error-text">
                        ¡El campo de contraseña y confirmar contraseña deben coincidir!
                    </p>
                )}
            </form>
        </div>

        {/* Texto e imagen a la derecha */}
        <div className="contenido-derecha">
            <h1>¡Bienvenido a UNHábito!</h1>
            <img
                src={register}
                className="imagen-habitos"
            />
            <p className="texto">
                Nos alegra mucho que estés aquí, <br />
                regístrate para mejorar tus hábitos
            </p>
        </div>
        <button type="submit" className="btn-registrar">
            Registrarme
        </button>
    </div>
);
}

export default Registro;
