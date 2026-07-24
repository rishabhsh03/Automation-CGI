import "./Sidebar.css";

import {
    FaTachometerAlt,
    FaBoxOpen,
    FaWarehouse,
    FaClipboardList,
    FaTruck,
    FaChartBar,
    FaSignOutAlt
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
export default function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        navigate("/login");

    };

    return (
        <aside className="sidebar">

           <div className="sidebar-logo">

    <div className="logo-circle">
        W
    </div>

    <div className="Web">
        <h2>Warehouse</h2>
        <p>Management System</p>
    </div>

</div>
{/* 
<div className="sidebar-search">


    <input
        type="text"
        placeholder="Search Inventory..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />
   
</div> */}
            <div className="sidebar-menu">

                <p className="menu-title">
                    MAIN MENU
                </p>

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "menu-item active" : "menu-item"
                    }
                >
                    <FaTachometerAlt />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/products"
                    className={({ isActive }) =>
                        isActive ? "menu-item active" : "menu-item"
                    }
                >
                    <FaBoxOpen />
                    Products
                </NavLink>

                <NavLink
                    to="/inventory"
                    className={({ isActive }) =>
                        isActive ? "menu-item active" : "menu-item"
                    }
                >
                    <FaWarehouse />
                    Inventory
                </NavLink>

                <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                        isActive ? "menu-item active" : "menu-item"
                    }
                >
                    <FaClipboardList />
                    Orders
                </NavLink>

                <NavLink
                    to="/suppliers"
                    className={({ isActive }) =>
                        isActive ? "menu-item active" : "menu-item"
                    }
                >
                    <FaTruck />
                    Suppliers
                </NavLink>

                <NavLink
                    to="/reports"
                    className={({ isActive }) =>
                        isActive ? "menu-item active" : "menu-item"
                    }
                >
                    <FaChartBar />
                    Reports
                </NavLink>

            </div>

            <div className="sidebar-footer">

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

        </aside>
    );
}