import React from "react";
import { XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend, ResponsiveContainer } from "recharts";

const BarChartComponent = ({ data, title = "Distribución de Categorías" }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center w-full max-w-[600px]">
      {/* Título */}
      <h2 className="text-lg font-bold text-center mb-2">{title}</h2>

      {/* Gráfico de barras responsive */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8e44ad" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { BarChartComponent };
