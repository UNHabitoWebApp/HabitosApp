import React from 'react';
import Login from '../pages/Login'; // Asegúrate de que la ruta es correcta

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Login /> {/* Aquí se renderiza el componente Login */}
    </div>
  );
};

export default Home;
