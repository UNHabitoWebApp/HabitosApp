import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import register from '../assets/register.png';
import { useUserActions } from '../hooks/useUserActions';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { updateUser } = useUserActions();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setEmailError('');

    if (!validateEmail(email)) {
      setEmailError('Por favor, ingresa un correo electrónico válido');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const responseText = await response.text();
      let data;
      
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Error parsing response:', responseText);
        throw new Error('Error en el formato de respuesta del servidor');
      }

      if (response.ok && data.accessToken) {
        // Guardar token en localStorage
        localStorage.setItem('accessToken', data.accessToken);
        
        // Actualizar estado del usuario con la información recibida
        updateUser({
          isLoggedIn: true,
          id: data.user.id,
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName
        });

        navigate('/');
      } else {
        throw new Error(data.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error al iniciar sesión: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen lg:min-h-[80vh] overflow-hidden">
      {/* Encabezado
      <header className="w-full h-20 bg-[#5F936C] fixed top-0 left-0 right-0 z-50" /> */}

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 gap-16 mb-9">
        <div className="flex flex-col items-center relative">
          {/* Sección izquierda (Formulario) */}
          <div
            className="
              box-border
              bg-[#ADD9C5]
              border-2 
              border-[#5F936C]
              rounded-[20px]
              p-6
              flex
              flex-col
              gap-6
              relative
              w-full
              md:w-[552px]
              h-auto
              md:h-[300px]
            "
          >
            {/* Campo de correo */}
            <div className="flex flex-col mt-8">
              <label
                htmlFor="email"
                className="text-[9px] uppercase tracking-widest mb-1"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Parcero@gmail.com"
                className={`
                  h-10 
                  border 
                  ${emailError ? 'border-red-500' : 'border-gray-400'}
                  rounded 
                  px-3 
                  text-sm 
                  focus:outline-none 
                `}
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">
                  {emailError}
                </p>
              )}
            </div>

            {/* Campo de contraseña */}
            <div className="flex flex-col relative">
              <label
                htmlFor="password"
                className="text-[9px] uppercase tracking-widest mb-1"
              >
                Contraseña
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="
                    absolute 
                    left-3 
                    top-1/2 
                    -translate-y-1/2
                    text-gray-600
                    hover:text-gray-800
                    z-10
                  "
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="
                    h-10 
                    w-full
                    border 
                    border-gray-400 
                    rounded 
                    pl-10
                    pr-3 
                    text-sm 
                    focus:outline-none 
                  "
                />
              </div>
            </div>

            {/* Link para registrarse */}
            <div className="text-center mt-auto mb-4">
              <Link to="/register" className="text-sm underline cursor-pointer">
                ¿Aún no estás registrado?
              </Link>
            </div>
          </div>

          {/* Botón Entrar */}
          <button
            onClick={handleLogin}
            className="
              absolute 
              -bottom-12
              lg:-bottom-20
              bg-[#569788] 
              hover:bg-[#4c8577] 
              text-white 
              text-base 
              py-2 
              px-6 
              rounded-full
              z-10
            "
          >
            Entrar
          </button>
        </div>

        {/* Sección derecha (Imagen y textos) */}
        <div
          className="
            w-full 
            lg:w-1/2 
            max-w-lg 
            flex 
            flex-col 
            items-center 
            mt-6 
            lg:mt-0
          "
        >
          {/* Título bienvenido */}
          <h1
            className="
              text-2xl 
              md:text-3xl 
              font-medium 
              text-[#000] 
              text-center 
              mb-4
            "
          >
            ¡Bienvenido a UNHábito!
          </h1>

          {/* Imagen */}
          <img
            src={register}
            className="w-[305px] h-[292px] object-contain"
          />

          {/* Texto descriptivo */}
          <p
            className="
              text-base 
              md:text-lg 
              text-center 
              mt-6
            "
          >
            Entra para que juntos desarrollemos tus hábitos.
          </p>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="w-full h-9 bg-[#5F936C] fixed bottom-0 left-0 right-0 z-50" /> */}
    </div>
  );
};

export default Login;
