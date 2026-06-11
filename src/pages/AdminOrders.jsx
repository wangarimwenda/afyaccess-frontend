import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://afyaccess-backend.onrender.com/api/orders")
      .then(res => res.json())
      .then(data => {
        setOrders(data); // IMPORTANT: backend returns array directly
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map(order => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <p><b>User:</b> {order.user}</p>
            <p><b>Phone:</b> {order.phone}</p>
            <p><b>Address:</b> {order.address}</p>
            <p><b>Total:</b> {order.total}</p>

            <p><b>Items:</b></p>
            <ul>
              {order.items.map(item => (
                <li key={item._id}>
                  {item.product} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
    
  );
}