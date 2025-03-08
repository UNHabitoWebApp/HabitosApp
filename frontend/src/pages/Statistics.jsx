import React, { useState, useEffect } from "react";
import { BarChartComponent, DataDetails } from "../components/StatisticsScreen/barChart";
import { LineChartComponent } from "../components/StatisticsScreen/lineChart";
import { PieChartComponent } from "../components/StatisticsScreen/pieChart";
import { useParams } from "react-router-dom";
import DataDisplay from "../components/StatisticsScreen/sideHistorial";
import getData from "../service/get.js"; // Service for HTTP requests

const StatisticsScreen = () => {
  const [selectedView, setSelectedView] = useState("Mosaico");
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [historialData, setHistorialData] = useState({});
  const [habitName, setHabitName] = useState("");
  const [variableNames, setVariableNames] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchHabitData = async () => {
      try {
        // Fetch habit data
        const habitResponse = await getData(`edit_habits/edit/${id}`);
        console.log("Habit Data:", habitResponse);
        const habitData = habitResponse;

        // Set habit name
        setHabitName(habitData.name);

        // Extract variable names and types
        const variableNamesMap = {};
        habitData.variables.forEach(variable => {
          variableNamesMap[variable.id] = { name: variable.name, type: variable.type };
        });
        setVariableNames(variableNamesMap);
        console.log("Variable Names Map:", variableNamesMap);

        // Fetch habit logs
        const logsResponse = await getData(`habitLog/habitLog/${id}`);
        console.log("Habit Logs:", logsResponse);
        const logsData = logsResponse;

        // Process logs data for charts
        const processedLineData = [];
        const processedPieData = [];
        const processedBarData = [];
        const processedHistorialData = {};

        logsData.forEach(log => {
          const date = new Date(log.date).toISOString().split('T')[0]; // Format date

          log.variables.forEach(variable => {
            const variableInfo = variableNamesMap[variable.id]; // Match variable.id to habitData.variables.id

            if (!variableInfo) {
              console.warn(`Variable info not found for ID: ${variable.id}`);
              return; // Skip if variable info is not found
            }

            // Determine chart type based on variable type
            if (variableInfo.type === "integer" || variableInfo.type === "number") {
              processedLineData.push({ date, value: parseFloat(variable.value) });
            } else if (variableInfo.type === "boolean") {
              processedPieData.push({ name: variable.value === "true" ? "Sí" : "No", value: 1 });
            } else if (variableInfo.type === "enum") {
              processedBarData.push({ label: variable.value, value: 1 });
            }

            // Organize data for historial
            if (!processedHistorialData[date]) {
              processedHistorialData[date] = [];
            }
            processedHistorialData[date].push([variableInfo.name, variable.value]);
          });
        });

        console.log("Processed Line Data:", processedLineData);
        console.log("Processed Pie Data:", processedPieData);
        console.log("Processed Bar Data:", processedBarData);
        console.log("Processed Historial Data:", processedHistorialData);

        // Group and count data for pie and bar charts
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

        console.log("Grouped Pie Data:", pieDataGrouped);
        console.log("Grouped Bar Data:", barDataGrouped);

        // Update state
        setLineData(Object.values(processedLineData));
        setPieData(Object.values(pieDataGrouped));
        setBarData(Object.values(barDataGrouped));
        setHistorialData(processedHistorialData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHabitData();
  }, [id]);

  const getSelectedChart = () => {
    switch (selectedView) {
      case "Mosaico":
        return (
          <>
            {lineData.length > 0 && (
              <LineChartComponent data={lineData} title={Object.values(variableNames).find(v => v.type === "integer" || v.type === "number")?.name || "Line Chart"} />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {pieData.length > 0 && (
                <PieChartComponent data={pieData} title={Object.values(variableNames).find(v => v.type === "boolean")?.name || "Pie Chart"} />
              )}
              {barData.length > 0 && (
                <BarChartComponent data={barData} title={Object.values(variableNames).find(v => v.type === "enum")?.name || "Bar Chart"} />
              )}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#E6F2E6] flex flex-col items-center min-h-screen h-full py-4 px-2 w-full">
      <h1 className="text-2xl font-bold text-green-800 mb-4 p-2 border rounded-lg bg-green-100">
        Seguimiento de {habitName}
      </h1>
      <div className="flex justify-end w-full max-w-full mb-4 px-4">
        <select
          className="p-2 border border-black rounded-md bg-white text-black"
          value={selectedView}
          onChange={(e) => setSelectedView(e.target.value)}
        >
          <option value="Mosaico">Mosaico (TODAS)</option>
          {Object.values(variableNames).map((variable, index) => (
            <option key={index} value={variable.name}>{variable.name}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-full px-4">
        <div className="col-span-1 bg-[#C7E2D0] p-6 rounded-xl shadow-md border">
          <DataDisplay data={historialData} />
        </div>
        <div className="col-span-2 flex flex-col gap-4 items-center w-full">
          {getSelectedChart()}
        </div>
      </div>
      <button className="mt-4 px-4 py-2 border-2 border-black rounded-full text-black hover:bg-black hover:text-white transition">
        Volver al inicio
      </button>
    </div>
  );
};

export default StatisticsScreen;