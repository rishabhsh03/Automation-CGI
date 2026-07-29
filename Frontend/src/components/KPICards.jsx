import {
    FaBoxes,
    FaWarehouse,
    FaShoppingCart,
    FaMoneyBillWave,
    FaExclamationTriangle,
    FaClipboardList,
    FaChartLine
} from "react-icons/fa";

import KPICard from "./KPICard";
import "./KPICards.css";

export default function KPICards({ summary }) {

    return (

        <div className="kpi-grid">

            <KPICard
                icon={<FaBoxes />}
                title="Products"
                value={summary?.totalProducts ?? 0}
                change="+8%"
                subtitle="Available Products"
                color="#2563eb"
            />

            <KPICard
                icon={<FaShoppingCart />}
                title="Orders"
                value={summary?.totalOrders ?? 0}
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
                value={summary?.lowStock ?? 0}
                change="-2%"
                subtitle="Needs Reorder"
                color="#dc2626"
            />

            <KPICard
                icon={<FaWarehouse />}
                title="Inventory Cost"
                value={`₹${Number(summary?.inventoryCost ?? 0).toLocaleString()}`}
                change="+5%"
                subtitle="Investment in Current Stock"
                color="#7c3aed"
            />

            <KPICard
                icon={<FaMoneyBillWave />}
                title="Selling Value"
                value={`₹${Number(summary?.inventorySellingValue ?? 0).toLocaleString()}`}
                change="+8%"
                subtitle="Potential Revenue"
                color="#059669"
            />

            <KPICard
                icon={<FaChartLine />}
                title="Potential Profit"
                value={`₹${Number(summary?.potentialProfit ?? 0).toLocaleString()}`}
                change="+10%"
                subtitle="Estimated Gross Profit"
                color="#f59e0b"
            />

            <KPICard
                icon={<FaClipboardList />}
                title="Purchase Orders"
                value={summary?.purchaseOrders ?? 0}
                change="+6%"
                subtitle="Open Purchase Orders"
                color="#0891b2"
            />

        </div>

    );

}