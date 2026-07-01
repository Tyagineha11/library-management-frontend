import { NavLink, useNavigate } from "react-router-dom";
import "../assets/styles/admin-common.css";

type Props = {
  sidebarOpen: boolean;
};

function AdminSidebar({ sidebarOpen }: Props) {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token
    localStorage.removeItem("accessToken");

    // Agar refresh token bhi hai to usko bhi remove karo
    localStorage.removeItem("refreshToken");

    // Redirect to login
    navigate("/login");
  };

  return (
    <aside
      className={`admin-sidebar ${
        sidebarOpen ? "active" : ""
      }`}
    >
      <div className="sidebar-logo">
        📚 LibraryHub
      </div>

      <ul className="admin-menu">

        <li>
          <NavLink to="/admin-dashboard">
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/manage-books">
            Manage Books
          </NavLink>
        </li>

        <li>
          <NavLink to="/categories">
            Categories
          </NavLink>
        </li>

        <li>
          <NavLink to="/students">
            Students
          </NavLink>
        </li>

        <li>
          <NavLink to="/issued">
            Issued Books
          </NavLink>
        </li>

        <li>
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>

      </ul>
    </aside>
  );
}

export default AdminSidebar;