import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/members">Members</Link>
      <Link to="/add-member">Add Member</Link>
      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
}

const styles = {
  nav: { display: "flex", gap: "20px", padding: "10px", background: "#eee" }
};
