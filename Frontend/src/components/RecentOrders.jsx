export default function RecentOrders({ orders }) {
  return (
    <div
      style={{
        background: "#1E293B",
        borderRadius: "20px",
        padding: "24px",
        color: "white",
      }}
    >
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        Recent Orders
      </h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={{ padding: "12px 0" }}>ORD-{order.id}</td>
              <td>{order.customer_name}</td>
              <td>{order.status}</td>
              <td>₹{Number(order.total_amount).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}