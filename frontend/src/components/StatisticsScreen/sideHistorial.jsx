import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const formatFecha = (fecha) => {
  const opciones = { day: "numeric", month: "long", year: "numeric" };
  return new Date(fecha).toLocaleDateString("es-ES", opciones);
};

const LineChartComponent = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center overflow-hidden">
      <LineChart width={600} height={350} data={data}>
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