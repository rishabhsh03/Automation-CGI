import { useEffect, useState } from "react";
import "./Dashboard.css";
import { motion } from "framer-motion";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import KpiCards from "../../components/kpiCards";
import SalesActivity from "../../components/SalesActivity";
import CategoryProgress from "../../components/CategoryProgress";
import HeatMap from "../../components/HeatMap";
import ProductChart from "../../components/ProductChart";
// import PurchaseSalesChart from "../../components/PurchaseSalesChart";
import InventoryTable from "../inventory/InventoryTable";
import RecentOrders from "../../components/RecentOrders";
import Warehouse from "../warehouse/Warehouse";
import { FaBoxes, FaExclamationTriangle, FaShoppingCart } from "react-icons/fa";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    summary: {},
    categories: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard")
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setDashboard(result.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
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
      <Sidebar />

      <motion.main className="dashboard-content">
        <Navbar />

        <div className="dash-header">
          <h1>Dashboard</h1>
          <button className="export-btn">Export</button>
        </div>

        {/* KPI row */}
       <div className="kpi-card products">

    <div className="kpi-header">

        <div className="kpi-title">

            <div className="kpi-icon">
                <FaBoxes/>
            </div>

            Total Products

        </div>

        <FaInfoCircle className="info-icon"/>

    </div>

    <div className="kpi-value">

        <h2>245</h2>

        <span className="kpi-change up">
            +8%
        </span>

    </div>

    <div className="kpi-footer">

        Compared to last month

    </div>

</div>

        {/* Main visual row: trend / category / heatmap */}
        <div className="row-three">
          <motion.div
            className="card trend-card"
            initial={{ y: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <SalesActivity />
          </motion.div>

          <motion.div
            className="card channel-card"
            initial={{ y: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <CategoryProgress categories={dashboard.categories} />
          </motion.div>

          <motion.div
            className="card heatmap-card"
            initial={{ y: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <HeatMap />
          </motion.div>
        </div>

        {/* Product chart row */}
        <div className="row-two">
          <div className="card chart-card">
            <ProductChart categories={dashboard.categories} />
          </div>
        </div>

        {/* Tables row */}
        <div className="row-two">
          <motion.div
            className="card table-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <InventoryTable />
          </motion.div>

          <div className="card table-card">
            <RecentOrders />
          </div>
        </div>
      </motion.main>

      <Warehouse />
    </div>
  );
}