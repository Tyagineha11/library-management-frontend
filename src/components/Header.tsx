import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../assets/styles/student-common.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="navbar">

      <div className="logo">
        📚 LibraryHub
      </div>

      <div
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <nav className={menuOpen ? "active" : ""}>

        <ul>

          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/books">
              Books
            </NavLink>
          </li>

          {!user ? (
            <>
              <li>
                <NavLink to="/login">
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink to="/register">
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li className="user-menu">

              <div
                className="user-name"
                onClick={() => {
                  console.log("Clicked");
                  setDropdownOpen(!dropdownOpen);
                }}
              >
                Welcome, {user.name} ▼
              </div>

              {dropdownOpen && (
                
                <div className="dropdown-menu1">

                  <button
                    onClick={() => {
                      if (user.role === "ADMIN") {
                        navigate("/admin-dashboard");
                      } else {
                        navigate("/student-dashboard");
                      }
                    }}
                  >
                    Dashboard
                  </button>

                  <button onClick={handleLogout}>
                    Logout
                  </button>

                </div>
              )}

            </li>
          )}

        </ul>

      </nav>

    </header>
  );
}

export default Header;