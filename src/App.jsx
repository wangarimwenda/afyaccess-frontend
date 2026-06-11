import { useState, useEffect } from "react";
import { medicines } from "./data/medicines";

import ProductCard from "./components/ProductCard";
import CartItem from "./components/CartItem";
import AuthModal from "./components/AuthModal";
import CheckoutModal from "./components/CheckoutModal";
import AdminOrders from "./pages/AdminOrders";

import "./App.css";

export default function App() {
  // ================= STATE =================
  const [startedShopping, setStartedShopping] = useState(false);
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("shop");
  const [showAuth, setShowAuth] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const [search, setSearch] = useState("");
  const [therapeuticFilter, setTherapeuticFilter] = useState("All");

  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [showAdminForgot, setShowAdminForgot] = useState(false);

  // ================= FORGOT ADMIN PASSWORD =================
  const handleForgotAdminPassword = async () => {
    try {
      const res = await fetch(
        "https://afyaccess-backend.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "wangarimwenda0@gmail.com" })
        }
      );

      const data = await res.json();
      alert("Admin password reset link sent to your email");
      setShowAdminForgot(false);
    } catch (err) {
      alert("Error sending reset email");
    }
  };
  const path = window.location.pathname;
  const resetToken = path.split("/reset-password/")[1];
  const isResetRoute = path.startsWith("/reset-password/");

 

  // ================= THERAPEUTIC CLASSES =================
  const therapeuticClasses = [
    "All",
    ...new Set(medicines.map((m) => m.therapeutic))
  ];

  // ================= FORGOT PASSWORD =================
  const handleForgotPassword = async () => {
    try {
      const res = await fetch(
        "https://afyaccess-backend.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: forgotEmail })
        }
      );

      const data = await res.json();
      alert(data.message);
      setShowForgot(false);
    } catch (err) {
      alert("Error sending reset email");
    }
  };

  // ================= RESET PASSWORD CHECK =================
  if (isResetRoute) {
    return (
      <div className="app" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <ResetPasswordView resetToken={resetToken} />
      </div>
    );
  }

  // ================= RESET PASSWORD VIEW =================
  function ResetPasswordView({ resetToken }) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
      if (!newPassword || !confirmPassword) {
        alert("Please fill in both password fields");
        return;
      }

      if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      if (newPassword.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          "https://afyaccess-backend.onrender.com/api/auth/reset-password",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: resetToken,
              newPassword
            })
          }
        );

        const data = await res.json();
        if (res.ok) {
          alert("Password reset successful! Redirecting to AfyAccess...");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          alert(data.message || "Error resetting password");
        }
      } catch (err) {
        alert("Error resetting password");
      }
      setLoading(false);
    };

    return (
      <form className="reset-password-form" onSubmit={(e) => { e.preventDefault(); handleReset(); }}>
        <h2>Reset Your Password</h2>
        
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading} style={{ marginTop: "10px" }}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    );
  }

  // ================= HOME =================
  const renderHome = () => (
    <section className="hero">
      <h1>Your Health, Delivered Fast Across Kenya</h1>

      <p className="hero-tagline">
        Licensed Online Pharmacy • Genuine Medicines • PPB Approved
      </p>

      <p className="hero-description">
        Access genuine medicines from trusted suppliers.
      </p>

      <button
        className="start-btn"
        onClick={() => {
          setStartedShopping(true);
          setPage("shop");
        }}
      >
        Start Shopping
      </button>
    </section>
  );

  // ================= FILTER =================
  const filteredMedicines = medicines.filter((item) => {
    const q = search.toLowerCase();

    const matchesSearch =
      item.product.toLowerCase().includes(q) ||
      item.therapeutic.toLowerCase().includes(q) ||
      item.inn.toLowerCase().includes(q);

    const matchesClass =
      therapeuticFilter === "All" ||
      item.therapeutic === therapeuticFilter;

    return matchesSearch && matchesClass;
  });

  // ================= CART LOAD/SAVE =================
  useEffect(() => {
    if (!currentUser) return;

    const saved = localStorage.getItem(`afyCart_${currentUser.email}`);
    setCart(saved ? JSON.parse(saved) : []);
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    localStorage.setItem(
      `afyCart_${currentUser.email}`,
      JSON.stringify(cart)
    );
  }, [cart, currentUser]);

  // ================= ADD TO CART =================
  function addToCart(id) {
    const product = medicines.find((p) => p.id === id);
    if (!product) return;

    setCart((prev) => {
      const exists = prev.find((i) => i.id === id);

      if (exists) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    setNotificationText(`${product.product} added to cart`);
    setShowNotification(true);

    setTimeout(() => setShowNotification(false), 2000);
  }

  // ================= REMOVE CART =================
  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  // ================= CHANGE QTY =================
  function changeQty(id, amount) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ================= SHOP =================
  const renderShop = () => (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={therapeuticFilter}
          onChange={(e) => setTherapeuticFilter(e.target.value)}
        >
          {therapeuticClasses.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        {filteredMedicines.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );

  // ================= CART =================
  const renderCart = () => (
    <div className="cart-page">
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            removeFromCart={removeFromCart}
            changeQty={changeQty}
          />
        ))
      )}

      {cart.length > 0 && (
        <button onClick={() => setShowCheckout(true)}>
          Proceed to Checkout
        </button>
      )}
    </div>
  );

  // ================= RESET PAGE SWITCH =================
  if (page === "reset") {
    return <ResetPasswordView />;
  }

  // ================= MAIN RETURN =================
  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <h2>AfyAccess</h2>

        <div className="nav-buttons">
          <button onClick={() => {
            setStartedShopping(false);
            setPage("shop");
            setSearch("");
            setTherapeuticFilter("All");
          }}>Home</button>

          <button
            onClick={() => {
              setStartedShopping(true);
              setPage("shop");
            }}
          >
            Shop
          </button>

          <button onClick={() => setPage("cart")}>
            Cart ({cartCount})
          </button>

          <button onClick={() => {
            if (isAdminAuthenticated) {
              setPage("admin");
              setStartedShopping(true);
            } else {
              setShowAdminPrompt(true);
            }
          }}>
            Admin
          </button>

          <button
            onClick={() => {
              if (currentUser) {
                localStorage.removeItem("afyUser");
                setCurrentUser(null);
                setCart([]);
              } else {
                setShowAuth(true);
              }
            }}
          >
            {currentUser 
              ? `Logout (${currentUser.name ? currentUser.name.split(' ')[0] : currentUser.email.split('@')[0]})`
              : "Login"}
          </button>
        </div>
      </header>

      {/* PAGES */}
      {!startedShopping && renderHome()}
      {startedShopping && page === "shop" && renderShop()}
      {startedShopping && page === "cart" && renderCart()}
      {startedShopping && page === "admin" && <AdminOrders />}

      {/* MODALS */}
      {showAuth && (
        <AuthModal
          setCurrentUser={setCurrentUser}
          close={() => setShowAuth(false)}
        />
      )}

      {showCheckout && (
        <CheckoutModal
          cart={cart}
          setCart={setCart}
          currentUser={currentUser}
          close={() => setShowCheckout(false)}
        />
      )}

      {showForgot && (
        <div>
          <h3>Reset Password</h3>

          <input
            placeholder="Enter your email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />

          <button onClick={handleForgotPassword}>
            Send Reset Link
          </button>

          <button onClick={() => setShowForgot(false)}>
            Cancel
          </button>
        </div>
      )}

      {showAdminPrompt && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Admin Access</h2>
            <div className="password-field">
              <input
                type={showAdminPassword ? "text" : "password"}
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    if (adminPassword === "Admin@8113") {
                      setIsAdminAuthenticated(true);
                      setPage("admin");
                      setStartedShopping(true);
                      setShowAdminPrompt(false);
                      setAdminPassword("");
                    } else {
                      alert("Invalid password");
                      setAdminPassword("");
                    }
                  }
                }}
              />
              <span
                className="eye-icon"
                onClick={() => setShowAdminPassword(!showAdminPassword)}
              >
                {showAdminPassword ? "🙈" : "👁️"}
              </span>
            </div>
            
            <p
              style={{ color: "blue", cursor: "pointer", fontSize: "0.85rem" }}
              onClick={() => setShowAdminForgot(true)}
            >
              Forgot Admin Password?
            </p>

            {showAdminForgot && (
              <div style={{ marginTop: "15px", padding: "10px", background: "#f0f0f0", borderRadius: "5px" }}>
                <p>A reset link will be sent to: <strong>wangarimwenda0@gmail.com</strong></p>
                <button onClick={handleForgotAdminPassword} style={{ background: "#10b981", color: "white" }}>
                  Send Reset Link
                </button>
                <button onClick={() => setShowAdminForgot(false)} style={{ marginTop: "10px" }}>
                  Cancel
                </button>
              </div>
            )}

            <button onClick={() => {
              if (adminPassword === "Admin@8113") {
                setIsAdminAuthenticated(true);
                setPage("admin");
                setStartedShopping(true);
                setShowAdminPrompt(false);
                setAdminPassword("");
              } else {
                alert("Invalid password");
                setAdminPassword("");
              }
            }} style={{ marginTop: "10px" }}>
              Access Admin
            </button>
            <button onClick={() => {
              setShowAdminPrompt(false);
              setAdminPassword("");
              setShowAdminForgot(false);
            }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showNotification && (
        <div className="cart-notification">
          {notificationText}
        </div>
      )}

      {/* FOOTER - Only on home page */}
      {!startedShopping && (
        <footer className="footer">
          <h3>AfyAccess Pharmacy</h3>
          <p>© DrWangariMwenda</p>
          <p>📞 0790787574</p>
          <p>📍 Nanyuki, Kenya</p>
        </footer>
      )}

    </div>
  );
}