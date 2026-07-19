import "./Inventory.css";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function Inventory() {
const [showModal, setShowModal] = useState(false);
const [inventory, setInventory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/inventory")
        .then((res) => res.json())
        .then((result) => {
            if (result.success) {
                setInventory(result.data);
            }
        });
}, []);
const getStatus = (qty) => {
  if (qty === 0) return "Out Of Stock";
  if (qty <= 10) return "Low Stock";
  return "In Stock";
};

  return (
    
    <div className="inventory-layout">

    <Sidebar />

    <main className="inventory-content">

      <Navbar />

      <div className="inventory">

      {/* Header */}

      <div className="inventory-header">

        <div>
          <h1>Inventory</h1>
          <p>Manage all warehouse products</p>
        </div>

        <button
            className="add-btn"
            onClick={() => setShowModal(true)}
        >
            <FaPlus />
            Add Product
        </button>

      </div>

      {/* Stats */}

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Products</h3>
          <h1>110</h1>
        </div>

        <div className="stat-card">
          <h3>Low Stock</h3>
          <h1>8</h1>
        </div>

        <div className="stat-card">
          <h3>Out Of Stock</h3>
          <h1>2</h1>
        </div>

        <div className="stat-card">
          <h3>Inventory Value</h3>
          <h1>₹12.5L</h1>
        </div>

      </div>

      {/* Search */}

      <div className="toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Product..."
          />

        </div>

        <div className="filters">

          <select>
            <option>All Categories</option>
          </select>

          <select>
            <option>Warehouse</option>
          </select>

          <select>
            <option>Status</option>
          </select>

        </div>

      </div>

      {/* Table */}

      <div className="table-card">

        <table>

          <thead>

            <tr>

              <th>SKU</th>

              <th>Product</th>

              <th>Category</th>

              <th>Warehouse</th>

              <th>Quantity</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {inventory.map((item) => (

              <tr key={item.sku}>

                <td>{item.sku}</td>

                <td>{item.name}</td>

                <td>{item.category}</td>

                <td>{item.warehouse}</td>

                <td>{item.quantity}</td>

                <td>

                 {(() => {
  const status = getStatus(item.quantity);

                return (
                  <span
                   className={`status ${status.replace(/\s/g, "").toLowerCase()}`}
                    >
                   {status}
                  </span>
                  );
              })()}

                </td>

                <td>

                  <button className="edit-btn">
                    Edit
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
        
      </div>
      
         {/* Modal */}

    {showModal && (
      <div className="modal-overlay">

        <div className="modal">

          <h2>Add Product</h2>

          <input type="text" placeholder="SKU" />
          <input type="text" placeholder="Product Name" />
          <input type="text" placeholder="Category" />
          <input type="number" placeholder="Quantity" />

          <div className="modal-buttons">

            <button className="save-btn">
              Save
            </button>

            <button
              className="cancel-btn"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>

          </div>

        </div>

      </div>
    )}

  </div>
    </main>
    </div>
);        
    
    
 }
