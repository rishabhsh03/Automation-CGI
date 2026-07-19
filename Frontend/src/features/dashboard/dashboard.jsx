import { useEffect, useState } from "react";
import "./Dashboard.css";
import { delay, motion } from "framer-motion";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import KpiCards from "../../components/kpiCards";
import SalesActivity from "../../components/SalesActivity";
import CategoryProgress from "../../components/CategoryProgress";
import HeatMap from "../../components/HeatMap";
import ProductChart from "../../components/ProductChart";
import PurchaseSalesChart from "../../components/PurchaseSalesChart";
import InventoryTable from "../inventory/InventoryTable";
import RecentOrders from "../../components/RecentOrders"; 
import Warehouse from "../warehouse/Warehouse";
export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    summary: {},
    categories: [],
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          setDashboard(result.data);
        }
      })
      .catch(console.error);
  }, []);
  

  if (!dashboard.summary) {
    return <h2>Loading...</h2>;
  }
  

  return (
    <div className="dashboard-container">

      <Sidebar />

      <motion.main className="dashboard-content">

        <Navbar />

        {/* KPI Cards */}

        <div className="kpi-grid">

          <motion.div
              initial={{y:30 , opacity:0}}
              animate={{y:0 , opacity:1}}
              transition={{delay:0.1}}
            >

          <KpiCards
            title="Total Products"
            value={dashboard.summary.totalProducts}
          />
          </motion.div>
          <motion.div
              initial={{y:30 , opacity:0}}
              animate={{y:0 , opacity:1}}
              transition={{delay:0.2}}
            >

          <KpiCards
            title="Low Stock"
            value={dashboard.summary.lowStock}
          />
          </motion.div>
            <motion.div
              initial={{y:30 , opacity:0}}
              animate={{y:0 , opacity:1}}
              transition={{delay:0.3}}
            >

          <KpiCards
            title="Orders"
            value={dashboard.summary.totalOrders}
          />
          </motion.div>
         
        </div>

        <div className="row-three">
      <motion.div
      initial={{y:-40 , opacity: 0}}
      animate={{x: 0, opacity: 1}}
      transition={{delay: .4}}>
    <SalesActivity />
      </motion.div>

      <motion.div
      initial={{y:40 , opacity:0}}
      animate={{x: 0, opacity:1}}
      transition={{delay: .5}}>
    <CategoryProgress
        categories={dashboard.categories}
    />
      </motion.div>
      <motion.div
      initial={{y:40, opacity:0}}
      animate={{x:0, opacity:1}}
      transition={{delay: .6}}>
        
      </motion.div>
    <HeatMap />

</div>
        {/* Row 2 */}

        <div className="row-two">
    
          <ProductChart
    categories={dashboard.categories}
/>

          <PurchaseSalesChart />

        </div>

        {/* Row 3 */}

        <div className="row-two">

          <motion.div
          initial={{
            opacity:0,
            scale:.95
          }}
          animate={{
            opacity:1,
            scale:1
          }}
          transition={{delay:.8}}>
            

          {/* <InventoryTable /> */}
          </motion.div>
          <RecentOrders />

        </div>

      </motion.main>
        <Warehouse/>
    </div>
  );
}