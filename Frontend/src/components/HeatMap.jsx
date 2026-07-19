import "./HeatMap.css";

const warehouses = ["WH-A", "WH-B", "WH-C", "WH-D"];

const data = [
  {
    product: "CPU",
    stock: {
      "WH-A": 90,
      "WH-B": 70,
      "WH-C": 45,
      "WH-D": 15,
    },
  },
  {
    product: "GPU",
    stock: {
      "WH-A": 82,
      "WH-B": 65,
      "WH-C": 58,
      "WH-D": 92,
    },
  },
  {
    product: "RAM",
    stock: {
      "WH-A": 55,
      "WH-B": 20,
      "WH-C": 88,
      "WH-D": 78,
    },
  },
  {
    product: "SSD",
    stock: {
      "WH-A": 95,
      "WH-B": 84,
      "WH-C": 74,
      "WH-D": 62,
    },
  },
];

function getColor(value) {

  if (value >= 80) return "green";

  if (value >= 60) return "yellow";

  if (value >= 40) return "orange";

  return "red";
}

export default function HeatMap() {

  return (

    <div className="heatmap-card">

      <div className="heatmap-header">

        <div>

          <p>Warehouse Stock Health</p>

        </div>

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

          {data.map((row) => (

            <tr key={row.product}>

              <td className="product-name">
                {row.product}
              </td>

              {warehouses.map((warehouse) => {

  const value = row.stock[warehouse];

  return (

    <td key={`${row.product}-${warehouse}`}>

      <div className="tooltip-container">

        <div
          className={`heat-box ${getColor(value)}`}
        ></div>

        <div className="tooltip">

          <strong>{row.product}</strong>

          <span>{warehouse}</span>

          <hr />

          <p>Stock : {value}%</p>

          <p>Available : {value} Units</p>

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