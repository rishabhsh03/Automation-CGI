import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { motion } from "framer-motion";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import KPICards from "../../components/KPICards";
import SalesActivity from "../../components/SalesActivity";
import CategoryProgress from "../../components/CategoryProgress";
import HeatMap from "../../components/HeatMap";
import ProductChart from "../../components/ProductChart";
// import PurchaseSalesChart from "../../components/PurchaseSalesChart";
import InventoryTable from "../inventory/InventoryTable";
import RecentOrders from "../../components/RecentOrders";

import "../../components/KPICards.css";
import API_BASE_URL from "../../config/api";
export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({
    summary: {},
    categories: [],
    heatmap: [],
    recentOrders: [],
    purchaseSales: []
  });

  const [loading, setLoading] = useState(true);


  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");


  // -------------------------
  // useEffect
  // -------------------------
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/dashboard`
        );

        const result = await response.json();

        if (result.success) {
          setDashboard(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);
  if (loading) {
    return (
      <div className="dash-loading">
        <span className="dash-loading-pulse" />
        Loading dashboard…
      </div>
    );
  }


  return (
    <div className="dashboard-container">
      <Sidebar
        search={search}
        setSearch={setSearch}
      />

      <motion.main
        className="dashboard-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Navbar />
        <div
          className="dashboard-ai-card"
          onClick={() => navigate("/ai")}
        >
          <div className="dashboard-ai-info">
            <span className="dashboard-ai-icon">✦</span>

            <div>
              <h3>AI Assistant</h3>
              <p>
                Ask about inventory, products, orders and warehouse data
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/ai");
            }}
          >
            Open Assistant →
          </button>
        </div>
        {/* ================= KPI ================= */}
        <KPICards summary={dashboard.summary} />

        {/* ================= CHARTS ================= */}

        {/* Product Chart */}
        <div className="dashboard-grid single">

          <div className="dashboard-card">

            <ProductChart categories={dashboard.categories} />

          </div>

        </div>

        {/* HeatMap */}
        <div className="dashboard-grid single">

          <div className="dashboard-card">

            <HeatMap data={dashboard.heatmap} />

          </div>

        </div>

        {/* ================= TABLES ================= */}

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>Inventory</h2>

            <InventoryTable search={search} />
          </div>

          <div className="dashboard-card">
            <h2>Recent Orders</h2>

            <RecentOrders orders={dashboard.recentOrders} />
          </div>
        </div>
        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title="Create New Order"
        >
          <p style={{ color: "#94a3b8" }}>Order form will go here.</p>
        </Modal>
      </motion.main>
    </div>
  );
}
