import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import api from "../services/api";

function AddCategory() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");

      await api.post(
        "/category/add",
        {
          categoryName: categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Category Added Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/categories");
    } catch (error: any) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Unable to add category.",
      });
    }
  };

  return (
  <div className="dashboard-layout">

    <div
      className="admin-menu-toggle"
      onClick={() =>
        setSidebarOpen(!sidebarOpen)
      }
    >
      ☰
    </div>

    <AdminSidebar sidebarOpen={sidebarOpen} />

    <main className="dashboard-content">

      <AdminHeader />

      <div className="add-book-card">

        <h1>Add Category</h1>

        <form
          className="add-book-form1"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>Category Name</label>

            <input
              type="text"
              value={categoryName}
              onChange={(e) =>
                setCategoryName(e.target.value)
              }
              placeholder="Enter Category Name"
              required
            />

          </div>

          <button
            className="save-book-btn"
            type="submit"
          >
            Save Category
          </button>

        </form>

      </div>

    </main>

  </div>
);
}

export default AddCategory;