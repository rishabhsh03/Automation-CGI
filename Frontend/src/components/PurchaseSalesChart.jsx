import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", purchase: 4200, sales: 3500 },
  { month: "Feb", purchase: 3800, sales: 3000 },
  { month: "Mar", purchase: 5200, sales: 4300 },
  { month: "Apr", purchase: 4800, sales: 3900 },
  { month: "May", purchase: 6100, sales: 5000 },
  { month: "Jun", purchase: 5800, sales: 4700 },
  { month: "Jul", purchase: 6500, sales: 5400 },
  { month: "Aug", purchase: 6000, sales: 4900 },
  { month: "Sep", purchase: 7200, sales: 6200 },
  { month: "Oct", purchase: 6900, sales: 5600 },
  { month: "Nov", purchase: 7500, sales: 6400 },
  { month: "Dec", purchase: 8200, sales: 7100 },
];

export default function PurchaseSalesChart() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-700">
            Purchase & Sales
          </h2>

          <p className="text-gray-400 text-sm">
            Monthly comparison
          </p>
        </div>

        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>This Year</option>
          <option>Last Year</option>
        </select>

      </div>

      <ResponsiveContainer width="100%" height={350}>

        <AreaChart data={data}>

          <defs>

            <linearGradient id="purchase" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
            </linearGradient>

            <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>

          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Area
            type="monotone"
            dataKey="purchase"
            stroke="#22C55E"
            fill="url(#purchase)"
            strokeWidth={3}
          />

          <Area
            type="monotone"
            dataKey="sales"
            stroke="#3B82F6"
            fill="url(#sales)"
            strokeWidth={3}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}