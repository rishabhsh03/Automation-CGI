import {
  FaThLarge,
  FaBoxes,
  FaShoppingCart,
  FaTruck,
  FaFileAlt,
  FaPlug,
  FaChartBar,
  FaUsers,
  FaFileInvoice,
  FaChevronLeft,
} from "react-icons/fa";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", icon: <FaThLarge />, active: true },
    { name: "Inventory", icon: <FaBoxes /> },
    { name: "Sales", icon: <FaShoppingCart /> },
    { name: "Purchases", icon: <FaTruck /> },
    { name: "Documents", icon: <FaFileAlt /> },
    { name: "Integrations", icon: <FaPlug /> },
    { name: "Reports", icon: <FaChartBar /> },
    { name: "Customers", icon: <FaUsers /> },
    { name: "Invoices", icon: <FaFileInvoice /> },
  ];

  return (
    <aside className="w-72 h-screen bg-[#1B2321] text-white flex flex-col shadow-xl">

      {/* Logo */}

      <div className="flex items-center justify-between px-6 py-6 border-b border-gray-700">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center font-bold text-xl">
            I
          </div>

          <h1 className="text-3xl font-bold tracking-wide">
            Inventory System
          </h1>

        </div>

        <button className="text-gray-400 hover:text-white">
          <FaChevronLeft />
        </button>

      </div>

      {/* Main */}

      <div className="px-6 mt-8">

        <p className="text-gray-500 uppercase text-xs mb-5">
          Main
        </p>

        {menu.map((item) => (

          <button
            key={item.name}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
              item.active
                ? "bg-[#38453F]"
                : "hover:bg-[#2B3633]"
            }`}
          >

            <span className="text-lg">{item.icon}</span>

            <span>{item.name}</span>

          </button>

        ))}

      </div>

      {/* Footer */}

      <div className="mt-auto p-6 text-gray-500 text-sm border-t border-gray-700">

        Inventory Management System

      </div>

    </aside>
  );
}