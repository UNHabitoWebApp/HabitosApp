import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import '../components/Registro.css';
import register from '../assets/register.png';

function Registro() {
  const navigate = useNavigate(); // Add this hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const passwordMismatch = password !== confirm && confirm.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación de campos vacíos
    if (!email || !password || !confirm) {
      alert('Por favor, completa todos los campos');
      return;
    }

    if (passwordMismatch) {
      alert('¡Las contraseñas no coinciden!');
      return;
    }

    // Lógica de registro aquí
    console.log({ email, password, confirm });
    // Navegar a la página de confirmación
    navigate('/confirmacion');
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
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="input-campo"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🔒" : "👁️"}
                  </button>
                </div>

                <label htmlFor="confirm" className="label-campo">
                    CONFIRMAR CONTRASEÑA
                </label>
                <div className="password-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm"
                    className="input-campo"
                    placeholder="Repite tu contraseña"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "🔒" : "👁️"}
                  </button>
                </div>

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
        <button 
            type="submit" 
            className="btn-registrar"
            onClick={handleSubmit}
        >
            Registrarme
        </button>
    </div>
);
}

export default Registro;
