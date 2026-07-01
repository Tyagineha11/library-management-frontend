import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
  email: "",
  password: "",
});

const [loading, setLoading] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await api.post("/users/login", formData);

    const user = response.data.data;

    localStorage.setItem("accessToken", user.accessToken);
    localStorage.setItem("refreshToken", user.refreshToken);
    localStorage.setItem("role", user.role);
    localStorage.setItem("user", JSON.stringify(user));

    await Swal.fire({
      icon: "success",
      title: "Success",
      text: response.data.message,
      confirmButtonColor: "#3085d6",
    });

    if (user.role === "ADMIN") {
      navigate("/admin-dashboard");
    } else {
      navigate("/student-dashboard");
    }

  } catch (error: any) {

    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: error.response?.data?.message || "Server Error",
      confirmButtonColor: "#d33",
    });

  } finally {
    setLoading(false);
  }
};
  return (
    <>
      <Header />

      {/* HERO SECTION */}

      <section className="hero">

        <div className="hero-content">

          <h1>
            🔐 Login to LibraryHub
          </h1>

        </div>

      </section>

      {/* LOGIN SECTION */}

      <section className="login-section">

        <div className="login-container">

          <h2>Login to LibraryHub</h2>

          <p>
            Access your account and manage your library activities.
          </p>

          

            <form onSubmit={handleSubmit}>
              <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          <div className="extra-links">

            <Link to="/forgot-password">
              Forgot Password?
            </Link>

            <span>|</span>

            <Link to="/register">
              Create Account
            </Link>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Login;