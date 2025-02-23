import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import register from '../assets/register.png';
import '../components/Registro.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="registro-container">
      <div className="header-bar"></div>
      <div className="footer-bar"></div>

      <div className="form-box">
        <form>
          <div className="form-group">
            <label htmlFor="email" className="label-campo">
              E-MAIL
            </label>
            <input
              id="email"
              type="email"
              placeholder="Parcero@gmail.com"
              className="input-campo"
              aria-label="Correo electrónico"
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="password" className="label-campo">
              CONTRASEÑA
            </label>
            <div className="password-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="**********"
                className="input-campo"
                aria-label="Contraseña"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🔒" : "👁️"}
              </button>
            </div>
          </div>

          <Link to="/register" className="registro-link">
            ¿Aún no estás registrado?
          </Link>
        </form>
      </div>

      <div className="contenido-derecha">
        <h1>¡Bienvenido a UNHábito!</h1>
        <img
          src={register}
          alt="Ilustración de inicio de sesión"
          className="imagen-habitos"
        />
        <p className="texto">
          Entra para que juntos desarrollemos tus hábitos.
        </p>
      </div>

      <button className="btn-registrar">
        Entrar
      </button>
    </div>
  );
};

export default Login;
