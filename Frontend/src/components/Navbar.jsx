import {
  FaSearch,
  FaBell,
  FaCalendarAlt,
  FaKeyboard,
} from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="bg-white rounded-2xl shadow-sm px-8 py-4 flex items-center justify-between">

      {/* Left */}

      <div className="flex items-center gap-3">

        <span className="text-3xl">🌞</span>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Hello, Rishabh!
          </h1>

          <p className="text-gray-500 text-sm">
            Welcome back 👋
          </p>
        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search anything..."
            className="w-96 bg-gray-100 rounded-xl pl-12 pr-24 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Shortcut */}

          <div className="absolute right-3 top-2.5 flex gap-2">

            <span className="bg-white px-2 py-1 rounded-md border text-xs text-gray-500">
              Ctrl
            </span>

            <span className="bg-white px-2 py-1 rounded-md border text-xs text-gray-500">
              K
            </span>

          </div>

        </div>

        {/* Icons */}

        <button className="w-11 h-11 rounded-xl bg-gray-100 flex justify-center items-center hover:bg-green-500 hover:text-white transition">
          <FaKeyboard />
        </button>

        <button className="w-11 h-11 rounded-xl bg-gray-100 flex justify-center items-center hover:bg-green-500 hover:text-white transition">
          <FaCalendarAlt />
        </button>

        <button className="relative w-11 h-11 rounded-xl bg-gray-100 flex justify-center items-center hover:bg-green-500 hover:text-white transition">

          <FaBell />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>

        {/* Avatar */}

        

      </div>

    </header>
  );
}