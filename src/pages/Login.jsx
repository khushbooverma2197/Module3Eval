import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "admin1234") {
      login("admin");
      alert("Login Successful");
      navigate("/admin/dashboard");
    } else if (email === "customer@gmail.com" && password === "customer1234") {
      login("customer");
      alert("Login Successful");
      navigate("/customers/dashboard");
    } else {
      alert("Wrong Credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
              <path d="M7 2v20"></path>
              <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
            </svg>
          </div>
          <h2>Restaurant Manager</h2>
          <p>Sign in to your account</p>
        </div>

        <div className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn-login" onClick={handleLogin}>
            Sign In
          </button>
        </div>

        <div className="demo-credentials">
          <p className="demo-title">Demo Credentials:</p>
          <div className="credentials-grid">
            <div className="credential-card">
              <div className="credential-type">Admin</div>
              <div className="credential-info">admin@gmail.com</div>
              <div className="credential-info">admin1234</div>
            </div>
            <div className="credential-card">
              <div className="credential-type">Customer</div>
              <div className="credential-info">customer@gmail.com</div>
              <div className="credential-info">customer1234</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
