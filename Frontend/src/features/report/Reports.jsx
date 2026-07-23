import { useEffect, useMemo, useState } from "react";
import "./Reports.css";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import {
  FaChartBar,
  FaFileExcel,
  FaFilePdf,
  FaSearch,
  FaBoxes,
  FaWarehouse,
  FaMoneyBillWave,
  FaShoppingCart,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Reports() {
  const [summary, setSummary] = useState({});

  const [monthlySales, setMonthlySales] = useState([]);

  const [reportData, setReportData] = useState([]);

  const [search, setSearch] = useState("");

  const [reportType, setReportType] = useState("inventory");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [warehouse, setWarehouse] = useState("");

  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  const loadSummary = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/report/summary");

      const result = await res.json();

      if (result.success) {
        setSummary(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const loadMonthlySales = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/report/monthly-sales");

      const result = await res.json();

      if (result.success) {
        setMonthlySales(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const generateReport = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/report", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          reportType,

          fromDate,

          toDate,

          warehouse,

          status,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setReportData(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadSummary();

    loadMonthlySales();
  }, []);

  useEffect(() => {
    generateReport();
  }, [reportType]);
  const filteredData = useMemo(() => {
    let data = [...reportData];

    // Search

    if (search.trim()) {
      const text = search.toLowerCase();

      data = data.filter((item) =>
        Object.values(item).some((value) =>
          String(value ?? "").replaceAll("_", " "),
        ),
      );
    }

    // Date Filter

    if (fromDate && toDate) {
      data = data.filter((item) => {
        if (
          (reportType === "inventory" ||
            reportType === "orders" ||
            reportType === "purchase") &&
          fromDate &&
          toDate
        ) {
          data = data.filter((item) => {
            const value = item.created_at || item.updated_at;

            if (!value) return true;

            const date = new Date(value);

            return date >= new Date(fromDate) && date <= new Date(toDate);
          });
        }

        return date >= new Date(fromDate) && date <= new Date(toDate);
      });
    }

    return data;
  }, [reportData, search, fromDate, toDate]);
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    worksheet["!cols"] = [
      { wch: 25 },

      { wch: 20 },

      { wch: 15 },

      { wch: 15 },

      { wch: 20 },
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,

      worksheet,

      reportType,
    );

    XLSX.writeFile(
      workbook,

      `${reportType}_Report.xlsx`,
    );
  };
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text(
      "Warehouse Management Report",

      14,

      18,
    );

    doc.setFontSize(11);

    doc.text(
      `Report Type : ${reportType}`,

      14,

      28,
    );

    doc.text(
      `Generated : ${new Date().toLocaleString()}`,

      14,

      35,
    );

    if (filteredData.length) {
      autoTable(doc, {
        startY: 45,

        head: [Object.keys(filteredData[0])],

        body: filteredData.map((row) => Object.values(row)),
      });
    }

    doc.save(`${reportType}_Report.pdf`);
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

              <p>Generate and export warehouse reports</p>
            </div>

            <div className="export-buttons">
              <button className="excel-btn" onClick={exportExcel}>
                <FaFileExcel />
                Export Excel
              </button>

              <button className="pdf-btn" onClick={exportPDF}>
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

                <h2>₹{Number(summary.inventoryValue || 0).toLocaleString()}</h2>
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

                <h2>₹{Number(summary.revenue || 0).toLocaleString()}</h2>
              </div>
            </div>
          </div>
          {/* Toolbar */}
          <div className="toolbar">
            {/* Search */}

            <div className="search-box">
              <FaSearch />

              <input
                type="text"
                placeholder="Search report..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filters */}

            <div className="filter-group">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="inventory">Inventory</option>

                <option value="orders">Orders</option>

                <option value="sales">Sales</option>

                <option value="purchase">Purchase</option>
              </select>

              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />

              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />

              <button
                className="generate-btn"
                onClick={generateReport}
                disabled={loading}
              />
              {loading ? "Generating..." : "Generate Report"}
            </div>
          </div>
          {/* Monthly Sales Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h2>
                <FaChartBar />
                Monthly Sales
              </h2>
            </div>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="sales" fill="#22c55e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Table */}
          <div className="table-card">
            {loading && (
              <div className="loading-report">
                <div className="loading-report">
                  <div className="spinner"></div>

                  <p>Generating Report...</p>
                </div>
              </div>
            )}
            <table>
              <thead>
                {/* Inventory */}

                {reportType === "inventory" && (
                  <tr>
                    <th>Product</th>

                    <th>Warehouse</th>

                    <th>Quantity</th>

                    <th>Status</th>

                    <th>Updated</th>
                  </tr>
                )}

                {/* Orders */}

                {reportType === "orders" && (
                  <tr>
                    <th>Order ID</th>

                    <th>Customer</th>

                    <th>Total Amount</th>

                    <th>Status</th>

                    <th>Date</th>
                  </tr>
                )}

                {/* Sales */}

                {reportType === "sales" && (
                  <tr>
                    <th>Month</th>

                    <th>Total Orders</th>

                    <th>Revenue</th>
                  </tr>
                )}

                {/* Purchase */}

                {reportType === "purchase" && (
                  <tr>
                    <th>PO ID</th>

                    <th>Supplier</th>

                    <th>Total Amount</th>

                    <th>Status</th>

                    <th>Date</th>
                  </tr>
                )}
              </thead>

              <tbody>
                {/* Inventory */}

                {reportType === "inventory" &&
                  filteredData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>

                      <td>{item.warehouse}</td>

                      <td>{item.quantity}</td>

                      <td>
                        <span
                          className={`status 
${item.status === "Available" ? "green" : ""}
${item.status === "Low Stock" ? "yellow" : ""}
${item.status === "Out of Stock" ? "red" : ""}
${item.status === "Damaged" ? "blue" : ""}
`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>{new Date(item.updated_at).toLocaleDateString()}</td>
                    </tr>
                  ))}

                {/* Orders */}

                {reportType === "orders" &&
                  filteredData.map((item) => (
                    <tr key={item.id}>
                      <td>#{item.id}</td>

                      <td>{item.customer_name}</td>

                      <td>₹{Number(item.total_amount).toLocaleString()}</td>

                      <td>
                        <span
                          className={`status ${item.status?.toLowerCase() || ""}`}
                        >
                          {item.status ?? "N/A"}
                        </span>
                      </td>

                      <td>
                        {new Date(item.created_at).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}

                {/* Sales */}

                {reportType === "sales" &&
                  filteredData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.month}</td>

                      <td>{item.total_orders}</td>

                      <td>
                        ₹
                        {Number(item.revenue).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                    </tr>
                  ))}

                {/* Purchase */}

                {reportType === "purchase" &&
                  filteredData.map((item) => (
                    <tr key={item.id}>
                      <td>#{item.id}</td>

                      <td>{item.supplier}</td>

                      <td>₹{Number(item.total_amount).toLocaleString()}</td>

                      <td>
                        <span className={`status ${item.status?.toLowerCase() || ""}`}>
                          {item.status}
                        </span>
                      </td>

                      <td>{new Date(item.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {!loading && filteredData.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#94a3b8",
                }}
              >
                <div className="empty-state">
                  <FaChartBar size={45} />

                  <h2>No Reports Found</h2>

                  <p>
                    Try changing the report type or selecting a different date
                    range.
                  </p>
                </div>
              </div>
            )}
          </div>{" "}
          {/* table-card */}
        </div>{" "}
        {/* reports-page */}
      </main>
    </div>
  );
}
