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
import Warehouse from "../warehouse/Warehouse";

import "../../components/KPICards.css";


export default function Dashboard() {
   
    const [dashboard, setDashboard] = useState({
        summary: {},
        categories: [],
    });
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    
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
const hour = new Date().getHours();

const greeting =
    hour < 12
        ? "Good Morning"
        : hour < 17
        ? "Good Afternoon"
        : "Good Evening";
        console.log("Dashboard Summary:", dashboard.summary);
 return (
   <div className="dashboard-container">
     <Sidebar />

     <motion.main
       className="dashboard-content"
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
     >
       <Navbar />

       {/* ================= KPI ================= */}
       <KPICards summary={dashboard.summary} />

      
       {/* ================= CHARTS ================= */}

       <div className="dashboard-grid">
         <div className="dashboard-card large">
           <h2>Sales Activity</h2>

           <SalesActivity summary={dashboard.summary} />
         </div>

         <div className="dashboard-card">
           <h2>Inventory Categories</h2>

           <CategoryProgress categories={dashboard.categories} />
         </div>
       </div>

       {/* ================= SECOND ROW ================= */}

       <div className="dashboard-grid">
         <div className="dashboard-card">
           <h2>Product Distribution</h2>

           <ProductChart categories={dashboard.categories} />
         </div>

         <div className="dashboard-card">
           <HeatMap />
         </div>
       </div>

       {/* ================= TABLES ================= */}

       <div className="dashboard-grid">
         <div className="dashboard-card">
           <h2>Inventory</h2>

           <InventoryTable />
         </div>

         <div className="dashboard-card">
           <h2>Recent Orders</h2>

           <RecentOrders />
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