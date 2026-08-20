import "./RecentOrder.css"
export default function RecentOrders({ orders = [] }) {
  return (
    <div className="recent-orders">
      <h2>Recent Orders</h2>

      <div className="recent-orders-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="order-number">
                  ORD-{order.id}
                </td>

                <td className="customer-name">
                  {order.customer_name || "Unknown Customer"}
                </td>

                <td>
                  <span
                    className={`status ${order.status?.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="order-amount">
                  ₹{Number(order.total_amount || 0).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}