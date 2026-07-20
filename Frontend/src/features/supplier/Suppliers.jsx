import { useState } from "react";
import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaPhone,
    FaEnvelope,
    FaBuilding
} from "react-icons/fa";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Suppliers.css";

export default function Supplier() {

    const [search, setSearch] = useState("");

    const [suppliers] = useState([
        {
            id: 1,
            name: "Intel Corporation",
            email: "sales@intel.com",
            phone: "+91 9876543210",
            city: "Bangalore"
        },
        {
            id: 2,
            name: "AMD India",
            email: "support@amd.com",
            phone: "+91 9876543200",
            city: "Hyderabad"
        },
        {
            id: 3,
            name: "NVIDIA Pvt Ltd",
            email: "sales@nvidia.com",
            phone: "+91 9876543299",
            city: "Pune"
        }
    ]);

    const filteredSuppliers = suppliers.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.city.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="supplier-layout">

            <Sidebar />

            <main className="supplier-content">

                <Navbar />

                <div className="supplier-page">

                    {/* Header */}

                    <div className="supplier-header">

                        <div>

                            <h1>Suppliers</h1>

                            <p>Manage supplier information</p>

                        </div>

                        <button className="add-btn">

                            <FaPlus />

                            Add Supplier

                        </button>

                    </div>

                    {/* KPI Cards */}

                    <div className="supplier-cards">

                        <div className="supplier-card">

                            <FaBuilding />

                            <div>

                                <h3>Total Suppliers</h3>

                                <h2>28</h2>

                            </div>

                        </div>

                        <div className="supplier-card">

                            <FaEnvelope />

                            <div>

                                <h3>Email Contacts</h3>

                                <h2>28</h2>

                            </div>

                        </div>

                        <div className="supplier-card">

                            <FaPhone />

                            <div>

                                <h3>Active</h3>

                                <h2>24</h2>

                            </div>

                        </div>

                    </div>

                    {/* Search */}

                    <div className="toolbar">

                        <div className="search-box">

                            <FaSearch />

                            <input
                                type="text"
                                placeholder="Search Supplier..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    {/* Table */}

                    <div className="table-card">

                        <table>

                            <thead>

                                <tr>

                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>Phone</th>

                                    <th>City</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredSuppliers.map(item => (

                                        <tr key={item.id}>

                                            <td>{item.name}</td>

                                            <td>{item.email}</td>

                                            <td>{item.phone}</td>

                                            <td>{item.city}</td>

                                            <td>

                                                <div className="action-buttons">

                                                    <button className="edit-btn">

                                                        <FaEdit />

                                                    </button>

                                                    <button className="delete-btn">

                                                        <FaTrash />

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