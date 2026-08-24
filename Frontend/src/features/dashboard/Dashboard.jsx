import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import KPICards from "../../components/KPICards";
import SalesActivity from "../../components/SalesActivity";
import CategoryProgress from "../../components/CategoryProgress";
import HeatMap from "../../components/HeatMap";
import InventoryTable from "../inventory/InventoryTable";
import RecentOrders from "../../components/RecentOrders";
import AIChart from "../../components/charts/AIChart";
import "../../components/KPICards.css";
import API_BASE_URL from "../../config/api";
import WarehouseLoader from "../../components/WarehouseLoader";
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


  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/dashboard`
        );

        const result = await response.json();

        if (result.success) {
          console.log("========== DASHBOARD ==========");
          console.log("Dashboard:", result.data);
          console.log(
            "Categories JSON:",
            JSON.stringify(result.data.categories, null, 2)
        );
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
    return <WarehouseLoader/>
  }

  const handleChartAI = async (prompt) => {

    console.log(
        "Chart request:",
        prompt
    );


    const request =
        prompt.toLowerCase().trim();


   

    if (
        request.includes("heatmap") ||
        request.includes("heat map") ||
        request.includes("warehouse stock")
    ) {

        const result = {

            type: "heatmap",

            dataSource: "heatmap",

            title: "Warehouse Stock Health",

            subtitle:
                "Inventory availability across warehouses"

        };


        console.log(
            "Chart result:",
            result
        );


        return result;

    }


    if (
        request.includes("sankey") ||
        request.includes("flow") ||
        request.includes("movement")
    ) {

        const result = {

            type: "sankey",

            dataSource: "stockMovements",

            title: "Warehouse Inventory Flow",

            subtitle:
                "Movement of inventory across warehouses"

        };


        console.log(
            "Chart result:",
            result
        );


        return result;

    }




    if (
        request.includes("scatter")
    ) {

        const result = {

            type: "scatter",

            dataSource: "categories",

            title: "Inventory Distribution",

            subtitle:
                "Inventory relationship visualization"

        };


        console.log(
            "Chart result:",
            result
        );


        return result;

    }


  

    if (
        request.includes("radar")
    ) {

        const result = {

            type: "radar",

            dataSource: "categories",

            title: "Inventory Comparison",

            subtitle:
                "Category comparison"

        };


        console.log(
            "Chart result:",
            result
        );


        return result;

    }



    if (
        request.includes("gauge") ||
        request.includes("health")
    ) {

        const result = {

            type: "gauge",

            dataSource: "categories",

            title: "Inventory Health",

            subtitle:
                "Current inventory status"

        };


        console.log(
            "Chart result:",
            result
        );


        return result;

    }



    if (
        request.includes("donut")
    ) {

        return {

            type: "donut",

            dataSource: "categories",

            title: "Inventory Distribution",

            subtitle:
                "Current inventory distribution"

        };

    }



    if (
        request.includes("pie")
    ) {

        return {

            type: "pie",

            dataSource: "categories",

            title: "Inventory Distribution",

            subtitle:
                "Current inventory distribution"

        };

    }




    if (
        request.includes("bar")
    ) {

        return {

            type: "bar",

            dataSource: "categories",

            title: "Inventory by Category",

            subtitle:
                "Current inventory across categories"

        };

    }




    if (
        request.includes("line")
    ) {

        return {

            type: "line",

            dataSource: "categories",

            title: "Inventory Trend",

            subtitle:
                "Inventory visualization"

        };

    }




    if (
        request.includes("area")
    ) {

        return {

            type: "area",

            dataSource: "categories",

            title: "Inventory Overview",

            subtitle:
                "Inventory area visualization"

        };

    }


    return null;
};
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
    
        <KPICards summary={dashboard.summary} />

     
        <div className="dashboard-grid chart-heatmap-grid">

<div className="dashboard-card compact-chart-card">

    <AIChart
        categories={dashboard.categories}
        heatmap={dashboard.heatmap}
        recentOrders={dashboard.recentOrders}
        onGenerate={handleChartAI}
    />

</div>
{/* 
<div className="dashboard-card compact-heatmap-card">

    <HeatMap
        data={dashboard.heatmap}
    />

</div> */}

</div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>Inventory</h2>

            <InventoryTable search={search} />
          </div>

          <div className="dashboard-card">
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
