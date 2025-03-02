import React from 'react';

const InputField = ({ label, type, placeholder }) => {
  return (
    <div className="flex flex-col w-full mb-4">
      <label className="text-xs font-medium uppercase text-black">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-400 rounded mt-1"
      />
    </div>
  );
};

export default InputField;
