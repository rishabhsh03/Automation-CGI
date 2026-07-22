import { useEffect, useState } from "react";

export default function RecentOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8000/api/orders/recent")
            .then(res => res.json())
            .then(result => {

                if(result.success){

                    setOrders(result.data);

                }

            });

    }, []);

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">

                Recent Orders

            </h2>

            <table className="w-full">

                <thead>

                    <tr>

                        <th>Order</th>

                        <th>Customer</th>

                        <th>Status</th>

                        <th>Amount</th>

                    </tr>

                </thead>

                <tbody>

                    {orders.map(order=>(

                        <tr key={order.id}>

                            <td>ORD-{order.id}</td>

                            <td>{order.customer}</td>

                            <td>{order.status}</td>

                            <td>

                                ₹{Number(order.total_amount).toLocaleString()}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}