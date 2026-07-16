export default function RecentOrders() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

      <table className="w-full">
        <thead>
          <tr>
            <th>Order</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>#1001</td>
            <td>Pending</td>
            <td>₹25,000</td>
          </tr>

          <tr>
            <td>#1002</td>
            <td>Delivered</td>
            <td>₹12,500</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}