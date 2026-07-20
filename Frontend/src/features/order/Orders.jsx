import { useState } from "react";
import {
    FaPlus,
    FaSearch,
    FaEye,
    FaEdit,
    FaClipboardList,
    FaClock,
    FaCheckCircle,
    FaRupeeSign
} from "react-icons/fa";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Orders.css";

export default function Orders() {

    const [search, setSearch] = useState("");

    const [orders] = useState([
        {
            id: 1,
            order_no: "ORD-1001",
            customer: "Dell Technologies",
            date: "20 Jul 2026",
            items: 5,
            total: 45000,
            status: "Pending"
        },
        {
            id: 2,
            order_no: "ORD-1002",
            customer: "HP India",
            date: "21 Jul 2026",
            items: 3,
            total: 18000,
            status: "Confirmed"
        },
        {
            id: 3,
            order_no: "ORD-1003",
            customer: "Lenovo",
            date: "22 Jul 2026",
            items: 7,
            total: 95000,
            status: "Completed"
        }
    ]);

    const filteredOrders = orders.filter(order =>
        order.order_no.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.status.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "pending";

            case "Confirmed":
                return "confirmed";

            case "Completed":
                return "completed";

            default:
                return "";
        }
    };

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

                        <button className="add-btn">

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

                            <select>

                                <option>All Status</option>
                                <option>Pending</option>
                                <option>Confirmed</option>
                                <option>Completed</option>

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

                                {

                                    filteredOrders.map(order => (

                                        <tr key={order.id}>

                                            <td>{order.order_no}</td>

                                            <td>{order.customer}</td>

                                            <td>{order.date}</td>

                                            <td>{order.items}</td>

                                            <td>₹{order.total.toLocaleString()}</td>

                                            <td>

                                                <span
                                                    className={`status-badge ${getStatusClass(order.status)}`}
                                                >
                                                    {order.status}
                                                </span>

                                            </td>

                                            <td>

                                                <div className="action-buttons">

                                                    <button className="view-btn">

                                                        <FaEye />

                                                    </button>

                                                    <button className="edit-btn">

                                                        <FaEdit />

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </main>

        </div>

    );

}