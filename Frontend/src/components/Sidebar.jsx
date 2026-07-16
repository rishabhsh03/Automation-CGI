import "./Sidebar.css";
import { NavLink } from "react-router-dom";
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

      <div className="sidebar-menu">

  <p className="menu-title">MAIN MENU</p>

  <NavLink
    to="/"
    className={({ isActive }) =>
      isActive ? "menu-item active" : "menu-item"
    }
  >
    <FaHome />
    <span>Dashboard</span>
  </NavLink>

<NavLink
  to="/inventory"
  className={({ isActive }) =>
    isActive ? "menu-item active" : "menu-item"
  }
>
  <FaBoxes />
  <span>Inventory</span>
</NavLink>
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

    </aside>
  );
}