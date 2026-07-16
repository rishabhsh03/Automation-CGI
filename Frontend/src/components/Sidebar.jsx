import "./Sidebar.css";

import {
  FaHome,
  FaBoxes,
  FaShoppingCart,
  FaTruck,
  FaWarehouse,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      {/* Logo */}

      <div className="sidebar-logo">

        <div className="logo-circle">
          I
        </div>

        <div>
          <h2>Inventory</h2>
          <p>Management</p>
        </div>

      </div>

      {/* Menu */}

      <div className="sidebar-menu">

        <p className="menu-title">MAIN MENU</p>

        <button className="menu-item active">
          <FaHome />
          <span>Dashboard</span>
        </button>

        <button className="menu-item">
          <FaBoxes />
          <span>Inventory</span>
        </button>

        <button className="menu-item">
          <FaShoppingCart />
          <span>Orders</span>
        </button>

        <button className="menu-item">
          <FaTruck />
          <span>Purchase</span>
        </button>

        <button className="menu-item">
          <FaWarehouse />
          <span>Warehouse</span>
        </button>

        <button className="menu-item">
          <FaUsers />
          <span>Suppliers</span>
        </button>

        <button className="menu-item">
          <FaChartBar />
          <span>Reports</span>
        </button>

        <button className="menu-item">
          <FaCog />
          <span>Settings</span>
        </button>

      </div>

      {/* Footer */}

      <div className="sidebar-footer">

        <button className="logout-btn">

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}