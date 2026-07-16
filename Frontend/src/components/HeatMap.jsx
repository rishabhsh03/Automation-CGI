const products = [
  { name: "CPU", color: "bg-green-500", value: 95 },
  { name: "GPU", color: "bg-blue-500", value: 88 },
  { name: "RAM", color: "bg-purple-500", value: 82 },
  { name: "SSD", color: "bg-pink-500", value: 76 },
  { name: "HDD", color: "bg-yellow-500", value: 68 },
  { name: "Motherboard", color: "bg-indigo-500", value: 92 },
  { name: "Monitor", color: "bg-orange-500", value: 65 },
  { name: "Keyboard", color: "bg-red-500", value: 73 },
  { name: "Mouse", color: "bg-cyan-500", value: 81 },
  { name: "UPS", color: "bg-emerald-500", value: 55 },
  { name: "Networking", color: "bg-violet-500", value: 60 },
  { name: "Accessories", color: "bg-teal-500", value: 45 },
];

export default function HeatMap() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Product Heat Map
          </h2>

          <p className="text-gray-500 text-sm">
            Product popularity
          </p>
        </div>

        <button className="text-green-600 text-sm font-semibold">
          View All
        </button>

      </div>

      {/* Heat Map Grid */}

      <div className="grid grid-cols-3 gap-4">

        {products.map((item) => (

          <div
            key={item.name}
            className={`${item.color} rounded-xl h-24 text-white p-4 flex flex-col justify-between shadow hover:scale-105 transition duration-300`}
          >
            <span className="font-semibold">
              {item.name}
            </span>

            <span className="text-3xl font-bold">
              {item.value}%
            </span>
          </div>

        ))}

      </div>

    </div>
  );
}