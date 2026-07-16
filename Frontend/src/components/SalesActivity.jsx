import {
  FaClipboardList,
  FaTruck,
  FaCheckCircle,
  FaUndo,
} from "react-icons/fa";

const activities = [
  {
    title: "Pending Orders",
    value: 24,
    icon: <FaClipboardList />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Ready To Ship",
    value: 15,
    icon: <FaTruck />,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Delivered",
    value: 132,
    icon: <FaCheckCircle />,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Returned",
    value: 8,
    icon: <FaUndo />,
    color: "bg-red-100 text-red-600",
  },
];

export default function SalesActivity() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Sales Activity
          </h2>

          <p className="text-sm text-gray-500">
            Order Status Overview
          </p>
        </div>

        <button className="text-sm text-green-600 font-semibold hover:underline">
          View All
        </button>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-2 gap-4">

        {activities.map((item) => (
          <div
            key={item.title}
            className="border rounded-xl p-4 hover:shadow-lg transition"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${item.color}`}
            >
              {item.icon}
            </div>

            <h3 className="mt-4 text-3xl font-bold">
              {item.value}
            </h3>

            <p className="text-gray-500 mt-1">
              {item.title}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}