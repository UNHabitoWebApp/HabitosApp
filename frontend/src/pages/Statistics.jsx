import React, { useState, useEffect } from "react";
import { BarChartComponent, DataDetails } from "../components/StatisticsScreen/barChart";
import { LineChartComponent } from "../components/StatisticsScreen/lineChart";
import { PieChartComponent } from "../components/StatisticsScreen/pieChart";
import { useParams } from "react-router-dom";
import DataDisplay from "../components/StatisticsScreen/sideHistorial";
import HabitList from '../components/HabitList';
import getData from "../service/get.js"; // Asume que tienes un servicio para hacer solicitudes HTTP

const StatisticsScreen = () => {
  const [selectedView, setSelectedView] = useState("Mosaico");
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [historialData, setHistorialData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(`habitLog/habitLog/${id}`);
        const data = response;
        console.log(data);
        // Procesar los datos para los gráficos
        const processedLineData = [];
        const processedPieData = [];
        const processedBarData = [];
        const processedHistorialData = {};

        data.forEach(log => {
          const date = new Date(log.date).toISOString().split('T')[0]; // Formatear la fecha

          log.variables.forEach(variable => {
            if (variable.name === "Paginas Leídas") {
              processedLineData.push({ date, value: parseInt(variable.value) });
            } else if (variable.name === "Disfrutaste la lectura") {
              processedPieData.push({ name: variable.value, value: 1 });
            } else if (variable.name === "Tipo de Lectura") {
              processedBarData.push({ label: variable.value, value: 1 });
            }

            // Organizar datos para el historial
            if (!processedHistorialData[date]) {
              processedHistorialData[date] = [];
            }
            processedHistorialData[date].push([variable.name, variable.value]);
          });
        });

        // Agrupar y contar datos para el gráfico de pastel y barras
        const pieDataGrouped = processedPieData.reduce((acc, curr) => {
          if (acc[curr.name]) {
            acc[curr.name].value += 1;
          } else {
            acc[curr.name] = { name: curr.name, value: 1 };
          }
          return acc;
        }, {});

        const barDataGrouped = processedBarData.reduce((acc, curr) => {
          if (acc[curr.label]) {
            acc[curr.label].value += 1;
          } else {
            acc[curr.label] = { label: curr.label, value: 1 };
          }
          return acc;
        }, {});

        // Actualizar el estado
        setLineData(Object.values(processedLineData));
        setPieData(Object.values(pieDataGrouped));
        setBarData(Object.values(barDataGrouped));
        setHistorialData(processedHistorialData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const getSelectedChart = () => {
    switch (selectedView) {
      case "Paginas Leídas":
        return (
          <>
            <LineChartComponent data={lineData} title="Páginas Leídas" />
            <DataDetails data={lineData} />
          </>
        );
      case "Disfrutaste la lectura":
        return (
          <>
            <PieChartComponent data={pieData} title="Disfrutaste la lectura" />
            <DataDetails data={pieData} />
          </>
        );
      case "Tipo de Lectura":
        return (
          <>
            <BarChartComponent data={barData} title="Tipo de Lectura" />
            <DataDetails data={barData} />
          </>
        );
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