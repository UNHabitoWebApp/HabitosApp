import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const PieChartComponent = ({ data, title = "Distribución de Respuestas" }) => {
  const colors = ["#3498db", "#e74c3c"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center overflow-hidden">
      {/* Título */}
      <h2 className="text-lg font-bold text-center mb-4">{title}</h2>

      {/* Gráfico de pastel */}
      <PieChart width={300} height={300}>
        <Pie 
          data={data} 
          dataKey="value" 
          nameKey="name" 
          cx="50%" 
          cy="50%" 
          outerRadius={100} 
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export { PieChartComponent };
