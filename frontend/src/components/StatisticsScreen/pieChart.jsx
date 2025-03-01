import React from "react";
import { PieChart, Pie, Cell, } from "recharts";

const PieChartComponent = ({ data }) => {
    const colors = ["#3498db", "#e74c3c"];
    return (
      <PieChart width={300} height={300}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
      </PieChart>
    );
  };

  export {PieChartComponent };