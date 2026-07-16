import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./features/dashboard/Dashboard";
import Inventory from "./features/inventory/Inventory"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/inventory" element={<Inventory />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;