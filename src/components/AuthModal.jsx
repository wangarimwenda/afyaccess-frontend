import { useState } from "react";

export default function AuthModal({ setCurrentUser, close }) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleForgotPassword() {
    if (!forgotEmail) {
      alert("Enter your email");
      return;
    }

    setForgotLoading(true);

    try {
      await fetch(
        "https://afyaccess-backend.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: forgotEmail }),
        }
      );

      alert("Reset link sent to your email");
      setShowForgot(false);
      setForgotEmail("");
    } catch (err) {
      alert("Error sending reset link");
    }

    setForgotLoading(false);
  }

  async function handleAuth() {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (!isLogin && !name) {
      setError("Name is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const endpoint = isLogin ? "login" : "register";

      const res = await fetch(
        `https://afyaccess-backend.onrender.com/api/auth/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Authentication failed");
        setLoading(false);
        return;
      }

      const user = {
        name: data.name || name,
        email: data.email || email,
      };

      setCurrentUser(user);
      localStorage.setItem("afyUser", JSON.stringify(user));

      close();
    } catch (err) {
      setError("Network error. Try again.");
    }

    setLoading(false);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!isLogin && (
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <p
          style={{ color: "blue", cursor: "pointer", fontSize: "0.85rem" }}
          onClick={() => setShowForgot(true)}
        >
          Forgot Password?
        </p>

        <button onClick={handleAuth} disabled={loading}>
          {loading
            ? "Please wait..."
            : isLogin
            ? "Login"
            : "Sign Up"}
        </button>

        <p
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </p>

        <button onClick={close}>Close</button>

        {/* ✅ FORGOT PASSWORD SECTION (INSIDE RETURN) */}
        {showForgot && (
          <div style={{ marginTop: "15px" }}>
            <h3>Reset Password</h3>

            <input
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />

            <button
              onClick={handleForgotPassword}
              disabled={forgotLoading}
                style={{
    backgroundColor: forgotLoading ? "#a5a5a5" : "#9073fa",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: forgotLoading ? "not-allowed" : "pointer"
  }}
            >
              {forgotLoading ? "Sending..." : "Send Reset Link"}
            </button>

            <p
              style={{
                    backgroundColor: forgotLoading ? "#a5a5a5" : "#28a745",

                cursor: "pointer",
                color: "white",
                marginTop: "10px",
                  padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
                    cursor: forgotLoading ? "not-allowed" : "pointer"

              }}
              onClick={() => setShowForgot(false)}
            >
              Back to login
            </p>
          </div>
        )}

      </div>
    </div>
  );
}