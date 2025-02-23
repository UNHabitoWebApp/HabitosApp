import React from 'react';
import Login from '../pages/Login'; // Asegúrate de que la ruta es correcta

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-black mb-4">Bienvenido a la Página Principal</h1>
      <Login /> {/* Aquí se renderiza el componente Login */}
    </div>
  );
};

export default Home;
