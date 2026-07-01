import "../assets/styles/admin-common.css";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="logo">
          📚 LibraryHub
        </div>

        <h2>Admin Login</h2>

        <p>
          Access Library Management Dashboard
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/admin-dashboard");
          }}
        >

          <div className="input-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter username"
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="admin-login-btn"
          >
            Login
          </button>

        </form>

        <div className="back-home">
          <Link to="/">
            ← Back to Home
          </Link>
        </div>

      </div>

    </div>
  );
}

export default AdminLogin;