import { useEffect, useState } from "react";
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

export default function Dashboard() {
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
      const response = await fetch("http://localhost:8000/api/dashboard");

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
        <Navbar/>

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
