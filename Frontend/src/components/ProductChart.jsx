import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", total: 3200, high: 1800, low: 900 },
  { month: "Feb", total: 2100, high: 1400, low: 700 },
  { month: "Mar", total: 2800, high: 1700, low: 1000 },
  { month: "Apr", total: 1200, high: 700, low: 400 },
  { month: "May", total: 2400, high: 1500, low: 700 },
  { month: "Jun", total: 3400, high: 2200, low: 900 },
  { month: "Jul", total: 1800, high: 900, low: 500 },
  { month: "Aug", total: 2600, high: 1700, low: 700 },
  { month: "Sep", total: 3900, high: 2500, low: 1200 },
  { month: "Oct", total: 3100, high: 1900, low: 900 },
  { month: "Nov", total: 3400, high: 2200, low: 1000 },
  { month: "Dec", total: 1700, high: 900, low: 500 },
];

export default function ProductChart() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-700">
          Total Product Details
        </h2>

        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>This Year</option>
          <option>Last Year</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="total"
            fill="#22C55E"
            radius={[5, 5, 0, 0]}
          />

          <Bar
            dataKey="high"
            fill="#8B5CF6"
            radius={[5, 5, 0, 0]}
          />

          <Bar
            dataKey="low"
            fill="#3B82F6"
            radius={[5, 5, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}