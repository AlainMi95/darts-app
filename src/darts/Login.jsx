import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useAuthState(auth);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || "/darts";
      navigate(from, { replace: true });
    } else {
      setInitializing(false);
    }
  }, [user, navigate, location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const from = location.state?.from?.pathname || "/darts";
      navigate(from, { replace: true });
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  if (initializing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login to Access Darts</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
