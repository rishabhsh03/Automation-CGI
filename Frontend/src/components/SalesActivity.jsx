import "./SalesActivity.css";
import {
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaUndoAlt,
} from "react-icons/fa";

export default function SalesActivity() {
  return (
    <div className="sales-card">

      <div className="sales-header">
        <h2>Sales Activity</h2>
      </div>

      <div className="sales-grid">

        <div className="activity pending">

          <FaClock className="activity-icon pulse" />

          <h1>12</h1>

          <p>Pending Orders</p>

        </div>

        <div className="activity ready">

          <FaTruck className="activity-icon truck" />

          <h1>8</h1>

          <p>Ready To Ship</p>

        </div>

        <div className="activity delivered">

          <FaCheckCircle className="activity-icon bounce" />

          <h1>145</h1>

          <p>Delivered</p>

        </div>

        <div className="activity returned">

          <FaUndoAlt className="activity-icon rotate" />

          <h1>4</h1>

          <p>Returned</p>

        </div>

      </div>

    </div>
  );
}