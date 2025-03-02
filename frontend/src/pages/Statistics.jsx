import React, { useState } from "react";
import { BarChartComponent } from "../components/StatisticsScreen/barChart";
import { LineChartComponent } from "../components/StatisticsScreen/lineChart";
import { PieChartComponent } from "../components/StatisticsScreen/pieChart";
import DataDisplay from "../components/StatisticsScreen/sideHistorial";

const StatisticsScreen = () => {
  const [selectedView, setSelectedView] = useState("Mosaico");

  const lineData = [
    { date: "2024-12-09", value: 4 },
    { date: "2024-12-07", value: 15 },
    { date: "2024-12-05", value: 4 },
    { date: "2024-12-04", value: 15 },
    { date: "2024-12-03", value: 2 },
  ];

  const pieData = [
    { name: "Sí", value: 3},
    { name: "No", value: 2},
  ];

  const barData = [
    { label: "Ficción", value: 2 },
    { label: "Aventura", value: 3 },
  ];

  const historialData = {
    "2024-12-09": [["Paginas Leídas", 4], ["Disfrutaste la lectura", "Sí"], ["Tipo de Lectura", "Aventura"]],
    "2024-12-07": [["Paginas Leídas", 15], ["Disfrutaste la lectura", "No"], ["Tipo de Lectura", "Ficcion"]],
    "2024-12-05": [["Paginas Leídas", 4], ["Disfrutaste la lectura", "Sí"], ["Tipo de Lectura", "Aventura"]],
    "2024-12-04": [["Paginas Leídas", 15], ["Disfrutaste la lectura", "No"], ["Tipo de Lectura", "Aventura"]],
    "2024-12-02": [["Paginas Leídas", 2], ["Disfrutaste la lectura", "Sí"], ["Tipo de Lectura", "Ficción"]],
  };

  const getSelectedChart = () => {
    switch (selectedView) {
      case "Paginas Leídas":
        return <LineChartComponent data={lineData} title="Páginas Leídas" />;
      case "Disfrutaste la lectura":
        return <PieChartComponent data={pieData} title="Disfrutaste la lectura" />;
      case "Tipo de Lectura":
        return <BarChartComponent data={barData} title="Tipo de Lectura" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#E6F2E6] flex flex-col items-center min-h-screen h-full py-4 px-2 w-full">
      <h1 className="text-2xl font-bold text-green-800 mb-4 p-2 border rounded-lg bg-green-100">
        Seguimiento Hábito/Ejercicio Journaling
      </h1>
      <div className="flex justify-end w-full max-w-full mb-4 px-4">
        <select
          className="p-2 border border-black rounded-md bg-white text-black"
          value={selectedView}
          onChange={(e) => setSelectedView(e.target.value)}
        >
          <option value="Mosaico">Mosaico (TODAS)</option>
          <option value="Paginas Leídas">Páginas Leídas</option>
          <option value="Disfrutaste la lectura">Disfrutaste la lectura</option>
          <option value="Tipo de Lectura">Tipo de Lectura</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-full px-4">
        <div className="col-span-1 bg-[#C7E2D0] p-6 rounded-xl shadow-md border">
          <DataDisplay data={historialData} />
        </div>
        <div className="col-span-2 flex flex-col gap-4 items-center w-full">
          {selectedView === "Mosaico" ? (
            <>
              <LineChartComponent data={lineData} title="Páginas Leídas" />
              <div className="grid grid-cols-2 gap-4 w-full">
                <PieChartComponent data={pieData} title="Disfrutaste la lectura" />
                <BarChartComponent data={barData} title="Tipo de Lectura" />
              </div>
            </>
          ) : (
            getSelectedChart()
          )}
        </div>
      </div>
      <button className="mt-4 px-4 py-2 border-2 border-black rounded-full text-black hover:bg-black hover:text-white transition">
        Volver al inicio
      </button>
    </div>
  );
};

export default StatisticsScreen;