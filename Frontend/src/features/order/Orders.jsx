import { useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaRupeeSign,
} from "react-icons/fa";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import "./Orders.css";
const API = "http://localhost:8000/api/orders";

export default function Orders() {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [search, setSearch] = useState("");
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [orderItems, setOrderItems] = useState([
    {
      product_id: "",
      quantity: 1,
      unit_price: 0,
      total_price: 0,
    },
  ]);
  const fetchOrders = async () => {
    try {
      const res = await fetch(API);

      const result = await res.json();
      console.log("API Response:", result);
      if (result.success) {
        setOrders(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/products");
        const result = await res.json();

        if (result.success) {
          setProducts(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user");
        const result = await res.json();

        if (result.success) {
          setCustomers(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomers();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      String(order.id).includes(search) ||
      order.customer?.toLowerCase().includes(search.toLowerCase()) ||
      order.status?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "pending";

      case "PROCESSING":
        return "processing";

      case "SHIPPED":
        return "shipped";

      case "DELIVERED":
        return "completed";

      case "CANCELLED":
        return "cancelled";

      default:
        return "";
    }
  };
  const updateQuantity = (index, quantity) => {
    if (quantity < 1) quantity = 1;

    const updatedItems = [...orderItems];

    updatedItems[index].quantity = quantity;

    updatedItems[index].total_price = quantity * updatedItems[index].unit_price;

    setOrderItems(updatedItems);
  };
  const updateProduct = (index, productId) => {
    const selectedProduct = products.find(
      (product) => product.id === Number(productId),
    );

    const updatedItems = [...orderItems];

    updatedItems[index].product_id = Number(productId);

    updatedItems[index].unit_price = selectedProduct.selling_price;

    updatedItems[index].total_price =
      selectedProduct.selling_price * updatedItems[index].quantity;

    setOrderItems(updatedItems);
  };
  const grandTotal = orderItems.reduce(
    (sum, item) => sum + item.total_price,

    0,
  );
  const addProduct = () => {
    setOrderItems([
      ...orderItems,
      {
        product_id: "",
        quantity: 1,
        unit_price: 0,
        total_price: 0,
      },
    ]);
  };
  const removeProduct = (index) => {
    if (orderItems.length === 1) {
      return;
    }

    setOrderItems(orderItems.filter((_, i) => i !== index));
  };
  const handleView = (order) => {
    setSelectedOrder(order);

    setViewModalOpen(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);

    setEditModalOpen(true);
  };
  const handleUpdateOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/orders/${selectedOrder.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: selectedOrder.status,
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        alert("Order Updated Successfully");

        setEditModalOpen(false);

        // Refresh orders
        fetchOrders();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log("Orders State:", orders);
  console.log("Filtered Orders:", filteredOrders);
  return (
    <div className="orders-layout">
      <Sidebar />

      <main className="orders-content">
        <Navbar />

        <div className="orders-page">
          {/* Header */}
          <div className="orders-header">
            <div>
              <h1>Orders</h1>

              <p>Manage customer orders</p>
            </div>

            <button
              className="add-btn"
              onClick={() => setShowCreateOrder(true)}
            >
              <FaPlus />
              Create Order
            </button>
          </div>
          {/* KPI Cards */}
          <div className="orders-cards">
            <div className="order-card">
              <FaClipboardList />

              <div>
                <h3>Total Orders</h3>

                <h2>126</h2>
              </div>
            </div>

            <div className="order-card">
              <FaClock />

              <div>
                <h3>Pending</h3>

                <h2>18</h2>
              </div>
            </div>

            <div className="order-card">
              <FaCheckCircle />

              <div>
                <h3>Completed</h3>

                <h2>92</h2>
              </div>
            </div>

            <div className="order-card">
              <FaRupeeSign />

              <div>
                <h3>Revenue</h3>

                <h2>₹12.4L</h2>
              </div>
            </div>
          </div>
          {/* Toolbar */}
          <div className="toolbar">
            <div className="search-box">
              <FaSearch />

              <input
                type="text"
                placeholder="Search Orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filters">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="PROCESSING">Processing</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
          {/* Table */}
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Order No</th>

                  <th>Customer</th>

                  <th>Date</th>

                  <th>Items</th>

                  <th>Total</th>

                  <th>Status</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>ORD-{order.id}</td>

                    <td>{order.customer}</td>

                    <td>{new Date(order.created_at).toLocaleDateString()}</td>

                    <td>-</td>

                    <td>₹{Number(order.total_amount).toLocaleString()}</td>

                    <td>
                      <span
                        className={`status-badge ${getStatusClass(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="view-btn"
                          onClick={() => handleView(order)}
                        >
                          <FaEye />
                        </button>

                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(order)}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showCreateOrder && (
            <div className="modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Create Order</h2>

                  <button onClick={() => setShowCreateOrder(false)}>❌</button>
                </div>

                <div className="form-group">
                  <label>Customer</label>

                  <select
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                  >
                    <option value="">Select Customer</option>

                    {customers.map((customer) => (
                      <option
                        className="modal-select"
                        key={customer.id}
                        value={customer.id}
                      >
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    className="modal-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="DELIVERED">DELIVERED</option>
                  </select>
                </div>

                <div className="products-section">
                  <div className="product-header">
                    <span>Product</span>

                    <span>Qty</span>

                    {/* <span>Price</span>

        <span>Total</span> */}

                    <span>Action</span>
                  </div>

                  {orderItems.map((item, index) => (
                    <div className="product-row" key={index}>
                      <select>
                        {products.map((product) => (
                          <option
                            className="product-select"
                            key={product.id}
                            value={product.id}
                          >
                            {product.name}
                          </option>
                        ))}
                      </select>

                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(index, Number(e.target.value))
                        }
                      />

                      <button
                        disabled={orderItems.length === 1}
                        onClick={() => removeProduct(index)}
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                  <button className="add-product-btn" onClick={addProduct}>
                    + Add Product
                  </button>
                </div>

                <div className="grand-total">
                  <h3>Grand Total</h3>

                  <h2>₹{grandTotal.toLocaleString()}</h2>
                </div>

                <div className="modal-footer">
                  <button
                    className="cancel-btn"
                    onClick={() => setShowCreateOrder(false)}
                  >
                    Cancel
                  </button>

                  <button className="create-btn">Create Order</button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* ================= View Order ================= */}

        <Modal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          title="Order Details"
        >
          {selectedOrder && (
            <div className="order-details">
              <p>
                <strong>Order ID:</strong> ORD-{selectedOrder.id}
              </p>

              <p>
                <strong>Customer:</strong> {selectedOrder.customer}
              </p>

              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>

              <p>
                <strong>Total:</strong> ₹
                {Number(selectedOrder.total_amount).toLocaleString()}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedOrder.created_at).toLocaleString()}
              </p>
            </div>
          )}
        </Modal>

        {/* ================= Edit Order ================= */}

        <Modal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title="Edit Order"
        >
          {selectedOrder && (
            <div>
              <div className="form-group">
                <label>Status</label>

                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      status: e.target.value,
                    })
                  }
                >
                  <option>PENDING</option>
                  <option>PROCESSING</option>
                  <option>SHIPPED</option>
                  <option>DELIVERED</option>
                  <option>CANCELLED</option>
                </select>
              </div>
              <button
                className="btn-cancel"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>

              <button className="btn-update" onClick={handleUpdateOrder}>
                Update
              </button>
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
}
