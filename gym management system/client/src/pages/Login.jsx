import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./auth.css";

export default function Login() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  function submit(e) {
    e.preventDefault();

    if (!phoneNumber || !password) {
      alert("Please enter Mobile Number and Password!");
      return;
    }

    // Send phone and password to AuthContext
    login(phoneNumber, password);
  }

  return (
    <div className="auth-page">
      <div className="auth-bg" aria-hidden>
        <div className="bg bg1"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
        <div className="bg-overlay"></div>
      </div>

      <div className="auth-inner">
        <div className="auth-hero">
          <div className="brand-mark">IM</div>
          <h1>Iron Man Gym</h1>
          <p className="subtitle">Strength · Discipline · Results</p>
          <p className="lead muted">Premium training, tailored plans, and expert coaching to build a stronger you.</p>
        </div>

        <div className="auth-container">
          <h2>Sign in to your account</h2>

          <form className="auth-form" onSubmit={submit}>
            <input
              type="text"
              placeholder="Member Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Mobile Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="primary">Login</button>
          </form>

          <p className="muted">New Member? <Link to="/register">Create an account</Link></p>
        </div>
      </div>

    </div>
  );
}
