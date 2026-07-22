import {
    FaBoxes,
    FaWarehouse,
    FaShoppingCart,
    FaMoneyBillWave,
    FaExclamationTriangle,
    FaClipboardList
} from "react-icons/fa";

import KPICard from "./KPICard";

import "./KPICards.css";

export default function KPICards({ summary }) {

    return (

        <div className="kpi-grid">

            <KPICard
                icon={<FaBoxes />}
                title="Products"
                value={summary.totalProducts}
                change="+8%"
                subtitle="Available Products"
                color="#2563eb"
            />

            <KPICard
                icon={<FaShoppingCart />}
                title="Orders"
                value={summary.totalOrders}
                change="+12%"
                subtitle="Customer Orders"
                color="#16a34a"
            />

            <KPICard
    icon={<FaMoneyBillWave />}
    title="Revenue"
    value={`₹${Number(summary?.revenue ?? 0).toLocaleString()}`}
    change="+15%"
    subtitle="Total Revenue"
    color="#d97706"
/>

            <KPICard
                icon={<FaExclamationTriangle />}
                title="Low Stock"
                value={summary.lowStock}
                change="-2%"
                subtitle="Needs Reorder"
                color="#dc2626"
            />

         <KPICard
    icon={<FaWarehouse />}
    title="Inventory Value"
    value={`₹${Number(summary?.inventoryValue ?? 0).toLocaleString()}`}
    change="+5%"
    subtitle="Current Stock Value"
    color="#7c3aed"
/>
            <KPICard
                icon={<FaClipboardList />}
                title="Purchase Orders"
                value={summary.purchaseOrders}
                change="+6%"
                subtitle="Open Purchase Orders"
                color="#0891b2"
            />

        </div>

    );

}