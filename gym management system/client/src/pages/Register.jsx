import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./auth.css";

export default function Register() {
  const { registerUser } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    dob: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  function submit(e) {
    e.preventDefault();
    if (!form.password || form.password !== form.confirmPassword) {
      alert('Passwords must match and cannot be empty');
      return;
    }
    registerUser(form);
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
          <h2>Create your account</h2>

          <form className="auth-form" onSubmit={submit}>
            <input
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              required
            />

            <input
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              required
            />

            <input
              placeholder="Age"
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              required
            />

            <input
              placeholder="Date of Birth"
              type="date"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
              required
            />

            <input
              placeholder="Mobile Number"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />

            <input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <input
              placeholder="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
            />

            <button type="submit" className="primary">Register</button>
          </form>

          <p className="muted">Already a Member? <Link to="/">Login</Link></p>
        </div>
      </div>

    </div>
  );
}
