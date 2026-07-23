import "./InventoryTable.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function InventoryTable({search = ""}) {

  const [inventory, setInventory] = useState([]);
   const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8000/api/inventory")
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setInventory(result.data);
          console.log(inventory);
        }
      })
      .catch(console.error);
  }, []);

  const getStatus = (qty) => {
    if (qty === 0) return "Out Of Stock";
    if (qty <= 10) return "Low Stock";
    return "In Stock";
  };
const filteredInventory = inventory.filter((item) => {

    const searchText = search.toLowerCase();

    return (
        (item.name ?? "").toLowerCase().includes(searchText) ||
        (item.category ?? "").toLowerCase().includes(searchText) ||
        (item.sku ?? "").toLowerCase().includes(searchText)
    );

});
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

          {filteredInventory.slice(0, 5).map((item) => {

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