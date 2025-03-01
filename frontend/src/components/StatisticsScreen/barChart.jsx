import React from "react";
import { XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from "recharts";
const BarChartComponent = ({ data }) => {
    return (
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8e44ad" />
      </BarChart>
    );
  };
  
  export {BarChartComponent };
  