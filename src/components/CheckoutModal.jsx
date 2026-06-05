import { useState } from "react";

export default function CheckoutModal({ cart, setCart, close, currentUser }) {

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

    if (!phone || !address) {
      setError("Phone and address are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://afyaccess-backend.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: currentUser.email,
          items: cart,
          total,
          phone,
          address
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Order failed");
        setLoading(false);
        return;
      }

      alert("Order placed successfully!");

      setCart([]);
      close();

    } catch (err) {
      setError("Network error");
    }

    setLoading(false);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2>Checkout</h2>

        <p>Total: KSh {total.toLocaleString()}</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          placeholder="Phone number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />

        <textarea
          placeholder="Delivery address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />

        <button onClick={submitOrder} disabled={loading}>
          {loading ? "Processing..." : "Confirm Order"}
        </button>

        <button onClick={close}>Cancel</button>

      </div>
    </div>
  );
}