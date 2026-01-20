import { useNavigate } from "react-router-dom";
import "./members.css";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Payments() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching payment history
    setTimeout(() => {
      const mockPayments = [
        {
          id: "PAY-001",
          date: "2025-12-15",
          plan: "6 Months",
          amount: "₹6,999",
          status: "Completed",
          method: "Credit Card",
        },
        {
          id: "PAY-002",
          date: "2025-11-10",
          plan: "3 Months",
          amount: "₹3,999",
          status: "Completed",
          method: "UPI",
        },
      ];
      
      // For demo: only show if user has a subscription
      if (user?.membership || user?.plan) {
        setPayments(mockPayments);
      }
      setLoading(false);
    }, 500);
  }, [user]);

  return (
    <div className="page-wrapper">
      <header className="site-header">
        <div className="brand">GymPro</div>
        <div className="nav">
          <button className="btn ghost" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
          <button className="btn ghost" onClick={() => navigate("/profile")}>
            Profile
          </button>
        </div>
      </header>

      <main className="payments-page">
        {/* Header */}
        <section style={{ paddingBottom: 32, borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "1200px" }}>
            <h1 style={{ fontSize: "36px", fontWeight: 700, margin: 0 }}>
              Payment History
            </h1>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: "40px 0", minHeight: "60vh" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: "16px", color: "rgba(17,24,39,0.6)" }}>
                Loading payment history...
              </div>
            </div>
          ) : payments.length > 0 ? (
            <div style={{ maxWidth: "1000px" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14px",
                }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #e5e7eb", background: "#f9fafb" }}>
                      <th style={{ padding: "16px", textAlign: "left", fontWeight: 600, color: "rgba(17,24,39,0.8)" }}>
                        Transaction ID
                      </th>
                      <th style={{ padding: "16px", textAlign: "left", fontWeight: 600, color: "rgba(17,24,39,0.8)" }}>
                        Date
                      </th>
                      <th style={{ padding: "16px", textAlign: "left", fontWeight: 600, color: "rgba(17,24,39,0.8)" }}>
                        Plan
                      </th>
                      <th style={{ padding: "16px", textAlign: "left", fontWeight: 600, color: "rgba(17,24,39,0.8)" }}>
                        Amount
                      </th>
                      <th style={{ padding: "16px", textAlign: "left", fontWeight: 600, color: "rgba(17,24,39,0.8)" }}>
                        Method
                      </th>
                      <th style={{ padding: "16px", textAlign: "left", fontWeight: 600, color: "rgba(17,24,39,0.8)" }}>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} style={{ borderBottom: "1px solid #e5e7eb", transition: "background 0.2s ease" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "16px", color: "var(--text-dark)", fontWeight: 500 }}>
                          {payment.id}
                        </td>
                        <td style={{ padding: "16px", color: "rgba(17,24,39,0.7)" }}>
                          {new Date(payment.date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td style={{ padding: "16px", color: "rgba(17,24,39,0.7)" }}>
                          {payment.plan}
                        </td>
                        <td style={{ padding: "16px", fontWeight: 600, color: "#059669" }}>
                          {payment.amount}
                        </td>
                        <td style={{ padding: "16px", color: "rgba(17,24,39,0.7)" }}>
                          {payment.method}
                        </td>
                        <td style={{ padding: "16px" }}>
                          <span style={{
                            background: "#ecfdf5",
                            color: "#059669",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                            display: "inline-block",
                          }}>
                            ✓ {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            // Empty State
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "50vh",
            }}>
              <div style={{
                textAlign: "center",
                maxWidth: "400px",
              }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  background: "linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  fontSize: "36px",
                }}>
                  💳
                </div>

                <h2 style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "var(--text-dark)",
                  marginBottom: 8,
                  margin: 0,
                }}>
                  No Payment History Yet
                </h2>

                <p style={{
                  fontSize: "14px",
                  color: "rgba(17,24,39,0.6)",
                  marginBottom: 24,
                  lineHeight: "1.6",
                  margin: "0 0 24px 0",
                }}>
                  You haven't made any payments yet. Start your fitness journey by choosing a membership plan that fits your goals.
                </p>

                <button
                  onClick={() => navigate("/members")}
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#fff",
                    border: "none",
                    padding: "12px 28px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
                  }}
                >
                  View Membership Plans
                </button>

                <p style={{
                  fontSize: "12px",
                  color: "rgba(17,24,39,0.5)",
                  marginTop: 16,
                }}>
                  ✨ Flexible plans • No long-term contracts • Cancel anytime
                </p>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <div>© GymPro 2026</div>
        <div>Secure payment history and transaction management</div>
      </footer>
    </div>
  );
}
