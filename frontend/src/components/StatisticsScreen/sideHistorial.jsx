import React from "react";

const formatFecha = (fecha) => {
  const opciones = { day: "numeric", month: "long", year: "numeric" };
  return new Date(fecha).toLocaleDateString("es-ES", opciones);
};

const DataDisplay = ({ data }) => {
  return (
    <div className="p-4 max-w-lg mx-auto max-h-[60vh] overflow-y-auto">
      {Object.entries(data).map(([fecha, valores]) => (
        <div
          key={fecha}
          className="mb-4 p-4 bg-[#5F936C] border-2 border-[#5F936C] rounded-lg shadow-md"
        >
          <h2 className="text-lg font-bold mb-2 text-white">
            {formatFecha(fecha)}
          </h2>
          <ul className="list-disc pl-5 text-white">
            {valores.map(([variable, valor], index) => (
              <li key={index} className="mb-1">
                <strong>Variable {variable}:</strong> {valor.toString()}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DataDisplay;
