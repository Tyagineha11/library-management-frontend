import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import api from "../services/api";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await api.get(`/category/get/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCategoryName(response.data.data.categoryName);
  } catch (error) {
    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Unable to load category.",
    });
  }
};

const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("accessToken");

    await api.put(
      `/category/update/${id}`,
      {
        categoryName,
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
      text: "Category Updated Successfully",
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
        "Unable to update category.",
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

        <h1>Edit Category</h1>

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
            Update Category
          </button>

        </form>

      </div>

    </main>

  </div>
);
}

export default EditCategory;