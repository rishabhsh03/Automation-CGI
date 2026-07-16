import { useEffect, useState } from "react";
import "./Dashboard.css";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import KpiCards from "../../components/kpiCards";
import SalesActivity from "../../components/SalesActivity";
import CategoryProgress from "../../components/CategoryProgress";
import HeatMap from "../../components/HeatMap";
import ProductChart from "../../components/ProductChart";
import PurchaseSalesChart from "../../components/PurchaseSalesChart";
import InventoryTable from "../../components/InventoryTable";
import RecentOrders from "../../components/RecentOrders";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    summary: {},
    categories: [],
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/get-dashboard")
      .then((res) => res.json())
      .then((result) => {
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

      <main className="dashboard-content">

        <Navbar />

        {/* KPI Cards */}

        <div className="kpi-grid">

          <KpiCards
            title="Total Products"
            value={dashboard.summary.totalProducts}
          />

          <KpiCards
            title="Low Stock"
            value={dashboard.summary.lowStock}
          />

          <KpiCards
            title="Orders"
            value={dashboard.summary.totalOrders}
          />

          <KpiCards
            title="Suppliers"
            value={dashboard.summary.totalSuppliers}
          />

        </div>

        {/* Row 1 */}

        <div className="row-three">

          <SalesActivity />

          <CategoryProgress
            categories={dashboard.categories}
          />

          <HeatMap />

        </div>

        {/* Row 2 */}

        <div className="row-two">

          <ProductChart />

          <PurchaseSalesChart />

        </div>

        {/* Row 3 */}

        <div className="row-two">

          <InventoryTable />

          <RecentOrders />

        </div>

      </main>

    </div>
  );
}