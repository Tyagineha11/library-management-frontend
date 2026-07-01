import { NavLink, useNavigate } from "react-router-dom";
import "../assets/styles/student-common.css";

type SidebarProps = {
  sidebarOpen: boolean;
};

function Sidebar({ sidebarOpen }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔥 clear all auth data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("studentId");
    localStorage.removeItem("role");

    // optional: clear everything
    // localStorage.clear();

    // redirect to login
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
      <br /><br /><br />

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/student-dashboard">Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/profile">My Profile</NavLink>
        </li>

        <li>
          <NavLink to="/issued-books">Issued Books</NavLink>
        </li>

        <li>
          <NavLink to="/fines">Fines</NavLink>
        </li>

        {/* 🔥 FIXED LOGOUT */}
        <li>
          <button
            onClick={handleLogout}
            className="logout-btn"
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;