import "./InventoryStats.css";

export default function InventoryStats({ summary }) {
  return (
    <div className="inventory-stats">

      <h2>Inventory Stats</h2>

      <div className="stat-item">

        <div className="stat-info">
          <span>Total Products</span>
          <strong>{summary.totalProducts}</strong>
        </div>

        <div className="progress">
          <div
            className="fill blue"
            style={{ width: "100%" }}
          ></div>
        </div>

      </div>

      <div className="stat-item">

        <div className="stat-info">
          <span>Low Stock</span>
          <strong>{summary.lowStock}</strong>
        </div>

        <div className="progress">
          <div
            className="fill orange"
            style={{
              width: `${(summary.lowStock / summary.totalProducts) * 100}%`,
            }}
          ></div>
        </div>

      </div>

      <div className="stat-item">

        <div className="stat-info">
          <span>Orders</span>
          <strong>{summary.totalOrders}</strong>
        </div>

        <div className="progress">
          <div className="fill green" style={{ width: "70%" }}></div>
        </div>

      </div>

    </div>
  );
}