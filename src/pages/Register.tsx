import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Swal from "sweetalert2";

function Register() {

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    role: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await api.post("/users/register", formData);

    setMessage(response.data.message);

    await Swal.fire({
      icon: "success",
      title: "Success",
      text: response.data.message,
      confirmButtonColor: "#3085d6",
    });

    navigate("/login");

  } catch (error: any) {

    if (error.response) {

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response.data.message,
        confirmButtonColor: "#d33",
      });

    } else {

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });

    }

  } finally {
    setLoading(false);
  }
};
  return (
    <> 
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>📝 Register to LibraryHub</h1>
        </div>
      </section>

      {/* Register Section */}
      <section className="login-section">
        <div className="login-container">

          <h2>Create Account</h2>

          <p>
            Register to access LibraryHub services.
          </p>

          <form onSubmit={handleSubmit}>

              <div className="input-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Mobile Number</label>

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    if (value.length <= 10) {
                      setFormData({
                        ...formData,
                        mobile: value,
                      });
                    }
                  }}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  required
                />
              </div>

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
                <label>Address</label>

                <textarea
                  name="address"
                  placeholder="Enter your address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Role</label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="STUDENT">Student</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div className="input-group">
                <label>Create Password</label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
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
                {loading ? "Registering..." : "Create Account"}
              </button>

          </form>

          <div className="extra-links">
            <span>Already have an account? </span>

            <Link to="/login">
              Login Here
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Register;