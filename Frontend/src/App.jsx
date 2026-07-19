import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;