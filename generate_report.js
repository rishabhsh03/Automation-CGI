const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// 1. Read the logo image as base64
let logoBase64 = "";
try {
  const logoPath = path.join(__dirname, "warehouse_3645404.png");
  if (fs.existsSync(logoPath)) {
    logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`;
  }
} catch (e) {
  console.log("Could not load logo:", e.message);
}

// 2. Build HTML Content
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Automation-CGI: Enterprise Warehouse Management System - Project Report</title>
<style>
  /* CSS Reset & Print Configuration */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @page {
    size: A4 portrait;
    margin: 16mm 14mm 16mm 14mm;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1e293b;
    background-color: #ffffff;
    line-height: 1.55;
    font-size: 10.5pt;
  }

  /* Page Break Utilities */
  .page-break-before {
    page-break-before: always;
    break-before: page;
  }

  .page-break-after {
    page-break-after: always;
    break-after: page;
  }

  .avoid-break {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* Cover Page Styling */
  .cover-page {
    height: 255mm;
    min-height: 255mm;
    max-height: 255mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16mm 14mm 14mm 14mm;
    background: linear-gradient(145deg, #0f172a 0%, #1e293b 55%, #0f766e 100%);
    color: #ffffff;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
  }

  .cover-badge {
    display: inline-block;
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 20px;
    font-size: 9.5pt;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-weight: 600;
    color: #38bdf8;
    margin-bottom: 20px;
  }

  .cover-title {
    font-size: 32pt;
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.5px;
    color: #ffffff;
    margin-bottom: 14px;
  }

  .cover-title span {
    color: #38bdf8;
  }

  .cover-subtitle {
    font-size: 14pt;
    font-weight: 400;
    color: #cbd5e1;
    max-width: 650px;
    line-height: 1.45;
    margin-bottom: 25px;
  }

  .cover-logo-container {
    margin: 25px 0;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .cover-logo {
    width: 80px;
    height: 80px;
    object-fit: contain;
    background: rgba(255, 255, 255, 0.95);
    padding: 10px;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }

  .cover-features-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 20px 0;
  }

  .cover-pill {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 9pt;
    color: #e2e8f0;
  }

  .cover-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 18px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    font-size: 9.5pt;
  }

  .cover-meta-item strong {
    display: block;
    color: #38bdf8;
    font-size: 8.5pt;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 3px;
  }

  .cover-meta-item span {
    color: #f1f5f9;
    font-weight: 500;
  }

  /* Headings & Section Styling */
  h1 {
    font-size: 18pt;
    font-weight: 700;
    color: #0f172a;
    border-bottom: 2px solid #0284c7;
    padding-bottom: 6px;
    margin-top: 24px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h1 .section-tag {
    font-size: 9pt;
    font-weight: 600;
    color: #0284c7;
    background: #e0f2fe;
    padding: 3px 9px;
    border-radius: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  h2 {
    font-size: 13.5pt;
    font-weight: 600;
    color: #1e293b;
    margin-top: 16px;
    margin-bottom: 8px;
    padding-left: 8px;
    border-left: 3.5px solid #0284c7;
  }

  h3 {
    font-size: 11pt;
    font-weight: 600;
    color: #334155;
    margin-top: 12px;
    margin-bottom: 6px;
  }

  p {
    margin-bottom: 9px;
    text-align: justify;
    color: #334155;
  }

  ul, ol {
    margin-left: 20px;
    margin-bottom: 10px;
    color: #334155;
  }

  li {
    margin-bottom: 4px;
  }

  /* Table of Contents */
  .toc-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px 20px;
    margin: 15px 0 25px 0;
  }

  .toc-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 25px;
  }

  .toc-item {
    display: flex;
    justify-content: space-between;
    font-size: 9.5pt;
    border-bottom: 1px dotted #cbd5e1;
    padding-bottom: 4px;
  }

  .toc-item .num {
    font-weight: 700;
    color: #0284c7;
    margin-right: 6px;
  }

  .toc-item .title {
    color: #1e293b;
    font-weight: 500;
  }

  /* Callout Card Boxes */
  .callout-box {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-left: 4px solid #16a34a;
    border-radius: 6px;
    padding: 10px 14px;
    margin: 12px 0;
    font-size: 9.5pt;
  }

  .callout-box.info {
    background: #f0f9ff;
    border-color: #bae6fd;
    border-left-color: #0284c7;
  }

  .callout-box.warning {
    background: #fffbeb;
    border-color: #fde68a;
    border-left-color: #d97706;
  }

  .callout-box strong {
    color: #0f172a;
    display: block;
    margin-bottom: 3px;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 16px 0;
    font-size: 9pt;
  }

  th, td {
    border: 1px solid #cbd5e1;
    padding: 6px 10px;
    text-align: left;
  }

  th {
    background-color: #f1f5f9;
    color: #0f172a;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 8pt;
    letter-spacing: 0.5px;
  }

  tr:nth-child(even) td {
    background-color: #f8fafc;
  }

  /* Metrics Cards Grid */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin: 14px 0;
  }

  .metric-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-top: 3px solid #0284c7;
    border-radius: 6px;
    padding: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }

  .metric-card.accent2 { border-top-color: #10b981; }
  .metric-card.accent3 { border-top-color: #8b5cf6; }
  .metric-card.accent4 { border-top-color: #f59e0b; }

  .metric-label {
    font-size: 8pt;
    color: #64748b;
    text-transform: uppercase;
    font-weight: 600;
  }

  .metric-value {
    font-size: 13pt;
    font-weight: 700;
    color: #0f172a;
    margin: 4px 0;
  }

  .metric-desc {
    font-size: 7.5pt;
    color: #475569;
  }

  /* Badges */
  .badge {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 7.5pt;
    font-weight: 600;
    text-transform: uppercase;
  }
  .badge-blue { background: #e0f2fe; color: #0369a1; }
  .badge-green { background: #dcfce7; color: #15803d; }
  .badge-amber { background: #fef3c7; color: #b45309; }
  .badge-purple { background: #f3e8ff; color: #7e22ce; }
  .badge-red { background: #fee2e2; color: #b91c1c; }

  /* Architecture Diagram (SVG / Flex layout) */
  .arch-container {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 14px;
    margin: 14px 0;
  }

  .arch-tier {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    padding: 10px 14px;
    margin-bottom: 10px;
  }

  .arch-tier-header {
    font-size: 9pt;
    font-weight: 700;
    color: #0284c7;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
  }

  .arch-boxes {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .arch-box {
    flex: 1;
    min-width: 120px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    padding: 6px 10px;
    font-size: 8pt;
  }

  .arch-box strong {
    display: block;
    color: #1e293b;
    font-size: 8.5pt;
  }

  .arch-connector {
    text-align: center;
    font-size: 10pt;
    color: #64748b;
    margin: -4px 0 6px 0;
    font-weight: bold;
  }

  /* Header & Footer on printed pages */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 8pt;
    color: #64748b;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 5px;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .page-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 8pt;
    color: #64748b;
    border-top: 1px solid #e2e8f0;
    padding-top: 5px;
    margin-top: 20px;
  }

  code {
    font-family: Consolas, "Courier New", monospace;
    background: #f1f5f9;
    padding: 1px 4px;
    border-radius: 3px;
    font-size: 8.5pt;
    color: #0f172a;
  }

  pre {
    background: #0f172a;
    color: #f8fafc;
    padding: 10px 14px;
    border-radius: 6px;
    font-family: Consolas, monospace;
    font-size: 8pt;
    line-height: 1.45;
    margin: 10px 0;
    overflow-x: auto;
  }
</style>
</head>
<body>

<!-- ========================================== -->
<!-- 1. COVER PAGE                              -->
<!-- ========================================== -->
<div class="cover-page">
  <div>
    <div class="cover-badge">ENTERPRISE TECHNICAL SPECIFICATION & PROJECT REPORT</div>
    <div class="cover-title">AUTOMATION-CGI<br><span>WAREHOUSE MANAGEMENT SYSTEM</span></div>
    <div class="cover-subtitle">
      A High-Performance, Multi-Tenant Full-Stack WMS Platform Integrating Real-Time Physical Location Tracking, Bill of Materials (BOM), Conversational AI Intelligence, Optical Scanning, and Desktop Deployment.
    </div>

    ${
      logoBase64
        ? `<div class="cover-logo-container">
            <img src="${logoBase64}" class="cover-logo" alt="Warehouse Logo" />
            <div style="font-size: 11pt; font-weight: 500; color: #e2e8f0;">
              Production Engineering Project & Technical Architecture Report<br>
              <span style="font-size: 9.5pt; color: #94a3b8;">System Release v1.0.0 • Production Build</span>
            </div>
          </div>`
        : ""
    }

    <div class="cover-features-pills">
      <div class="cover-pill">✓ React 19 & Vite SPA</div>
      <div class="cover-pill">✓ Node.js & Express 5 Layered Backend</div>
      <div class="cover-pill">✓ PostgreSQL Multi-Tenant DB</div>
      <div class="cover-pill">✓ Conversational Warehouse AI</div>
      <div class="cover-pill">✓ ECharts Dynamic Visualizations</div>
      <div class="cover-pill">✓ Razorpay Payment Gateway</div>
      <div class="cover-pill">✓ QR/Barcode Optical Scanner</div>
      <div class="cover-pill">✓ Electron Desktop Client</div>
    </div>
  </div>

  <div class="cover-footer">
    <div class="cover-meta-item">
      <strong>Prepared By / Lead Engineer</strong>
      <span>Rishabh</span>
    </div>
    <div class="cover-meta-item">
      <strong>Project Repository</strong>
      <span>Automation-CGI (Enterprise WMS)</span>
    </div>
    <div class="cover-meta-item">
      <strong>Database Architecture</strong>
      <span>PostgreSQL 18.4 / Supabase Multi-Tenant</span>
    </div>
    <div class="cover-meta-item">
      <strong>Document Date & Status</strong>
      <span>March 2026 • Final Implementation Report</span>
    </div>
  </div>
</div>

<!-- ========================================== -->
<!-- 2. TABLE OF CONTENTS                       -->
<!-- ========================================== -->
<div class="page-break-before">
  <div class="page-header">
    <span>Automation-CGI • Warehouse Management System</span>
    <span>Project Documentation Report</span>
  </div>

  <h1>TABLE OF CONTENTS <span class="section-tag">Index</span></h1>

  <div class="toc-box">
    <div class="toc-grid">
      <div class="toc-item"><span class="title"><span class="num">1.</span> Executive Summary & Abstract</span> <span>Page 3</span></div>
      <div class="toc-item"><span class="title"><span class="num">2.</span> Problem Statement & Motivation</span> <span>Page 3</span></div>
      <div class="toc-item"><span class="title"><span class="num">3.</span> Project Scope & Objectives</span> <span>Page 4</span></div>
      <div class="toc-item"><span class="title"><span class="num">4.</span> Technology Stack Breakdown</span> <span>Page 4</span></div>
      <div class="toc-item"><span class="title"><span class="num">5.</span> System Architecture & Design</span> <span>Page 5</span></div>
      <div class="toc-item"><span class="title"><span class="num">6.</span> Core Functional Modules (6.1–6.7)</span> <span>Page 6</span></div>
      <div class="toc-item"><span class="title"><span class="num">7.</span> Advanced Intelligence & Integration (6.8–6.13)</span> <span>Page 7</span></div>
      <div class="toc-item"><span class="title"><span class="num">8.</span> Database Schema & Data Dictionary</span> <span>Page 8</span></div>
      <div class="toc-item"><span class="title"><span class="num">9.</span> RESTful API Endpoint Specifications</span> <span>Page 9</span></div>
      <div class="toc-item"><span class="title"><span class="num">10.</span> Security, ACID Transactions & Performance</span> <span>Page 10</span></div>
      <div class="toc-item"><span class="title"><span class="num">11.</span> Deployment, Desktop Client & Verification</span> <span>Page 10</span></div>
      <div class="toc-item"><span class="title"><span class="num">12.</span> Future Roadmap & Conclusion</span> <span>Page 11</span></div>
    </div>
  </div>

  <!-- SECTION 1: EXECUTIVE SUMMARY -->
  <h1>1. EXECUTIVE SUMMARY & ABSTRACT <span class="section-tag">Section 1</span></h1>
  <p>
    <strong>Automation-CGI</strong> is an enterprise-grade, full-stack Warehouse Management System (WMS) engineered to solve the complex operational challenges of modern supply chain and fulfillment hubs. Combining a high-speed web and native desktop interface with an event-driven, layered REST backend and PostgreSQL database, the system governs the entire physical and transactional lifecycle of inventory items—from supplier procurement and multi-tiered Bill of Materials (BOM) management to physical warehouse slotting (Aisles, Racks, Bins), customer sales orders, and automated payment settlement.
  </p>
  <p>
    Beyond standard warehousing operations, Automation-CGI incorporates an innovative <strong>Conversational Warehouse AI Engine</strong> with multi-turn context memory and hybrid rule/LLM tool dispatching, enabling warehouse personnel to query inventory health, stockouts, and order metrics in natural language. Equipped with interactive ECharts analytics (Heatmaps, Sankey flow diagrams, Gauges), live webcam/mobile QR code scanning, multi-tenant organization isolation, and PDF/Excel export engines, Automation-CGI represents a state-of-the-art solution designed for high throughput, sub-second latency, and rock-solid operational reliability.
  </p>

  <!-- SECTION 2: PROBLEM STATEMENT -->
  <h1>2. PROBLEM STATEMENT & INDUSTRIAL MOTIVATION <span class="section-tag">Section 2</span></h1>
  <p>
    Modern logistics centers manage tens of thousands of SKUs across fluctuating customer demands. Conventional warehouse operations routinely encounter critical bottlenecks:
  </p>
  <ul>
    <li><strong>Physical Discrepancies & Blind Spots:</strong> Disconnected spreadsheets and manual logs cause variances between reported software inventory and actual physical stock on warehouse shelves.</li>
    <li><strong>Lack of Granular Spatial Tracking:</strong> Standard inventory software tracks quantities by facility but fails to specify precise physical coordinates (Aisle, Rack, Bin), resulting in worker search latency and picking inefficiencies.</li>
    <li><strong>Stock Reservation & Allocation Confusion:</strong> Failing to differentiate between Total On-Hand, Reserved Stock for pending orders, and Damaged Stock leads to accidental overselling, delayed shipments, or unexpected stockouts.</li>
    <li><strong>Rigid Analytics & Delayed Action:</strong> Warehouse supervisors spend hours exporting static CSVs to determine reorder needs, lacking dynamic visibility into supplier lead times and warehouse stock health.</li>
    <li><strong>Siloed Financial & Procurement Workflows:</strong> Disconnected procurement systems delay restocking when purchase orders are manually communicated without integrated payment and supplier verification.</li>
  </ul>

  <div class="callout-box info">
    <strong>Key Solution Impact:</strong>
    Automation-CGI unifies physical location slotting, multi-level BOMs, ACID-compliant sales transactions, integrated Razorpay checkouts, and natural language AI query tools into one unified platform, eliminating data silos and operational latency.
  </div>
</div>

<!-- ========================================== -->
<!-- 3. OBJECTIVES & TECH STACK                 -->
<!-- ========================================== -->
<div class="page-break-before">
  <div class="page-header">
    <span>Automation-CGI • Warehouse Management System</span>
    <span>Scope & Technology Stack</span>
  </div>

  <h1>3. PROJECT SCOPE & SYSTEM OBJECTIVES <span class="section-tag">Section 3</span></h1>
  <p>
    The project encompasses both functional capabilities for warehouse operators and technical requirements for system scalability, security, and portability:
  </p>

  <div class="metrics-grid">
    <div class="metric-card">
      <div class="metric-label">Spatial Precision</div>
      <div class="metric-value">Aisle-Rack-Bin</div>
      <div class="metric-desc">Physical sub-location mapping for fast item retrieval</div>
    </div>
    <div class="metric-card accent2">
      <div class="metric-label">Data Consistency</div>
      <div class="metric-value">ACID Compliant</div>
      <div class="metric-desc">PostgreSQL transactions with rollback safety</div>
    </div>
    <div class="metric-card accent3">
      <div class="metric-label">Intelligence</div>
      <div class="metric-value">Hybrid AI</div>
      <div class="metric-desc">Rule-based intent routing + LLM fallback</div>
    </div>
    <div class="metric-card accent4">
      <div class="metric-label">Cross-Platform</div>
      <div class="metric-value">Web & Desktop</div>
      <div class="metric-desc">Vite SPA + Native Electron packaging</div>
    </div>
  </div>

  <h2>3.1 Core Objectives</h2>
  <ul>
    <li><strong>Real-time Stock Visibility:</strong> Track <code>available_quantity = total - reserved - damaged</code> with instantaneous updates upon order placement and fulfillment.</li>
    <li><strong>Automated Reorder Safeguards:</strong> Alert managers and generate Purchase Orders whenever stock drops below designated reorder thresholds.</li>
    <li><strong>Conversational Natural Language Interface:</strong> Allow non-technical floor managers to query inventory, look up suppliers, and generate charts via an AI assistant.</li>
    <li><strong>Multi-Tenancy & RBAC:</strong> Securely partition enterprise data across organizations with granular Role-Based Access Control (Admins, Managers, Staff).</li>
    <li><strong>Dual Deployment:</strong> Support both browser-based operations and standalone offline-tolerant desktop execution via Electron.</li>
  </ul>

  <h1>4. TECHNOLOGY STACK SPECIFICATIONS <span class="section-tag">Section 4</span></h1>
  <p>
    Automation-CGI leverages a modern, decoupled tech stack designed for high throughput, maintainability, and responsiveness:
  </p>

  <table>
    <thead>
      <tr>
        <th>Tier / Domain</th>
        <th>Technologies Used</th>
        <th>Key Role & Architecture Responsibility</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Frontend Core</strong></td>
        <td>React 19, Vite, React Router v7</td>
        <td>Single-page application (SPA), route guards, component hierarchy, instant HMR.</td>
      </tr>
      <tr>
        <td><strong>Styling & Motion</strong></td>
        <td>Tailwind CSS v4, Framer Motion</td>
        <td>Responsive modern interface, animated transitions, modal overlays, theme tokens.</td>
      </tr>
      <tr>
        <td><strong>Data Visualization</strong></td>
        <td>Apache ECharts, Recharts</td>
        <td>Dynamic heatmaps, inventory stock distribution, monthly sales revenue charts.</td>
      </tr>
      <tr>
        <td><strong>Hardware / Optical</strong></td>
        <td>html5-qrcode, qrcode.react</td>
        <td>Live webcam/mobile barcode and QR scanning, client-side QR label generation.</td>
      </tr>
      <tr>
        <td><strong>Backend API</strong></td>
        <td>Node.js v24, Express v5</td>
        <td>RESTful API layer, layered Controller-Service-Repository design pattern.</td>
      </tr>
      <tr>
        <td><strong>Database & ORM</strong></td>
        <td>PostgreSQL 18.4, Supabase, <code>pg.Pool</code></td>
        <td>Relational schema, foreign keys, multi-tenant isolation, connection pooling.</td>
      </tr>
      <tr>
        <td><strong>Auth & Security</strong></td>
        <td>JWT, Bcrypt, Nodemailer</td>
        <td>Salted password hashing, stateless tokens, email OTP verification flows.</td>
      </tr>
      <tr>
        <td><strong>Financial Services</strong></td>
        <td>Razorpay SDK</td>
        <td>Order creation, client checkout integration, cryptographic signature verification.</td>
      </tr>
      <tr>
        <td><strong>AI & Analytics</strong></td>
        <td>Custom Rule Engine, Ollama / OpenAI</td>
        <td>Intent extraction, multi-turn session store, domain tool dispatching.</td>
      </tr>
      <tr>
        <td><strong>Desktop Packaging</strong></td>
        <td>Electron v43, electron-builder</td>
        <td>Native Windows executable wrapping frontend and spawning backend Node process.</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- ========================================== -->
<!-- 5. SYSTEM ARCHITECTURE                     -->
<!-- ========================================== -->
<div class="page-break-before">
  <div class="page-header">
    <span>Automation-CGI • Warehouse Management System</span>
    <span>System Architecture</span>
  </div>

  <h1>5. SYSTEM ARCHITECTURE & HIGH-LEVEL DESIGN <span class="section-tag">Section 5</span></h1>
  <p>
    The system is structured according to an Enterprise Multi-Tier Layered Architecture that guarantees separation of concerns, modular testability, and high horizontal scalability:
  </p>

  <div class="arch-container">
    <!-- Presentation Layer -->
    <div class="arch-tier">
      <div class="arch-tier-header">
        <span>1. Presentation Layer (Client Tier)</span>
        <span class="badge badge-blue">React 19 / Electron</span>
      </div>
      <div class="arch-boxes">
        <div class="arch-box"><strong>Vite SPA</strong>Components, Pages, Hooks</div>
        <div class="arch-box"><strong>Interactive BI</strong>ECharts, Heatmaps, Recharts</div>
        <div class="arch-box"><strong>Hardware Scanner</strong>html5-qrcode live stream</div>
        <div class="arch-box"><strong>Desktop Host</strong>Electron native shell</div>
      </div>
    </div>

    <div class="arch-connector">▼ HTTP / REST (JSON) • JWT Bearer Token Headers ▼</div>

    <!-- API Gateway / Controller Layer -->
    <div class="arch-tier">
      <div class="arch-tier-header">
        <span>2. Application & API Routing Layer (Server Tier)</span>
        <span class="badge badge-green">Express 5 REST APIs</span>
      </div>
      <div class="arch-boxes">
        <div class="arch-box"><strong>Auth Routes</strong>JWT, OTP, Bcrypt</div>
        <div class="arch-box"><strong>Inventory Routes</strong>CRUD, Location Slotting</div>
        <div class="arch-box"><strong>Order & PO Routes</strong>ACID Transaction Handlers</div>
        <div class="arch-box"><strong>AI Chat Routes</strong>/api/ai/chat handler</div>
      </div>
    </div>

    <div class="arch-connector">▼ Internal Service Calls & AI Intent Tool Dispatching ▼</div>

    <!-- Business Logic & AI Layer -->
    <div class="arch-tier">
      <div class="arch-tier-header">
        <span>3. Domain Logic & Intelligence Tier</span>
        <span class="badge badge-purple">Services & AI Engine</span>
      </div>
      <div class="arch-boxes">
        <div class="arch-box"><strong>Domain Services</strong>Stock calculations, PO logic</div>
        <div class="arch-box"><strong>Payment Engine</strong>Razorpay Signature Verify</div>
        <div class="arch-box"><strong>Intent Analyzer</strong>Rule keyword scoring</div>
        <div class="arch-box"><strong>LLM Fallback</strong>Ollama / OpenAI API</div>
      </div>
    </div>

    <div class="arch-connector">▼ Connection Pool (pg.Pool) • SQL Parameterized Queries ▼</div>

    <!-- Data Persistence Layer -->
    <div class="arch-tier">
      <div class="arch-tier-header">
        <span>4. Data & Persistence Tier</span>
        <span class="badge badge-amber">PostgreSQL 18.4 / Supabase</span>
      </div>
      <div class="arch-boxes">
        <div class="arch-box"><strong>Core Entities</strong>warehouses, inventory, products</div>
        <div class="arch-box"><strong>Orders & POs</strong>orders, orderitems, purchaseorders</div>
        <div class="arch-box"><strong>BOM Schema</strong>bom, bom_items components</div>
        <div class="arch-box"><strong>Multi-Tenant Key</strong>organizations foreign keys</div>
      </div>
    </div>
  </div>

  <h2>5.1 Layered Backend Architecture Pattern</h2>
  <p>
    The backend strictly enforces the <strong>Controller-Service-Repository</strong> design pattern:
  </p>
  <ul>
    <li><strong>Controllers (e.g., <code>orderController.js</code>):</strong> Accept incoming HTTP requests, validate query parameters and JSON payloads, and return standardized JSON responses (<code>{ success, data, message }</code>).</li>
    <li><strong>Services (e.g., <code>paymentService.js</code>, <code>aiService.js</code>):</strong> Implement core business policies, mathematical validations, OTP email transmissions, and multi-step workflows.</li>
    <li><strong>Repositories (e.g., <code>inventoryRepository.js</code>):</strong> Direct data access layer executing optimized SQL queries with parameterized variables (<code>$1, $2, ...</code>) preventing SQL injection attacks.</li>
  </ul>
</div>

<!-- ========================================== -->
<!-- 6. CORE FUNCTIONAL MODULES                 -->
<!-- ========================================== -->
<div class="page-break-before">
  <div class="page-header">
    <span>Automation-CGI • Warehouse Management System</span>
    <span>Core Functional Modules</span>
  </div>

  <h1>6. DETAILED SYSTEM MODULES & FUNCTIONAL IMPLEMENTATION <span class="section-tag">Section 6</span></h1>

  <h2>6.1 Authentication & Multi-Tenant Access Control (RBAC)</h2>
  <p>
    User authentication is secured using JSON Web Tokens (JWT) and Bcrypt cryptographic hashing (salt rounds: 10). The registration and password reset workflows feature an integrated two-factor verification mechanism powered by <code>otp-generator</code> and <code>nodemailer</code>. Users receive a time-expiring 6-digit numeric OTP via SMTP. The client verifies the token before activating the user account or permitting password modification. Protected routes in React (<code>ProtectedRoute.jsx</code>) ensure unauthorized access is blocked.
  </p>

  <h2>6.2 Executive Dashboard & Live Business Intelligence</h2>
  <p>
    The executive dashboard provides high-level situational awareness through parallel database aggregations (<code>Promise.all</code>):
  </p>
  <ul>
    <li><strong>KPI Summary Cards:</strong> Real-time counts of Total Products, Low-Stock Warnings (items below reorder thresholds), Total Orders, Delivered Revenue, and Active Suppliers.</li>
    <li><strong>Warehouse Stock Health Heatmap:</strong> Visual matrix depicting inventory density and stock levels across multiple warehouse facilities.</li>
    <li><strong>Recent Activity & Status Badges:</strong> Chronological feed of recent customer orders and purchase orders with dynamic status tracking (<code>PENDING</code>, <code>PROCESSING</code>, <code>SHIPPED</code>, <code>DELIVERED</code>).</li>
  </ul>

  <h2>6.3 Granular Physical Inventory & Location Slotting</h2>
  <p>
    Unlike simplistic inventory trackers, Automation-CGI incorporates a 3-dimensional physical coordinate system: <strong>Aisle, Rack, and Bin</strong> linked through the <code>locations</code> table. The system calculates:
  </p>
  <pre>available_quantity = quantity - COALESCE(reserved_quantity, 0) - COALESCE(damaged_quantity, 0)</pre>
  <p>
    Warehouse operators can rapidly adjust damaged quantities, update stock counts via modals, and inspect unit costs and selling prices for precise warehouse valuation.
  </p>

  <h2>6.4 Product Master Catalog & Bill of Materials (BOM)</h2>
  <p>
    The product module maintains SKU definitions, descriptions, barcodes, category classifications, and reorder levels. Additionally, the system supports assembly manufacturing through the <strong>Bill of Materials (BOM)</strong> engine. The <code>bom</code> and <code>bom_items</code> tables define the multi-component ingredients required to manufacture a composite finished product, complete with required quantities and unit measurements.
  </p>

  <h2>6.5 Sales Order Lifecycle & ACID Transactional Fulfillment</h2>
  <p>
    Orders encapsulate multi-line items associated with customers. Order creation executes within a strict PostgreSQL database transaction:
  </p>
  <pre>BEGIN;
-- 1. Insert parent order record
INSERT INTO orders (customer_id, status, total_amount) VALUES ($1, 'PENDING', $2) RETURNING *;
-- 2. Insert line items in loop
INSERT INTO orderitems (order_id, product_id, quantity, unit_price, total_price) VALUES ...;
COMMIT; -- Or ROLLBACK on error</pre>
  <p>
    Upon order shipment, reserved quantities are cleared, physical stock is decremented, and revenue is recorded upon <code>DELIVERED</code> status.
  </p>

  <h2>6.6 Procurement & Purchase Order (PO) Management</h2>
  <p>
    When inventory levels drop below thresholds, procurement managers generate Purchase Orders mapped to approved suppliers. The PO lifecycle transitions through <code>PENDING</code>, <code>APPROVED</code>, <code>RECEIVED</code>, or <code>CANCELLED</code>, allowing seamless restocking into designated warehouse locations.
  </p>

  <h2>6.7 Supplier & Vendor Directory</h2>
  <p>
    Maintains complete vendor profiles including supplier names, contact emails, phone numbers, addresses, and transaction histories, ensuring reliable supply chain continuity.
  </p>
</div>

<!-- ========================================== -->
<!-- 7. ADVANCED INTELLIGENCE & INTEGRATION     -->
<!-- ========================================== -->
<div class="page-break-before">
  <div class="page-header">
    <span>Automation-CGI • Warehouse Management System</span>
    <span>AI Intelligence & Integrations</span>
  </div>

  <h1>7. ADVANCED INTELLIGENCE & HARDWARE INTEGRATIONS <span class="section-tag">Section 7</span></h1>

  <h2>6.8 Conversational Warehouse AI Assistant</h2>
  <p>
    Automation-CGI features a native, proprietary <strong>Warehouse AI Engine</strong> (<code>/api/ai/chat</code>) capable of answering real-time business queries without requiring SQL knowledge. The architecture implements a hybrid multi-tier intelligence pipeline:
  </p>

  <div class="callout-box">
    <strong>Hybrid AI Execution Pipeline:</strong>
    <ol>
      <li><strong>Session Context Resolver:</strong> Recalls multi-turn context (e.g., user asks "What are my low stock items?" followed by "Show me the suppliers for those").</li>
      <li><strong>Rule-Based Intent Analyzer:</strong> High-speed keyword and pattern scoring matching intents (<code>INVENTORY_QUERY</code>, <code>LOW_STOCK</code>, <code>ORDER_STATUS</code>, <code>PRICE_CHECK</code>, <code>SUPPLIER_LOOKUP</code>).</li>
      <li><strong>LLM Fallback Router:</strong> Natural language prompts that do not match exact rule patterns are routed to a local or cloud LLM (Ollama / OpenAI) for zero-shot entity extraction.</li>
      <li><strong>Domain Tool Dispatcher:</strong> Maps resolved intents to backend repositories (<code>inventoryTool</code>, <code>orderTool</code>, <code>productTool</code>) to retrieve actual live database records.</li>
      <li><strong>Natural Language Generator:</strong> Formats the raw database rows into an intuitive, readable response returned to the frontend chat UI.</li>
    </ol>
  </div>

  <h2>6.9 AI-Driven Dynamic Chart Generation</h2>
  <p>
    Inside the dashboard, users can request visualizations in natural language (e.g., <em>"Show me a heatmap of warehouse stock"</em> or <em>"Generate an inventory flow sankey diagram"</em>). The <code>AIChart</code> component parses the request and dynamically renders:
  </p>
  <ul>
    <li><strong>Heatmaps:</strong> Stock density across facilities.</li>
    <li><strong>Sankey Diagrams:</strong> Visual inventory flow and stock movements.</li>
    <li><strong>Scatter Plots & Radar Charts:</strong> Category distributions and stock balance metrics.</li>
    <li><strong>Gauge Health Meters:</strong> Real-time warehouse utilization and stock health indexes.</li>
  </ul>

  <h2>6.10 Optical Barcode & QR Code Scanning</h2>
  <p>
    Floor workers can perform instant stock lookups and physical inventory counts using the integrated camera scanner powered by <code>html5-qrcode</code>. Concurrently, the product catalog dynamically generates scannable QR codes using <code>qrcode.react</code> for printing onto physical warehouse bin labels.
  </p>

  <h2>6.11 Integrated Razorpay Payment Gateway</h2>
  <p>
    For B2B orders and customer checkouts, Automation-CGI integrates the Razorpay SDK. The server generates an authenticated <code>order_id</code>, prompts the interactive Razorpay checkout modal in React, and verifies payment authenticity on the server using cryptographic HMAC SHA-256 signature matching before marking orders as <code>PAID</code>.
  </p>

  <h2>6.12 Operational Reporting & Data Export Engine</h2>
  <p>
    The reports feature provides customizable filtering by date range, warehouse facility, and status. Reports can be immediately exported in two enterprise formats:
  </p>
  <ul>
    <li><strong>PDF Export:</strong> Rendered directly via <code>jspdf</code> and <code>jspdf-autotable</code> with formatted headers and page counters.</li>
    <li><strong>Excel Spreadsheet:</strong> Exported using <code>xlsx</code> and <code>file-saver</code> for corporate spreadsheet workflows.</li>
  </ul>

  <h2>6.13 Cross-Platform Native Desktop Client (Electron)</h2>
  <p>
    To accommodate rugged warehouse terminals that operate offline or in standalone kiosk mode, Automation-CGI is bundled into a native Windows executable via Electron. The <code>electron.js</code> main process automatically spawns the Node.js backend server in a background child process and mounts the production Vite build in a desktop window (1400x900).
  </p>
</div>

<!-- ========================================== -->
<!-- 8. DATABASE SCHEMA                         -->
<!-- ========================================== -->
<div class="page-break-before">
  <div class="page-header">
    <span>Automation-CGI • Warehouse Management System</span>
    <span>Database Schema & Data Dictionary</span>
  </div>

  <h1>8. DATABASE SCHEMA & DATA DICTIONARY <span class="section-tag">Section 8</span></h1>
  <p>
    The relational database is architected on PostgreSQL 18.4 with 16 interconnected tables maintaining strict foreign key constraints, sequence generators, and multi-tenant organization identifiers:
  </p>

  <table>
    <thead>
      <tr>
        <th>Table Name</th>
        <th>Primary Key</th>
        <th>Foreign Key Relationships</th>
        <th>Purpose & Core Attributes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>organizations</code></td>
        <td><code>id (PK)</code></td>
        <td>-</td>
        <td>Multi-tenant root entity isolating company accounts, names, and creation timestamps.</td>
      </tr>
      <tr>
        <td><code>warehouses</code></td>
        <td><code>id (PK)</code></td>
        <td><code>organization_id -> organizations(id)</code></td>
        <td>Physical storage facilities, addresses, capacity, and active operating status.</td>
      </tr>
      <tr>
        <td><code>locations</code></td>
        <td><code>id (PK)</code></td>
        <td><code>warehouse_id -> warehouses(id)</code></td>
        <td>Spatial coordinate mapping inside warehouse: <code>aisle</code>, <code>rack</code>, and <code>bin</code>.</td>
      </tr>
      <tr>
        <td><code>products</code></td>
        <td><code>id (PK)</code></td>
        <td><code>organization_id -> organizations(id)</code></td>
        <td>Master item catalog: <code>sku</code>, <code>name</code>, <code>category</code>, <code>reorder_threshold</code>.</td>
      </tr>
      <tr>
        <td><code>inventory</code></td>
        <td><code>id (PK)</code></td>
        <td><code>product_id -> products(id)<br>location_id -> locations(id)</code></td>
        <td>Stock counts: <code>quantity</code>, <code>reserved_quantity</code>, <code>damaged_quantity</code>, <code>unit_cost</code>.</td>
      </tr>
      <tr>
        <td><code>bom</code></td>
        <td><code>id (PK)</code></td>
        <td><code>product_id -> products(id)</code></td>
        <td>Bill of Materials header specifying assembly version and active status.</td>
      </tr>
      <tr>
        <td><code>bom_items</code></td>
        <td><code>id (PK)</code></td>
        <td><code>bom_id -> bom(id)<br>component_product_id -> products(id)</code></td>
        <td>Bill of Materials line items: required component products, quantities, and units.</td>
      </tr>
      <tr>
        <td><code>suppliers</code></td>
        <td><code>id (PK)</code></td>
        <td><code>organization_id -> organizations(id)</code></td>
        <td>Vendor profiles: <code>name</code>, <code>contact_name</code>, <code>email</code>, <code>phone</code>, <code>address</code>.</td>
      </tr>
      <tr>
        <td><code>purchaseorders</code></td>
        <td><code>id (PK)</code></td>
        <td><code>supplier_id -> suppliers(id)</code></td>
        <td>Procurement orders: <code>order_number</code>, <code>status</code>, <code>total_amount</code>, <code>order_date</code>.</td>
      </tr>
      <tr>
        <td><code>purchaseorderitems</code></td>
        <td><code>id (PK)</code></td>
        <td><code>purchase_order_id -> purchaseorders(id)<br>product_id -> products(id)</code></td>
        <td>Inbound PO items: <code>quantity</code>, <code>unit_price</code>, <code>total_price</code>.</td>
      </tr>
      <tr>
        <td><code>orders</code></td>
        <td><code>id (PK)</code></td>
        <td><code>customer_id -> users(id)</code></td>
        <td>Customer sales orders: <code>status</code> (PENDING, DELIVERED), <code>total_amount</code>.</td>
      </tr>
      <tr>
        <td><code>orderitems</code></td>
        <td><code>id (PK)</code></td>
        <td><code>order_id -> orders(id)<br>product_id -> products(id)</code></td>
        <td>Sales order line items: <code>quantity</code>, <code>unit_price</code>, <code>total_price</code>.</td>
      </tr>
      <tr>
        <td><code>users</code></td>
        <td><code>id (PK)</code></td>
        <td><code>organization_id -> organizations(id)</code></td>
        <td>System accounts: <code>name</code>, <code>role</code> (Admin, Staff), <code>email</code>, <code>password</code> (Bcrypt).</td>
      </tr>
      <tr>
        <td><code>otp_verification</code></td>
        <td><code>id (PK)</code></td>
        <td>-</td>
        <td>Two-factor tokens: <code>email</code>, <code>otp</code>, <code>expires_at</code>, <code>is_verified</code>.</td>
      </tr>
      <tr>
        <td><code>payments</code></td>
        <td><code>id (PK)</code></td>
        <td><code>order_id -> orders(id)</code></td>
        <td>Financial logs: <code>provider</code> (RAZORPAY), <code>provider_order_id</code>, <code>amount</code>, <code>status</code>.</td>
      </tr>
      <tr>
        <td><code>stockmovements</code></td>
        <td><code>id (PK)</code></td>
        <td><code>product_id -> products(id)<br>location_id -> locations(id)</code></td>
        <td>Immutable audit log: stock transfer tracking, timestamps, and user associations.</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- ========================================== -->
<!-- 9. RESTFUL API SPECIFICATIONS              -->
<!-- ========================================== -->
<div class="page-break-before">
  <div class="page-header">
    <span>Automation-CGI • Warehouse Management System</span>
    <span>API Specifications & Architecture</span>
  </div>

  <h1>9. RESTFUL API SPECIFICATIONS <span class="section-tag">Section 9</span></h1>
  <p>
    The backend exposes a comprehensive RESTful API adhering to HTTP semantics and standardized JSON response payloads:
  </p>

  <table>
    <thead>
      <tr>
        <th>Module</th>
        <th>Method</th>
        <th>Endpoint Path</th>
        <th>Description & Parameters</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Auth</strong></td>
        <td><code>POST</code></td>
        <td><code>/api/auth/register</code></td>
        <td>Creates user account with hashed password and generates initial verification OTP.</td>
      </tr>
      <tr>
        <td><strong>Auth</strong></td>
        <td><code>POST</code></td>
        <td><code>/api/auth/login</code></td>
        <td>Validates credentials via Bcrypt; returns signed JWT bearer token and user metadata.</td>
      </tr>
      <tr>
        <td><strong>Auth</strong></td>
        <td><code>POST</code></td>
        <td><code>/api/auth/verify-otp</code></td>
        <td>Validates 6-digit email OTP against <code>otp_verification</code> table.</td>
      </tr>
      <tr>
        <td><strong>Dashboard</strong></td>
        <td><code>GET</code></td>
        <td><code>/api/dashboard</code></td>
        <td>Returns aggregated KPI metrics, categories breakdown, heatmap matrix, and recent orders.</td>
      </tr>
      <tr>
        <td><strong>Inventory</strong></td>
        <td><code>GET</code></td>
        <td><code>/api/inventory</code></td>
        <td>Fetches all inventory joined with physical coordinates (aisle, rack, bin) and status.</td>
      </tr>
      <tr>
        <td><strong>Inventory</strong></td>
        <td><code>PUT</code></td>
        <td><code>/api/inventory/:id</code></td>
        <td>Updates inventory quantities, reserved levels, or damaged units.</td>
      </tr>
      <tr>
        <td><strong>Products</strong></td>
        <td><code>GET / POST</code></td>
        <td><code>/api/products</code></td>
        <td>Lists active SKUs or registers new catalog products with reorder thresholds.</td>
      </tr>
      <tr>
        <td><strong>Products</strong></td>
        <td><code>PUT / DELETE</code></td>
        <td><code>/api/products/:id</code></td>
        <td>Modifies product attributes or removes obsolete catalog items.</td>
      </tr>
      <tr>
        <td><strong>Orders</strong></td>
        <td><code>GET / POST</code></td>
        <td><code>/api/orders</code></td>
        <td>Retrieves order history or executes multi-line order creation within ACID transaction.</td>
      </tr>
      <tr>
        <td><strong>Purchase Orders</strong></td>
        <td><code>GET / POST</code></td>
        <td><code>/api/purchaseorders</code></td>
        <td>Fetches procurement records or issues new restock PO to a designated supplier.</td>
      </tr>
      <tr>
        <td><strong>Purchase Orders</strong></td>
        <td><code>PUT</code></td>
        <td><code>/api/purchaseorders/:id/status</code></td>
        <td>Updates PO status to <code>RECEIVED</code> and triggers automatic stock replenishment.</td>
      </tr>
      <tr>
        <td><strong>Suppliers</strong></td>
        <td><code>GET / POST</code></td>
        <td><code>/api/suppliers</code></td>
        <td>Manages external vendor directory and contact records.</td>
      </tr>
      <tr>
        <td><strong>Payments</strong></td>
        <td><code>POST</code></td>
        <td><code>/api/payments/create</code></td>
        <td>Initializes a Razorpay payment order for an existing sales order.</td>
      </tr>
      <tr>
        <td><strong>Payments</strong></td>
        <td><code>POST</code></td>
        <td><code>/api/payments/verify</code></td>
        <td>Verifies HMAC SHA-256 signature; updates payment status to <code>PAID</code>.</td>
      </tr>
      <tr>
        <td><strong>AI Assistant</strong></td>
        <td><code>POST</code></td>
        <td><code>/api/ai/chat</code></td>
        <td>Accepts <code>{ prompt, sessionId }</code>, executes intent resolution, and returns conversational response.</td>
      </tr>
      <tr>
        <td><strong>Reports</strong></td>
        <td><code>POST</code></td>
        <td><code>/api/report</code></td>
        <td>Generates filterable report dataset across inventory, sales, or supplier metrics.</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- ========================================== -->
<!-- 10. SECURITY & DEPLOYMENT                  -->
<!-- ========================================== -->
<div class="page-break-before">
  <div class="page-header">
    <span>Automation-CGI • Warehouse Management System</span>
    <span>Security, Reliability & Deployment</span>
  </div>

  <h1>10. SECURITY, RELIABILITY & CONCURRENCY <span class="section-tag">Section 10</span></h1>

  <h2>10.1 Cryptographic & Application Security</h2>
  <ul>
    <li><strong>Password Security:</strong> User credentials are protected using salted Bcrypt hashes before persistence, ensuring passwords are never stored in plaintext.</li>
    <li><strong>Stateless Authentication:</strong> Sensitive routes require an <code>Authorization: Bearer &lt;JWT&gt;</code> header verified via <code>authMiddleware.js</code>.</li>
    <li><strong>SQL Injection Elimination:</strong> All database queries in the repository tier strictly utilize parameterized placeholders (<code>$1, $2, ...</code>), precluding injection vectors.</li>
    <li><strong>Financial Signature Verification:</strong> Razorpay payments are verified on the backend by calculating <code>HMAC-SHA256(order_id + "|" + payment_id, secret)</code>, preventing payment spoofing.</li>
  </ul>

  <h2>10.2 Concurrency & Transaction Management</h2>
  <p>
    Inventory allocation and multi-item orders are susceptible to race conditions. Automation-CGI guarantees atomicity by wrapping multi-row operations inside explicit database transactions (<code>BEGIN</code> ... <code>COMMIT</code> / <code>ROLLBACK</code>). Connection pooling through <code>pg.Pool</code> maintains up to 5 concurrent active connections with automated keepalive and 30-second idle timeouts.
  </p>

  <h1>11. HARDWARE SPECIFICATIONS & DEPLOYMENT <span class="section-tag">Section 11</span></h1>
  <p>
    Automation-CGI supports versatile deployment topologies adapted to cloud hosting and warehouse floor kiosks:
  </p>

  <table>
    <thead>
      <tr>
        <th>Deployment Mode</th>
        <th>Environment / Stack</th>
        <th>Launch Command</th>
        <th>Operational Use Case</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Full-Stack Development</strong></td>
        <td>Concurrent Node + Vite dev servers</td>
        <td><code>npm run dev</code></td>
        <td>Local feature development, hot-module reloading, debugging.</td>
      </tr>
      <tr>
        <td><strong>Native Desktop Client</strong></td>
        <td>Electron + Production Web Build</td>
        <td><code>npm run desktop</code></td>
        <td>Rugged warehouse floor terminals, barcode scanning kiosks, standalone workstations.</td>
      </tr>
      <tr>
        <td><strong>One-Click Batch Script</strong></td>
        <td>Windows Shell Batch File</td>
        <td><code>start-warehouse.bat</code></td>
        <td>Instant operator launch without terminal command knowledge.</td>
      </tr>
      <tr>
        <td><strong>Production Executable</strong></td>
        <td>Electron-builder NSIS Installer</td>
        <td><code>npm run dist</code></td>
        <td>Generates <code>.exe</code> installer for rapid enterprise IT provisioning.</td>
      </tr>
    </tbody>
  </table>

  <div class="callout-box info">
    <strong>Environment Variables Configuration (<code>.env</code>):</strong>
    Configures <code>PORT=8000</code>, <code>DATABASE_URL</code> (PostgreSQL SSL connection string), <code>JWT_SECRET</code>, <code>EMAIL_USER</code> & <code>EMAIL_PASS</code> (Gmail SMTP credentials), and <code>RAZORPAY_KEY_ID</code> & <code>RAZORPAY_KEY_SECRET</code>.
  </div>
</div>

<!-- ========================================== -->
<!-- 11. ROADMAP & CONCLUSION                   -->
<!-- ========================================== -->
<div class="page-break-before">
  <div class="page-header">
    <span>Automation-CGI • Warehouse Management System</span>
    <span>Future Roadmap & Conclusion</span>
  </div>

  <h1>12. FUTURE ROADMAP & STRATEGIC ENHANCEMENTS <span class="section-tag">Section 12</span></h1>
  <p>
    Building upon the solid architecture of Automation-CGI, the following strategic enhancements are slated for future releases:
  </p>
  <ul>
    <li><strong>RFID Portal Gate Integration:</strong> Integrating UHF RFID antenna readers at dock doors for zero-touch pallet scanning during inbound unloading and outbound shipping.</li>
    <li><strong>Predictive AI Demand Forecasting:</strong> Incorporating historical seasonality algorithms to predict stock replenishment quantities weeks in advance (building on the stubbed <code>forecastService.js</code>).</li>
    <li><strong>IoT Environmental Telemetry:</strong> Connecting temperature and humidity sensors in perishable inventory zones with automated alerts for anomalous conditions.</li>
    <li><strong>Automated Mobile Robot (AMR) Dispatch:</strong> Transmitting pick-path coordinates (Aisle, Rack, Bin) to automated warehouse mobile picking robots.</li>
  </ul>

  <h1>13. CONCLUSION & TECHNICAL SUMMARY <span class="section-tag">Section 13</span></h1>
  <p>
    <strong>Automation-CGI</strong> successfully bridges the gap between traditional warehouse inventory tracking and modern intelligent enterprise platforms. By integrating real-time spatial slotting, multi-level Bill of Materials, ACID-compliant sales fulfillment, integrated Razorpay payments, optical camera-based QR scanning, and a conversational AI intelligence assistant, the system provides an all-in-one solution for high-throughput logistics.
  </p>
  <p>
    The implementation achieves high technical maturity through its clean separation of concerns (React 19 SPA, Express 5 Layered Backend, PostgreSQL Database, and Electron Desktop Shell). The system stands fully functional, thoroughly documented, and ready for enterprise operational deployment.
  </p>

  <div style="margin-top: 35px; border-top: 2px solid #e2e8f0; padding-top: 15px; display: flex; justify-content: space-between; font-size: 9pt; color: #64748b;">
    <div>
      <strong>Project Author:</strong> Rishabh<br>
      <strong>Application:</strong> Automation-CGI Enterprise WMS<br>
      <strong>Status:</strong> Verified & Complete
    </div>
    <div style="text-align: right;">
      <strong>Generated Format:</strong> PDF Document Report<br>
      <strong>Framework:</strong> React 19 • Express 5 • PostgreSQL • Electron<br>
      <strong>Date:</strong> March 2026
    </div>
  </div>
</div>

</body>
</html>
`;

// 3. Write HTML file
const htmlPath = path.join(__dirname, "Automation_CGI_Project_Report.html");
fs.writeFileSync(htmlPath, htmlContent, "utf-8");
console.log("Created HTML Report at:", htmlPath);

// 4. Generate PDF using Edge Headless
const pdfPath = path.join(__dirname, "Automation_CGI_Project_Report.pdf");
console.log("Rendering PDF via Microsoft Edge Headless...");

const edgeExecutable = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const command = '"' + edgeExecutable + '" --headless --disable-gpu --run-all-compositor-stages-before-draw --no-pdf-header-footer --print-to-pdf="' + pdfPath + '" "' + htmlPath + '"';

try {
  const stdout = execSync(command, { stdio: "pipe" });
  console.log("Edge Output:", stdout.toString());
} catch (error) {
  console.log("Edge process exited. Checking if PDF was created...");
}

// 5. Verify PDF
if (fs.existsSync(pdfPath)) {
  const stats = fs.statSync(pdfPath);
  console.log("SUCCESS! PDF Report generated successfully!");
  console.log("PDF File Path:", pdfPath);
  console.log("PDF File Size:", stats.size, "bytes (" + (stats.size / 1024).toFixed(1) + " KB)");
} else {
  console.error("Failed to generate PDF. Check Edge executable path or permissions.");
}
