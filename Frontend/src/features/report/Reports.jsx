import { useState, useEffect } from "react";
import {
  FaChartBar,
  FaFileExcel,
  FaFilePdf,
  FaSearch,
  FaBoxes,
  FaMoneyBillWave,
  FaShoppingCart,
  FaWarehouse,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Reports.css";

export default function Reports() {
  const [reportType, setReportType] = useState("inventory");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [warehouse, setWarehouse] = useState("");

  const [status, setStatus] = useState("");

  const [reportData, setReportData] = useState([]);
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState([]);
  const [summary, setSummary] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [monthlySales, setMonthlySales] = useState([]);
  const loadReports = async () => {
    const res = await fetch("http://localhost:8000/api/report/summary");

    const result = await res.json();

    if (result.success) {
      reports.filter((item) => item.report);
    }
    loadSummary();
    loadReports();
  };

  const filteredReports = reports.filter(
    (item) =>
      item.report.toLowerCase().includes(search.toLowerCase()) ||
      item.generatedBy.toLowerCase().includes(search.toLowerCase()),
  );
  useEffect(() => {
    const loadSummary = async () => {
      const res = await fetch("http://localhost:8000/api/report/summary");

      const result = await res.json();

      if (result.success) {
        setSummary(result.data);
      }
    };

    const loadMonthlySales = async () => {
      const res = await fetch("http://localhost:8000/api/report/monthly-sales");

      const result = await res.json();

      if (result.success) {
        setMonthlySales(result.data);
      }
    };

    loadSummary();
    loadMonthlySales();
  }, []);
  const loadMonthlySales = async () => {
    const res = await fetch("http://localhost:8000/api/report/monthly-sales");

    const result = await res.json();

    if (result.success) {
      setMonthlySales(result.data);
    }
  };

  loadMonthlySales();
const generateReport = async () => {

    const res = await fetch(
        "http://localhost:8000/api/reports",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                reportType,
                fromDate,
                toDate,
                warehouse,
                status
            })
        }
    );

    const result = await res.json();

    if (result.success) {

        setReportData(result.data);

    }

};
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

                <h2>{summary.totalProducts}</h2>
              </div>
            </div>

            <div className="report-card">
              <FaWarehouse />

              <div>
                <h3>Inventory Value</h3>

                <h2>₹{Number(summary.inventoryValue).toLocaleString()}</h2>
              </div>
            </div>

            <div className="report-card">
              <FaShoppingCart />

              <div>
                <h3>Total Orders</h3>

                <h2>{summary.totalOrders}</h2>
              </div>
            </div>

            <div className="report-card">
              <FaMoneyBillWave />

              <div>
                <h3>Total Revenue</h3>

                <h2>₹{Number(summary.revenue).toLocaleString()}</h2>
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
                onChange={(e) => setSearch(e.target.value)}
              />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
                <button onClick={generateReport}>
                    Generate Report
                </button>
            </div>

            <div className="filter-group">
              <select>
                <option>All Reports</option>
                <option>Inventory</option>
                <option>Sales</option>
                <option>Purchase</option>
                <option>Orders</option>
              </select>

              <input type="date" />

              <input type="date" />
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
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={monthlySales}
                    margin={{
                      top: 10,
                      right: 20,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid stroke="#3b4456" strokeDasharray="3 3" />

                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#cbd5e1" }}
                      axisLine={{ stroke: "#475569" }}
                      tickLine={{ stroke: "#475569" }}
                    />

                    <YAxis
                      tick={{ fill: "#cbd5e1" }}
                      axisLine={{ stroke: "#475569" }}
                      tickLine={{ stroke: "#475569" }}
                    />

                    <Tooltip
                      contentStyle={{
                        background: "#1e293b",
                        border: "1px solid #334155",
                        borderRadius: "10px",
                      }}
                      labelStyle={{
                        color: "#fff",
                      }}
                    />

                    <Bar dataKey="sales" fill="#22c55e" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h2>
                  <FaBoxes />
                  Inventory Overview
                </h2>
              </div>

              <div className="chart-placeholder">Inventory Chart</div>
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
                {filteredReports.map((item) => (
                  <tr key={item.id}>
                    <td>{item.report}</td>

                    <td>{item.generatedBy}</td>

                    <td>{item.date}</td>

                    <td>
                      <span className={`status ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
