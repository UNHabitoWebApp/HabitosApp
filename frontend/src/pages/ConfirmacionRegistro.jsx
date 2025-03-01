import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmacionRegistro = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F0F7F5] overflow-x-hidden">
      {/* Header */}
      <header className="w-full h-20 bg-[#5F936C] fixed top-0 z-50" />
      {/* Footer */}
      <footer className="w-full h-9 bg-[#5F936C] fixed bottom-0 left-0 right-0 z-50" />
      
      {/* Confirmation Box */}
      <div 
        className="
          absolute 
          left-1/2 
          top-1/2 
          -translate-x-1/2 
          -translate-y-1/2 
          w-[90%]
          sm:w-[80%]
          md:w-[70%]
          max-w-[561px]
          h-auto
          min-h-[380px]
          bg-[#ADD9C5] 
          border-2 
          border-[#5F936C] 
          rounded-[20px] 
          flex 
          flex-col 
          items-center 
          justify-center
          cursor-pointer 
          hover:bg-[#9CC5B3] 
          transition-colors
          p-6
          space-y-6
          sm:space-y-8
        "
        onClick={handleClick}
      >
        {/* Welcome Text */}
        <h2 className="
          font-prompt 
          text-xl
          sm:text-2xl 
          text-center 
          px-4
        ">
          Gracias por unirte &lt;3
        </h2>

        {/* Check Circle Icon */}
        <div className="
          relative 
          w-24 
          h-24 
          sm:w-28 
          sm:h-28
          md:w-32 
          md:h-32
        ">
          <svg 
            viewBox="0 0 24 24" 
            className="w-full h-full"
            fill="none" 
            stroke="#333333" 
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12l3 3 5-5" />
          </svg>
        </div>
        
        {/* Message Text */}
        <p className="
          w-full
          max-w-[528px]
          font-prompt 
          text-lg
          sm:text-xl
          text-center 
          text-black 
          drop-shadow-md
          px-4
        ">
          ¡Juntos vamos a mejorar la consistencia en tus hábitos!
        </p>
      </div>
    </div>
  );
};

export default ConfirmacionRegistro;