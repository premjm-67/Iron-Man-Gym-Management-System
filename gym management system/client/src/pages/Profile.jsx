import { useState } from "react";
import "./members.css";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const membership = user?.membership || user?.plan || null;
  const createdAt = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—";
  const lastLogin = user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : "—";
  const initials = (user?.firstName || user?.name || "Member")[0]?.toUpperCase() || "M";
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || user?.name || "Member";

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const form = e.target.closest("form");
    const firstName = form.querySelector("#firstName").value.trim();
    const lastName = form.querySelector("#lastName").value.trim();
    const phone = form.querySelector("#phone").value.trim();

    if (!firstName) {
      setErrorMessage("First name is required");
      return;
    }

    setIsSaving(true);
    try {
      const ok = await updateProfile({ firstName, lastName, phone });
      if (ok) {
        setSuccessMessage("Profile updated successfully!");
        setIsEditing(false);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage("Failed to update profile. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="page-wrapper">
      <header className="site-header">
        <div className="brand">GymPro</div>
        <div className="nav">
          <button className="btn ghost" onClick={() => window.location.href="/dashboard"}>
            Dashboard
          </button>
          <button className="btn ghost" onClick={() => window.location.href="/members"}>
            Membership
          </button>
        </div>
      </header>

      <main className="payments-page" style={{ paddingTop: 32, paddingBottom: 40 }}>
        {/* Header Section */}
        <header className="membership-hero" style={{ marginBottom: 32 }}>
          <div className="hero-left">
            <h1 style={{ fontSize: "32px", marginBottom: 8 }}>My Profile</h1>
            <p className="lead">View and manage your personal information and subscription</p>
          </div>
          <div className="hero-right">
            <div className="status-panel" aria-hidden>
              <div
                className="avatar"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {initials}
              </div>
              <div className="name" style={{ fontSize: "20px", fontWeight: 600, marginTop: 12 }}>
                {fullName}
              </div>
            </div>
          </div>
        </header>

        {/* Alert Messages */}
        {successMessage && (
          <div
            style={{
              padding: "12px 16px",
              background: "#ecfdf5",
              border: "1px solid #86efac",
              borderRadius: "8px",
              color: "#166534",
              marginBottom: 20,
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            ✓ {successMessage}
          </div>
        )}
        {errorMessage && (
          <div
            style={{
              padding: "12px 16px",
              background: "#fef2f2",
              border: "1px solid #fca5a5",
              borderRadius: "8px",
              color: "#991b1b",
              marginBottom: 20,
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            ✕ {errorMessage}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Personal Information Card */}
          <div
            className="pay-card profile-card"
            style={{
              background: "#fff",
              border: "1px solid var(--card-border)",
              color: "var(--text-dark)",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              gridColumn: "1 / -1",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>Personal Information</h2>
              {!isEditing && (
                <button
                  className="btn ghost"
                  onClick={() => setIsEditing(true)}
                  style={{ padding: "8px 16px", fontSize: "14px" }}
                >
                  Edit Profile
                </button>
              )}
            </div>

            <form className="profile-form" onSubmit={handleSaveProfile}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    htmlFor="firstName"
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      marginBottom: 8,
                      color: "var(--text-dark)",
                    }}
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    defaultValue={user?.firstName || ""}
                    disabled={!isEditing}
                    style={{
                      padding: "10px 12px",
                      border: "1px solid var(--card-border)",
                      borderRadius: "6px",
                      fontSize: "14px",
                      background: isEditing ? "#fff" : "#f5f5f5",
                      cursor: isEditing ? "text" : "default",
                      transition: "all 0.2s ease",
                    }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    htmlFor="lastName"
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      marginBottom: 8,
                      color: "var(--text-dark)",
                    }}
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    defaultValue={user?.lastName || ""}
                    disabled={!isEditing}
                    style={{
                      padding: "10px 12px",
                      border: "1px solid var(--card-border)",
                      borderRadius: "6px",
                      fontSize: "14px",
                      background: isEditing ? "#fff" : "#f5f5f5",
                      cursor: isEditing ? "text" : "default",
                      transition: "all 0.2s ease",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", marginBottom: 16 }}>
                <label
                  htmlFor="email"
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: 8,
                    color: "var(--text-dark)",
                  }}
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={user?.email || ""}
                  disabled
                  style={{
                    padding: "10px 12px",
                    border: "1px solid var(--card-border)",
                    borderRadius: "6px",
                    fontSize: "14px",
                    background: "#f5f5f5",
                    color: "rgba(17,24,39,0.6)",
                    cursor: "not-allowed",
                  }}
                />
                <small style={{ color: "rgba(17,24,39,0.6)", marginTop: 6, fontSize: "12px" }}>
                  Email cannot be changed
                </small>
              </div>

              <div style={{ display: "flex", flexDirection: "column", marginBottom: 24 }}>
                <label
                  htmlFor="phone"
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: 8,
                    color: "var(--text-dark)",
                  }}
                >
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={user?.phone || ""}
                  disabled={!isEditing}
                  style={{
                    padding: "10px 12px",
                    border: "1px solid var(--card-border)",
                    borderRadius: "6px",
                    fontSize: "14px",
                    background: isEditing ? "#fff" : "#f5f5f5",
                    cursor: isEditing ? "text" : "default",
                    transition: "all 0.2s ease",
                  }}
                  placeholder="Enter phone number"
                />
              </div>

              {isEditing && (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => {
                      setIsEditing(false);
                      setErrorMessage("");
                    }}
                    style={{ flex: 1, padding: "10px 16px" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn primary"
                    disabled={isSaving}
                    style={{
                      flex: 1,
                      padding: "10px 16px",
                      opacity: isSaving ? 0.6 : 1,
                      cursor: isSaving ? "not-allowed" : "pointer",
                    }}
                  >
                    {isSaving ? "Saving..." : "Save changes"}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Subscription Card */}
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--card-border)",
              color: "var(--text-dark)",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              gridColumn: "1 / 2",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: 16, margin: 0 }}>
              Current Subscription
            </h3>
            {membership ? (
              <div>
                <div
                  style={{
                    background: "linear-gradient(135deg, #00d4ff 0%, #0099ff 50%, #6633ff 100%)",
                    color: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    marginBottom: 16,
                    boxShadow: "0 8px 32px rgba(0, 153, 255, 0.3)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: 6 }}>
                    {membership.title || membership.name || membership.plan || "Active Plan"}
                  </div>
                  {membership.desc && (
                    <div style={{ fontSize: "13px", opacity: 0.95, lineHeight: "1.4" }}>
                      {membership.desc}
                    </div>
                  )}
                  <div style={{ marginTop: 12, fontSize: "12px", opacity: 0.85, fontWeight: 500 }}>
                    ✓ Subscription Active
                  </div>
                </div>
                <button
                  className="btn ghost"
                  onClick={() => window.location.href="/members"}
                  style={{ width: "100%", padding: "10px", fontSize: "14px" }}
                >
                  View Other Plans
                </button>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    background: "linear-gradient(135deg, #ffa500 0%, #ff6b6b 100%)",
                    border: "1px solid rgba(255, 165, 0, 0.3)",
                    color: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    marginBottom: 16,
                    fontSize: "14px",
                    lineHeight: "1.5",
                    boxShadow: "0 8px 32px rgba(255, 107, 107, 0.2)",
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>No Active Subscription</div>
                  <div style={{ opacity: 0.95 }}>Choose a plan to unlock premium features and benefits.</div>
                </div>
                <button
                  className="btn primary"
                  onClick={() => window.location.href="/members"}
                  style={{ width: "100%", padding: "10px", fontSize: "14px" }}
                >
                  Browse Plans
                </button>
              </div>
            )}
          </div>

          {/* Account Information Card */}
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--card-border)",
              color: "var(--text-dark)",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              gridColumn: "2 / 3",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: 16, margin: 0 }}>
              Account Information
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <div style={{ fontSize: "12px", color: "rgba(17,24,39,0.6)", fontWeight: 500, marginBottom: 4 }}>
                  Member Since
                </div>
                <div style={{ fontSize: "14px", fontWeight: 500 }}>{createdAt}</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "rgba(17,24,39,0.6)", fontWeight: 500, marginBottom: 4 }}>
                  Last Login
                </div>
                <div style={{ fontSize: "14px", fontWeight: 500 }}>{lastLogin}</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "rgba(17,24,39,0.6)", fontWeight: 500, marginBottom: 4 }}>
                  Account Status
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#059669",
                    background: "#ecfdf5",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    display: "inline-block",
                  }}
                >
                  ✓ Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div>© GymPro 2026</div>
        <div>Your fitness journey, managed professionally</div>
      </footer>
    </div>
  );
}
