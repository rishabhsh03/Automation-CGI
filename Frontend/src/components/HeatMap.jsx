import "./HeatMap.css";

function getColor(qty) {
  if (qty >= 50) return "green";
  if (qty >= 25) return "yellow";
  if (qty >= 10) return "orange";
  return "red";
}

export default function HeatMap({ data = [] }) {
  const warehouses = [...new Set(data.map((item) => item.warehouse))];

  const products = [...new Set(data.map((item) => item.product))];

  return (
    <div className="heatmap-card">
      <div className="heatmap-header">
        <p>Warehouse Stock Health</p>
      </div>

      <table className="heatmap-table">
        <thead>
          <tr>
            <th>Product</th>

            {warehouses.map((warehouse) => (
              <th key={warehouse}>{warehouse}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product}>
              <td className="product-name">{product}</td>

              {warehouses.map((warehouse) => {
                const stock = data.find(
                  (item) =>
                    item.product === product && item.warehouse === warehouse,
                );

                const qty = stock?.quantity || 0;

                return (
                  <td key={`${product}-${warehouse}`}>
                    <div className="tooltip-container">
                      <div className={`heat-box ${getColor(qty)}`}>{qty}</div>

                      <div className={`heat-box ${getColor(qty)}`}>{qty}</div>

                      <div className="tooltip">
                        <strong>{product}</strong>
                        <br />
                        Warehouse: {warehouse}
                        <br />
                        Available: {qty} Units
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
