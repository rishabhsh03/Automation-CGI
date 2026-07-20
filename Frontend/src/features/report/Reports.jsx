import { useState } from "react";
import {
    FaChartBar,
    FaFileExcel,
    FaFilePdf,
    FaSearch,
    FaBoxes,
    FaMoneyBillWave,
    FaShoppingCart,
    FaWarehouse
} from "react-icons/fa";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Reports.css";

export default function Reports() {

    const [search, setSearch] = useState("");

    const reports = [
        {
            id: 1,
            report: "Inventory Report",
            generatedBy: "Admin",
            date: "20 Jul 2026",
            status: "Completed"
        },
        {
            id: 2,
            report: "Sales Report",
            generatedBy: "Manager",
            date: "21 Jul 2026",
            status: "Completed"
        },
        {
            id: 3,
            report: "Stock Movement",
            generatedBy: "Admin",
            date: "22 Jul 2026",
            status: "Pending"
        }
    ];

    const filteredReports = reports.filter(item =>
        item.report.toLowerCase().includes(search.toLowerCase()) ||
        item.generatedBy.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="reports-layout">

            <Sidebar />

            <main className="reports-content">

                <Navbar />

                <div className="reports-page">

                    {/* Header */}

                    <div className="reports-header">

                        <div>

                            <h1>Reports & Analytics</h1>

                            <p>View warehouse reports and insights</p>

                        </div>

                        <div className="export-buttons">

                            <button className="excel-btn">

                                <FaFileExcel />

                                Export Excel

                            </button>

                            <button className="pdf-btn">

                                <FaFilePdf />

                                Export PDF

                            </button>

                        </div>

                    </div>

                    {/* KPI Cards */}

                    <div className="report-cards">

                        <div className="report-card">

                            <FaBoxes />

                            <div>

                                <h3>Total Products</h3>

                                <h2>248</h2>

                            </div>

                        </div>

                        <div className="report-card">

                            <FaWarehouse />

                            <div>

                                <h3>Inventory Value</h3>

                                <h2>₹18.5L</h2>

                            </div>

                        </div>

                        <div className="report-card">

                            <FaShoppingCart />

                            <div>

                                <h3>Total Orders</h3>

                                <h2>145</h2>

                            </div>

                        </div>

                        <div className="report-card">

                            <FaMoneyBillWave />

                            <div>

                                <h3>Total Revenue</h3>

                                <h2>₹54.2L</h2>

                            </div>

                        </div>

                    </div>

                    {/* Filters */}

                    <div className="toolbar">

                        <div className="search-box">

                            <FaSearch />

                            <input
                                type="text"
                                placeholder="Search Reports..."
                                value={search}
                                onChange={(e)=>setSearch(e.target.value)}
                            />

                        </div>

                        <div className="filter-group">

                            <select>

                                <option>All Reports</option>
                                <option>Inventory</option>
                                <option>Sales</option>
                                <option>Purchase</option>
                                <option>Orders</option>

                            </select>

                            <input type="date"/>

                            <input type="date"/>

                        </div>

                    </div>

                    {/* Charts */}

                    <div className="charts-grid">

                        <div className="chart-card">

                            <div className="chart-header">

                                <h2>

                                    <FaChartBar />

                                    Monthly Sales

                                </h2>

                            </div>

                            <div className="chart-placeholder">

                                Chart will appear here

                            </div>

                        </div>

                        <div className="chart-card">

                            <div className="chart-header">

                                <h2>

                                    <FaBoxes />

                                    Inventory Overview

                                </h2>

                            </div>

                            <div className="chart-placeholder">

                                Inventory Chart

                            </div>

                        </div>

                    </div>

                    {/* Reports Table */}

                    <div className="table-card">

                        <table>

                            <thead>

                                <tr>

                                    <th>Report</th>

                                    <th>Generated By</th>

                                    <th>Date</th>

                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredReports.map(item=>(

                                        <tr key={item.id}>

                                            <td>{item.report}</td>

                                            <td>{item.generatedBy}</td>

                                            <td>{item.date}</td>

                                            <td>

                                                <span
                                                    className={`status ${item.status.toLowerCase()}`}
                                                >

                                                    {item.status}

                                                </span>

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