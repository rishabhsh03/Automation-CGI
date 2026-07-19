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
<BarChart data={chartData}></BarChart>
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

        <ResponsiveContainer width="100%" height={350}>

          <BarChart
            data={categories}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
            />

            <XAxis
              dataKey="category"
              stroke="#CBD5E1"
              angle={-30}
              textAnchor="end"
              interval={0}
              height={70}
            />

            <YAxis
              stroke="#CBD5E1"
            />

            <Tooltip />

            <Bar
              dataKey="total"
              fill="#3B82F6"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}