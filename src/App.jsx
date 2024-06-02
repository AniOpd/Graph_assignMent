import React from "react";
import "./App.css";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import data from "./eve.json";
const transformedData = data.map((item) => ({
  timestamp: item.timestamp,
  src_ip: item.src_ip,
  dest_ip: item.dest_ip,
  severity: item.alert?.severity,
  rev: item.alert?.rev,
  signatureId: item.alert?.signature_id,
}));
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042" ,"blue","red","green","yellow","black","orange"];

const App = () => {
  return (
    <>
      <div className="container">
        <h1>Network Alerts Dashboard</h1>
        <div>
          <h2>Line Chart - Severity Over Time</h2>
          <div className="line-Chart chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transformedData}>
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="severity" stroke="orange" />
              </LineChart>
            </ResponsiveContainer>
          </div>


          <h2>Line Chart - rev over destination input</h2>
          <div className="line-Chart chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transformedData}>
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="dest_ip" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rev" stroke="yellow" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          
          <h2>Bar Chart - Alerts by Source IP</h2>
          <div className="bar-chart chart">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transformedData}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="src_ip" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="rev" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <h2>Pie Chart - rev Distribution</h2>
          <div className="pie-chart chart">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={transformedData}
                  dataKey="rev"
                  nameKey="rev"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {transformedData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
