import "./HeatMap.css"

export default function HeatMap({ data = [] }) {

  if (!Array.isArray(data) || data.length === 0) {
      return (
          <div className="heatmap-container">

              <div className="heatmap-header">
                  <h2>Warehouse Stock Health</h2>
                  <p>No inventory data available</p>
              </div>

          </div>
      );
  }

  // Get unique products
  const products = [
      ...new Set(
          data
              .map(item => item.product)
              .filter(Boolean)
      )
  ];

  // Get unique warehouses
  const warehouses = [
      ...new Set(
          data
              .map(item => item.warehouse)
              .filter(Boolean)
      )
  ];

  // Get quantity for product + warehouse
  const getQuantity = (product, warehouse) => {

      const item = data.find(
          x =>
              x.product === product &&
              x.warehouse === warehouse
      );

      return item
          ? Number(item.quantity) || 0
          : 0;
  };

  // Determine stock health
  const getStockClass = (quantity) => {

      if (quantity === 0) {
          return "stock-empty";
      }

      if (quantity < 20) {
          return "stock-critical";
      }

      if (quantity < 100) {
          return "stock-low";
      }

      if (quantity < 500) {
          return "stock-medium";
      }

      return "stock-good";
  };

  return (
      <div className="heatmap-container">

          {/* Header */}

          <div className="heatmap-header">

              <h2>
                  Warehouse Stock Health
              </h2>

              <p>
                  Inventory availability across warehouses
              </p>

          </div>


          {/* Legend */}

          <div className="heatmap-legend">

              <div className="heatmap-legend-item">
                  <span className="heatmap-legend-box stock-good"></span>
                  Healthy
              </div>

              <div className="heatmap-legend-item">
                  <span className="heatmap-legend-box stock-medium"></span>
                  Medium
              </div>

              <div className="heatmap-legend-item">
                  <span className="heatmap-legend-box stock-low"></span>
                  Low
              </div>

              <div className="heatmap-legend-item">
                  <span className="heatmap-legend-box stock-critical"></span>
                  Critical
              </div>

              <div className="heatmap-legend-item">
                  <span className="heatmap-legend-box stock-empty"></span>
                  Empty
              </div>

          </div>


          {/* Heatmap */}

          <div className="heatmap-table-wrapper">

              <table className="heatmap-table">

                  <thead>

                      <tr>

                          <th>
                              Product
                          </th>

                          {warehouses.map((warehouse) => (

                              <th key={warehouse}>
                                  {warehouse}
                              </th>

                          ))}

                      </tr>

                  </thead>


                  <tbody>

                      {products.map((product) => (

                          <tr key={product}>

                              <td className="product-name">
                                  {product}
                              </td>


                              {warehouses.map((warehouse) => {

                                  const quantity =
                                      getQuantity(
                                          product,
                                          warehouse
                                      );

                                  const stockClass =
                                      getStockClass(
                                          quantity
                                      );

                                  return (

                                      <td key={warehouse}>

                                          <div
                                              className={`heat-box ${stockClass}`}
                                          >
                                              {quantity.toLocaleString()}
                                          </div>

                                      </td>

                                  );

                              })}

                          </tr>

                      ))}

                  </tbody>

              </table>

          </div>

      </div>
  );
}