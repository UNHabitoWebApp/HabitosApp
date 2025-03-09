import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const formatFecha = (fecha) => {
  const opciones = { day: "numeric", month: "long", year: "numeric" };
  return new Date(fecha).toLocaleDateString("es-ES", opciones);
};

const LineChartComponent = ({ data, title = "Páginas Leídas" }) => {
  const [width, setWidth] = useState(window.innerWidth > 1100 ? 600 : window.innerWidth > 800 ? 400 : window.innerWidth - 100);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth > 1100 ? 600 : window.innerWidth > 820 ? 400 : window.innerWidth - 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center overflow-hidden">
      <h2 className="text-lg font-bold text-center mb-2">{title}</h2>
      <LineChart width={width} height={250} data={data}>
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
