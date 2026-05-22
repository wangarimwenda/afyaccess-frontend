import React, { useState, useEffect } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState('home');
  const [showLogin, setShowLogin] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const medicines = [
    {id:1, product:"Albendazole Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"Antinematodal Anthelmintic Agents", inn:"Albendazole", price:280},
    {id:2, product:"Aspirin Tablets", form:"Tablet", route:"Oral", therapeutic:"Analgesics & Antipyretics", inn:"Acetylsalicylic Acid", price:120},
    {id:3, product:"Lonart Forte Tablet", form:"Tablet", route:"Oral", therapeutic:"Antimalarial Antiprotozoals", inn:"Artemether + Lumefantrine", price:450},
    {id:647, product:"Mamalait Granules 250g", form:"Granules", route:"Oral", therapeutic:"Supplement", inn:"", price:2200}
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('afyUser');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
    alert(`✅ ${product.product} added to cart!`);
  };

  const login = (email) => {
    const user = { email };
    setCurrentUser(user);
    localStorage.setItem('afyUser', JSON.stringify(user));
    setShowLogin(false);
    alert("✅ Login Successful!");
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('afyUser');
    alert("Signed out");
  };

  const filteredProducts = medicines.filter(p => 
    p.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">💊</span>
            <h1 className="text-3xl font-bold text-blue-700">AfyAccess</h1>
          </div>

          <nav className="flex gap-10 text-lg font-medium">
            <button onClick={() => setPage('home')} className="hover:text-blue-600">Home</button>
            <button onClick={() => setPage('shop')} className="hover:text-blue-600">Shop</button>
            <button onClick={() => setPage('cart')} className="hover:text-blue-600 flex items-center gap-2">
              Cart <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{cart.length}</span>
            </button>
          </nav>

          <div>
            {currentUser ? (
              <button onClick={logout} className="text-red-600 font-medium">Logout</button>
            ) : (
              <button onClick={() => setShowLogin(true)} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700">Login</button>
            )}
          </div>
        </div>
      </header>

      {/* HOME */}
      {page === 'home' && (
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-32 text-center">
          <h1 className="text-6xl font-bold mb-6">Your Health, Delivered Fast Across Kenya</h1>
          <p className="text-2xl mb-12">Licensed Online Pharmacy • Genuine Medicines • PPB Approved</p>
          <button onClick={() => setPage('shop')} className="bg-white text-blue-700 text-2xl px-14 py-6 rounded-2xl font-semibold hover:bg-green-50">
            Start Shopping →
          </button>
        </div>
      )}

      {/* SHOP */}
      {page === 'shop' && (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-bold">Our Medicines</h2>
            <input 
              type="text" 
              placeholder="Search medicines..." 
              className="border px-6 py-4 rounded-2xl w-96 focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-3xl shadow p-8 hover:shadow-2xl transition">
                <h3 className="font-semibold text-xl mb-3">{product.product}</h3>
                <p className="text-gray-600 mb-6">{product.therapeutic}</p>
                <p className="text-3xl font-bold text-green-600 mb-8">KSh {product.price.toLocaleString()}</p>
                <button onClick={() => addToCart(product)} className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-medium">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CART */}
      {page === 'cart' && (
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-4xl font-bold mb-10">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-center text-2xl py-32 text-gray-500">Your cart is empty</p>
          ) : (
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl shadow flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{item.product}</h4>
                    <p className="text-gray-600">KSh {item.price}</p>
                  </div>
                  <button onClick={() => setCart(cart.filter((_, i) => i !== index))} className="text-red-600">Remove</button>
                </div>
              ))}
              <button className="w-full bg-blue-700 text-white py-6 text-xl rounded-3xl mt-10 hover:bg-blue-800">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-10 w-full max-w-md">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {isLoginMode ? "Login to AfyAccess" : "Create Account"}
            </h2>
            
            <input type="email" id="email" placeholder="Email address" className="w-full p-4 border rounded-2xl mb-4" />
            <input type="password" id="password" placeholder="Password" className="w-full p-4 border rounded-2xl mb-8" />

            <button 
              onClick={() => {
                const email = document.getElementById('email').value;
                if (email) login(email);
              }}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-blue-700"
            >
              {isLoginMode ? "Login" : "Sign Up"}
            </button>

            <p className="text-center mt-6">
              <span onClick={() => setIsLoginMode(!isLoginMode)} className="text-blue-600 cursor-pointer hover:underline">
                {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </span>
            </p>

            <button onClick={() => setShowLogin(false)} className="mt-6 text-red-600 w-full">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;