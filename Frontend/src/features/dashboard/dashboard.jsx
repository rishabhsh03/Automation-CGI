import { useEffect, useState } from "react";

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

const icons = {
  CPU: "...",
  GPU: "...",
  RAM: "...",
  SSD: "...",
};

export default function Dashboard() {

  const [dashboard, setDashboard] = useState({
  summary: {},
  categories: [],
});

  useEffect(() => {
    fetch("http://localhost:8000/api/get-dashboard")
      .then(res => res.json())
      .then(result => setDashboard(result.data))
      .catch(console.error);
  }, []);

  if (!dashboard || !dashboard.categories) {
    return <h1>Loading...</h1>;
  }

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <main className="flex-1 p-6">

        <Navbar />
        
        {/* KPI Cards */}

        <div className="grid grid-cols-4 gap-6 mt-6">

       <KpiCards
       title="Total Products"
       value={dashboard.summary.totalProducts}
       icon="https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
        />

        </div>

        {/* Second Row */}

        <div className="grid grid-cols-3 gap-6 mt-8">

          <SalesActivity />

          <CategoryProgress categories={dashboard.categories} />

          <HeatMap />

        </div>

        {/* Third Row */}

        <div className="grid grid-cols-2 gap-6 mt-8">

          <ProductChart />

          <PurchaseSalesChart />

        </div>

        {/* Fourth Row */}

        <div className="grid grid-cols-2 gap-6 mt-8">

          <InventoryTable />

          <RecentOrders />

        </div>

      </main>

    </div>

  );

}