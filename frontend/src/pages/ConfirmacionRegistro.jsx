import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmacionRegistro = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="relative w-full h-screen bg-[#F0F7F5]">
      {/* Header */}
      <div className="absolute w-full h-20 bg-[#5F936C]" />
      
      {/* Footer */}
      <div className="absolute bottom-0 w-full h-[35px] bg-[#5F936C]" />
      
      {/* Confirmation Box */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[561px] h-[380px] bg-[#ADD9C5] border-2 border-[#5F936C] rounded-[20px] flex flex-col items-center cursor-pointer hover:bg-[#9CC5B3] transition-colors"
        onClick={handleClick}
      >
        {/* Welcome Text */}
        <h2 className="font-prompt text-xl mt-8">
          Gracias por unirte &lt;3
        </h2>

        {/* Check Circle Icon */}
        <div className="relative w-[136px] h-[137px] mt-8">
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
        <p className="w-[528px] font-prompt text-xl text-center text-black mt-8 drop-shadow-md">
          ¡Juntos vamos a mejorar la consistencia en tus hábitos!
        </p>
      </div>
    </div>
  );
};

export default ConfirmacionRegistro;