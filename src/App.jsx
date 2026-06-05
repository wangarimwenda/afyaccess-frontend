import { useState, useEffect } from "react";
import { medicines } from "./data/medicines";

import ProductCard from "./components/ProductCard";
import CartItem from "./components/CartItem";
import AuthModal from "./components/AuthModal";
import CheckoutModal from "./components/CheckoutModal";
import AdminOrders from "./pages/AdminOrders";

import "./App.css";

export default function App() {
  // STATE
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("shop"); // ✅ ONLY ONCE
  const [showAuth, setShowAuth] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // LOAD DATA
  useEffect(() => {
    const savedUser = localStorage.getItem("afyUser");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    const savedCart = localStorage.getItem("afyCart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // SAVE CART
  useEffect(() => {
    localStorage.setItem("afyCart", JSON.stringify(cart));
  }, [cart]);

  // ADD TO CART
  function addToCart(id) {
    const product = medicines.find(p => p.id === id);
    if (!product) return;

    setCart(prev => {
      const existing = prev.find(item => item.id === id);

      if (existing) {
        return prev.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  }

  // REMOVE ITEM
  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  // CHANGE QTY
  function changeQty(id, amount) {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // SHOP
  const renderShop = () => (
    <div className="grid">
      {medicines.map(item => (
        <ProductCard
          key={item.id}
          item={item}
          addToCart={addToCart}
        />
      ))}
    </div>
  );

  // CART
  const renderCart = () => (
    <div className="cart-page">
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map(item => (
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

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <h2>AfyAccess</h2>

        <div>
          <button onClick={() => setPage("shop")}>Shop</button>
          <button onClick={() => setPage("cart")}>
            Cart ({cartCount})
          </button>

          {/* ✅ ADMIN BUTTON */}
          <button onClick={() => setPage("admin")}>
            Admin
          </button>

          <button onClick={() => setShowAuth(true)}>
            {currentUser ? "Logout" : "Login"}
          </button>
        </div>
      </header>

      {/* PAGES */}
      {page === "shop" && renderShop()}
      {page === "cart" && renderCart()}
      {page === "admin" && <AdminOrders />}

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

    </div>
  );
}