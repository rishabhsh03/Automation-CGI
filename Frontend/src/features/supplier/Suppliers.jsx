import { useState , useEffect } from "react";
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
    console.log("✅ supplierRoutes loaded");
    const [search, setSearch] = useState("");
    const [suppliers, setSuppliers] = useState([]);
   
   const filteredSuppliers = suppliers.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    (item.contact_info || "")
        .toLowerCase()
        .includes(search.toLowerCase())
);
   const supplierSummary = {
    totalSuppliers: suppliers.length,

    contactInfo: suppliers.filter(
        (supplier) =>
            supplier.contact_info &&
            supplier.contact_info.trim() !== ""
    ).length,

    averageDelivery:
        suppliers.length > 0
            ? (
                  suppliers.reduce(
                      (sum, supplier) =>
                          sum + Number(supplier.avg_delivery_date),
                      0
                  ) / suppliers.length
              ).toFixed(1)
            : 0,
};
useEffect(() => {

    fetch("http://localhost:8000/api/suppliers")
        .then((res) => res.json())
        .then((result) => {

            if (result.success) {
                setSuppliers(result.data);
            }

        });

}, []);

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

                                <h2>{supplierSummary.totalSuppliers}</h2>

                            </div>

                        </div>

                        <div className="supplier-card">

                            <FaEnvelope />

                            <div>

<h3>Contact Info</h3>
<h2>{supplierSummary.contactInfo}</h2>
                            </div>

                        </div>

                        <div className="supplier-card">

                            <FaPhone />

                            <div>

                               <h3>Avg Delivery</h3>
<h2>{supplierSummary.averageDelivery} Days</h2>
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
    <th>Contact Info</th>
    <th>Avg Delivery</th>
    <th>Organization</th>
    <th>Action</th>
</tr>
</thead>

                            <tbody>

                                {

                                    filteredSuppliers.map(item => (

                                        <tr key={item.id}>

                                           <td>{item.contact_info}</td>
<td>{item.avg_delivery_date} Days</td>
<td>{item.organization_id}</td>

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