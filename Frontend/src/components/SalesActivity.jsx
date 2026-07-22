import "./SalesActivity.css";
import {
    FaClock,
    FaTruck,
    FaCheckCircle,
    FaUndoAlt,
} from "react-icons/fa";

export default function SalesActivity({ summary = {} }) {
  console.log("SalesActivity Summary:", summary);
    return (
      
        <div className="sales-card">

            <div className="sales-header">

                <h2>Sales Activity</h2>

            </div>

            <div className="sales-grid">

                <div className="activity pending">

                    <FaClock className="activity-icon pulse" />

                    <h1>{summary.pendingOrders || 0}</h1>

                    <p>Pending Orders</p>

                </div>

                <div className="activity ready">

                    <FaTruck className="activity-icon truck" />

                    <h1>{summary.processingOrders || 0}</h1>

                    <p>Processing</p>

                </div>

                <div className="activity delivered">

                    <FaCheckCircle className="activity-icon bounce" />

                    <h1>{summary.deliveredOrders || 0}</h1>

                    <p>Delivered</p>

                </div>

                <div className="activity returned">

                    <FaUndoAlt className="activity-icon rotate" />

                    <h1>{summary.cancelledOrders || 0}</h1>

                    <p>Cancelled</p>

                </div>

            </div>

        </div>

    );

}