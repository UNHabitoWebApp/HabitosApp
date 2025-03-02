import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button
      className="w-[219px] h-[41px] bg-[#569788] text-white rounded-[20px] text-lg"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
