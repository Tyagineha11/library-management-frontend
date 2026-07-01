import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <h2>📚 LibraryHub</h2>

        <p>
          Smart Library Management System for managing books,
          students, categories and library operations efficiently.
        </p>

        <div className="footer-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>

          <Link to="/admin">
            Admin
          </Link>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 LibraryHub. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;