import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const formatFecha = (fecha) => {
  const opciones = { day: "numeric", month: "long", year: "numeric" };
  return new Date(fecha).toLocaleDateString("es-ES", opciones);
};

const LineChartComponent = ({ data, title = "Páginas Leídas" }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center overflow-hidden">
      {/* Mostrar el título arriba del gráfico */}
      <h2 className="text-lg font-bold text-center mb-2">{title}</h2>
      <LineChart width={600} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#5F936C" strokeWidth={2} />
      </LineChart>
    </div>
  );
};

export { LineChartComponent };
