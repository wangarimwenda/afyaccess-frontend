import { useState } from "react";

export default function CheckoutModal({
  cart,
  setCart,
  close,
  currentUser,
}) {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

async function submitOrder() {
  setError("");

  if (!currentUser) {
    setError("You must login before placing an order");
    return;
  }

  if (!phone || !address) {
    setError("Phone and address are required");
    return;
  }

    if (!phone.trim() || !address.trim()) {
      setError("Phone and address are required");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        user: currentUser?.email || "guest",
        items: cart,
        total,
        phone,
        address,
      };

      console.log("Sending order:", orderData);

      const res = await fetch(
        "https://afyaccess-backend.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      console.log("Response status:", res.status);

      const data = await res.json();

      console.log("Response data:", data);

      if (!res.ok) {
        setError(data.message || "Order failed");
        setLoading(false);
        return;
      }

      alert("Order placed successfully!");

      setCart([]);
      localStorage.removeItem("afyCart");

      close();
    } catch (err) {
      console.error("ORDER ERROR:", err);
      setError(err.message || "Network error");
    }

    setLoading(false);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Checkout</h2>

        <p>Total: KSh {total.toLocaleString()}</p>

        {error && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          onClick={submitOrder}
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm Order"}
        </button>

        <button onClick={close}>
          Cancel
        </button>
      </div>
    </div>
  );
}