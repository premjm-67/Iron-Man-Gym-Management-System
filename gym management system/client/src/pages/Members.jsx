import "./members.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Members() {
  const { user } = useAuth();
  const [showCompare, setShowCompare] = useState(false);
  const [compareNotes, setCompareNotes] = useState([]);
  const navigate = useNavigate();

  // derive simple membership info if present
  const membership = user?.membership || user?.plan || null;
  const memberName = user?.firstName || user?.name || user?.fullName || "Member";
  const isActive = membership ? true : false;

  const plans = [
    {
      id: "3m",
      title: "Starter",
      price: "₹3,999",
      desc: "Perfect for getting started",
      features: ["✓ Gym Access", "✓ Basic Support", "✓ Member Community"],
      color: "#6366f1",
      lightColor: "#e0e7ff",
    },
    {
      id: "6m",
      title: "Pro",
      price: "₹6,999",
      desc: "Most popular choice",
      features: ["✓ Unlimited Access", "✓ Personal Trainer", "✓ Nutrition Plan", "✓ Progress Tracking"],
      popular: true,
      color: "#00d4ff",
      lightColor: "#cffafe",
    },
    {
      id: "9m",
      title: "Elite",
      price: "₹9,499",
      desc: "Advanced transformation",
      features: ["✓ VIP Access", "✓ Premium Trainer", "✓ Custom Nutrition", "✓ Weekly Coaching"],
      color: "#f59e0b",
      lightColor: "#fef3c7",
    },
    {
      id: "12m",
      title: "Ultimate",
      price: "₹11,999",
      desc: "Complete transformation",
      features: ["✓ 24/7 Access", "✓ Dedicated Coach", "✓ Full Nutrition Plan", "✓ Priority Support", "✓ Recovery Program"],
      color: "#8b5cf6",
      lightColor: "#ede9fe",
    },
  ];

  function handleCompare() {
    const notes = plans.map((p) => {
      const pros = p.features.join(", ");
      let note = `${p.title}: ${p.desc} — Includes: ${pros}.`;
      if (p.popular) note += " ⭐ Recommended for steady progress and best support.";
      if (p.title === "Starter") note += " Great for trying out the facility quickly.";
      if (p.title === "Ultimate") note += " Best value for long-term transformation.";
      return note;
    });

    setCompareNotes(notes);
    setShowCompare(true);
  }

  function handleJoin() {
    navigate("/payments");
  }

  function handleChoosePlan(plan) {
    navigate("/payments", { state: { plan } });
  }

  return (
    <div className="page-wrapper">
      <header className="site-header">
        <div className="brand">GymPro</div>
        <div className="nav">
          <button className="btn ghost" onClick={() => window.location.href='/dashboard'}>Dashboard</button>
          <button className="btn ghost" onClick={() => window.location.href='/profile'}>Profile</button>
        </div>
      </header>

      <main className="membership-page">
        {/* Hero Section */}
        <section style={{ paddingBottom: 40, borderBottom: "1px solid #e5e7eb" }}>
          <div className="membership-hero">
            <div className="hero-left">
              <h1 style={{ fontSize: "40px", lineHeight: "1.2", marginBottom: 12 }}>
                Flexible Membership Plans
              </h1>
              <p className="lead" style={{ fontSize: "18px", color: "rgba(17,24,39,0.7)", maxWidth: "500px" }}>
                Choose the perfect plan for your fitness journey. No long-term contracts, cancel anytime.
              </p>
            </div>

            <div className="hero-right">
              <div className="status-panel" style={{ background: "#f9fafb", padding: "16px 20px", borderRadius: "10px", border: "1px solid #e5e7eb" }}>
                <div className="avatar" style={{ width: 48, height: 48, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", color: "#fff", fontWeight: 700, fontSize: "16px" }}>
                  {memberName.split(" ").map(n => n[0]).slice(0, 2).join("")}
                </div>
                <div className="user-info">
                  <div className="name" style={{ fontWeight: 600, fontSize: "14px" }}>{memberName}</div>
                  <div className={`sub-status ${isActive ? 'active' : 'inactive'}`} style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: isActive ? "#059669" : "#dc2626",
                    marginTop: 2,
                  }}>
                    {isActive ? '✓ Active Member' : '○ No Subscription'}
                  </div>
                </div>
              </div>

              <div className="hero-cta" style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <button onClick={handleCompare} className="btn ghost" style={{ padding: "10px 16px", fontSize: "14px" }}>
                  Compare Plans
                </button>
                {!isActive && (
                  <button onClick={handleJoin} className="btn primary" style={{ padding: "10px 16px", fontSize: "14px" }}>
                    Get Started
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section style={{ padding: "40px 0" }}>
          <div className="plans-container" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            marginBottom: 40,
          }}>
            {plans.map((plan, i) => {
              const owned = membership && (membership.id === plan.id || membership.title === plan.title || membership.planId === plan.id || membership.name === plan.title);
              return (
                <article
                  key={plan.id}
                  className={`plan-card ${plan.popular ? "popular" : ""} ${owned ? 'owned' : ''}`}
                  style={{
                    background: "#fff",
                    border: plan.popular ? `2px solid ${plan.color}` : "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "28px",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    boxShadow: plan.popular ? `0 20px 40px ${plan.color}20` : "0 1px 3px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!plan.popular) e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.popular) e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Background Accent */}
                  {plan.popular && (
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: `linear-gradient(90deg, ${plan.color} 0%, transparent 100%)`,
                    }} />
                  )}

                  {plan.popular && (
                    <span style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      background: plan.color,
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}>
                      ⭐ Most Popular
                    </span>
                  )}
                  {owned && (
                    <span style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      background: "#10b981",
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}>
                      ✓ Your Plan
                    </span>
                  )}

                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: 8, color: plan.color }}>
                      {plan.title}
                    </h2>
                    <p style={{
                      fontSize: "13px",
                      color: "rgba(17,24,39,0.6)",
                      marginBottom: 20,
                      lineHeight: "1.5",
                    }}>
                      {plan.desc}
                    </p>

                    <div style={{ background: plan.lightColor, padding: "16px", borderRadius: "8px", marginBottom: 20 }}>
                      <div style={{ fontSize: "32px", fontWeight: 700, color: plan.color }}>
                        {plan.price}
                      </div>
                      {(() => {
                        const months = parseInt(plan.id.replace(/[^0-9]/g, '')) || 1;
                        const num = parseInt(plan.price.replace(/[^0-9]/g, '')) || 0;
                        const monthly = Math.round(num / months);
                        return (
                          <div style={{ fontSize: "13px", color: "rgba(17,24,39,0.6)", marginTop: 4 }}>
                            ₹{monthly.toLocaleString()} <span style={{ fontWeight: 500 }}>/ month</span>
                          </div>
                        );
                      })()}
                    </div>

                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                      {plan.features.map((f, idx) => (
                        <li key={idx} style={{
                          fontSize: "13px",
                          color: "rgba(17,24,39,0.8)",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}>
                          <span style={{ color: plan.color, fontWeight: 700 }}>✓</span>
                          {f.replace("✓ ", "")}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                    <button
                      onClick={() => handleChoosePlan(plan)}
                      style={{
                        flex: 1,
                        padding: "12px 16px",
                        background: plan.popular ? plan.color : "transparent",
                        color: plan.popular ? "#fff" : plan.color,
                        border: `2px solid ${plan.color}`,
                        borderRadius: "8px",
                        fontWeight: 600,
                        fontSize: "14px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = plan.color;
                        e.target.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = plan.popular ? plan.color : "transparent";
                        e.target.style.color = plan.popular ? "#fff" : plan.color;
                      }}
                    >
                      {owned ? "Current Plan" : "Choose Plan"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Compare Modal */}
        {showCompare && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 16,
          }} onClick={() => setShowCompare(false)}>
            <div style={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "80vh",
              overflow: "auto",
            }} onClick={(e) => e.stopPropagation()}>
              <div style={{ padding: "24px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>Plan Comparison</h3>
                <button onClick={() => setShowCompare(false)} style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "rgba(17,24,39,0.5)",
                }}>
                  ✕
                </button>
              </div>

              <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 12 }}>
                {compareNotes.map((n, idx) => (
                  <div key={idx} style={{
                    padding: "12px 16px",
                    background: "#f9fafb",
                    borderRadius: "8px",
                    fontSize: "13px",
                    lineHeight: "1.6",
                    color: "rgba(17,24,39,0.8)",
                    borderLeft: "3px solid #667eea",
                  }}>
                    {n}
                  </div>
                ))}
              </div>

              <div style={{ padding: "24px", borderTop: "1px solid #e5e7eb", display: "flex", gap: 12 }}>
                <button onClick={() => setShowCompare(false)} className="btn ghost" style={{ flex: 1, padding: "10px 16px" }}>
                  Close
                </button>
                <button onClick={handleJoin} className="btn primary" style={{ flex: 1, padding: "10px 16px" }}>
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="site-footer">
        <div>© GymPro 2026</div>
        <div>Transform your fitness journey with our premium membership plans</div>
      </footer>
    </div>
  );
}