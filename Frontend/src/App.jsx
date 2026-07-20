import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import ForgotPassword from "./features/auth/ForgotPassword";
import Dashboard from "./features/dashboard/Dashboard"; // Import Dashboard
import Inventory from "./features/inventory/Inventory";
import Products from "./features/product/Products";
import Orders from "./features/order/Orders";
import Suppliers from "./features/supplier/Suppliers";
import Reports from "./features/report/Reports";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/Suppliers" element={<Suppliers/>}/>
        <Route path="/Reports" element={<Reports/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;