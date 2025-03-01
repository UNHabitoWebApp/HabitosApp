import React from "react";
import { BarChartComponent } from "../components/StatisticsScreen/barChart";
import { LineChartComponent } from "../components/StatisticsScreen/lineChart";
import { PieChartComponent } from "../components/StatisticsScreen/pieChart";
import DataDisplay from "../components/StatisticsScreen/sideHistorial";

const StatisticsScreen = () => {
  const lineData = [
    { date: "2024-12-05", value: 80 },
    { date: "2024-12-04", value: 70 },
    { date: "2024-12-03", value: 60 },
    { date: "2024-12-02", value: 50 },
  ];

  const pieData = [
    { name: "Sí", value: 70 },
    { name: "No", value: 30 },
  ];

  const barData = [
    { label: "Ficción", value: 40 },
    { label: "Aventura", value: 20 },
    { label: "Historia", value: 10 },
    { label: "Anime", value: 60 },
  ];

  const historialData = {
    "2024-12-05": [["Paginas Leídas", 4], ["Disfrutaste la lectura", "Sí"], ["Tipo de Lectura", "Aventura"]],
    "2024-12-04": [["Paginas Leídas", 15], ["Disfrutaste la lectura", "No"], ["Tipo de Lectura", "Aventura"]],
    "2024-12-02": [["Paginas Leídas", 2], ["Disfrutaste la lectura", "Sí"], ["Tipo de Lectura", "Ficción"]],
    "2024-12-01": [["Paginas Leídas", 4], ["Disfrutaste la lectura", "Sí"], ["Tipo de Lectura", "Aventura"]],
    "2024-11-30": [["Paginas Leídas", 15], ["Disfrutaste la lectura", "No"], ["Tipo de Lectura", "Aventura"]],
    "2024-11-29": [["Paginas Leídas", 2], ["Disfrutaste la lectura", "Sí"], ["Tipo de Lectura", "Ficción"]],
  };

  return (
    <div className="p-8 bg-verdeFondo display:flex justify-center items-center">
      <div className="p-8 bg-[#ADD9C5] min-h-screen rounded-md ">
        <h1 className="text-center text-2xl font-bold text-green-800 mb-6">Seguimiento Habito/Ejercicio Journaling</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <DataDisplay data={historialData} />
          </div>
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 flex justify-center items-center">
            <LineChartComponent data={lineData} />
          </div>

            <PieChartComponent data={pieData} />
            <BarChartComponent data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsScreen;
