import "./ProductChart.css";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function ProductChart({ categories = [] }) {
  const chartData = categories
    .map((item) => ({
      category: item.category,
      total: Number(item.total),
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10); // Show only top 10 categories
  if (!categories || categories.length === 0) {
    return (
      <div className="product-chart">
        <h2>Products by Category</h2>
        <p>No data available</p>
      </div>
    );
  }

  console.log("Categories:", categories);
  return (
    <div className="product-chart">
      <div className="product-chart-header">
        <div>
          <h2>Products by Category</h2>
          <p>Current Inventory Distribution</p>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="150%" height={350}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 460,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

            <XAxis
              dataKey="category"
              angle={-45}
              textAnchor="end"
              interval={0}
              height={110}
              tick={{ fill: "#CBD5E1", fontSize: 12 }}
            />

            <YAxis stroke="#CBD5E1" />

            <Tooltip />

            <Bar dataKey="total" barSize={28} fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
