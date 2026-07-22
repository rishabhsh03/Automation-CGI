import "./InventoryTable.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function InventoryTable() {

  const [inventory, setInventory] = useState([]);
   const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8000/api/inventory")
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setInventory(result.data);
        }
      })
      .catch(console.error);
  }, []);

  const getStatus = (qty) => {
    if (qty === 0) return "Out Of Stock";
    if (qty <= 10) return "Low Stock";
    return "In Stock";
  };

  return (
    <div className="inventory-table-card">

      <div className="table-header">
        <h2>Inventory Summary</h2>
        <button onClick={() => navigate("/inventory")}>
    View All
</button>
      </div>

      <table>

        <thead>
          <tr>
            <th>SKU</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {inventory.slice(0,6).map((item) => {

            const status = getStatus(item.quantity);

            return (

              <tr key={item.id}>

                <td>{item.sku}</td>

                <td>{item.name}</td>

                <td>{item.quantity}</td>

                <td>

                  <span
                    className={`status ${status
                      .replace(/\s/g, "")
                      .toLowerCase()}`}
                  >
                    {status}
                  </span>

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>
  );
}