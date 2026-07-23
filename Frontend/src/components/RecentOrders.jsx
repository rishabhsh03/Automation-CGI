export default function RecentOrders({ orders }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

      <table className="w-full">
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>ORD-{order.id}</td>
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