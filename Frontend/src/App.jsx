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
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyOTP from "./features/auth/VerifyOTP";
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
        <Route path="/verify-otp" element={<VerifyOTP />} />
        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
  <Route
    path="/inventory"
    element={
        <ProtectedRoute>
            <Inventory />
        </ProtectedRoute>
    }
/>

<Route
    path="/products"
    element={
        <ProtectedRoute>
            <Products />
        </ProtectedRoute>
    }
/>

<Route
    path="/orders"
    element={
        <ProtectedRoute>
            <Orders />
        </ProtectedRoute>
    }
/>

<Route
    path="/suppliers"
    element={
        <ProtectedRoute>
            <Suppliers />
        </ProtectedRoute>
    }
/>

<Route
    path="/reports"
    element={
        <ProtectedRoute>
            <Reports />
        </ProtectedRoute>
    }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
