import { useEffect, useState } from "react";

export default function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch(
        "https://afyaccess-backend.onrender.com/api/orders"
      );

      const data = await res.json();
      setOrders(data.orders || []);

    } catch (err) {
      console.error("Error loading orders", err);
    }

    setLoading(false);
  }

  if (loading) return <p>Loading orders...</p>;

  return (
    <div style={{ padding: "20px" }}>

      <h2>📦 Admin Orders Dashboard</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map(order => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "8px"
            }}
          >

            <h3>Order ID: {order._id}</h3>

            <p><strong>User:</strong> {order.user}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Total:</strong> KSh {order.total}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            <h4>Items:</h4>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.product} × {item.quantity} (KSh {item.price})
                </li>
              ))}
            </ul>

          </div>
        ))
      )}
    </div>
  );
}