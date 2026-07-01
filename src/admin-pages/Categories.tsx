import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import api from "../services/api";

type Category = {
  id: number;
  categoryName: string;
};

function Categories() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await api.get("/category/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCategories(response.data.data);
  } catch (error) {
    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Unable to load categories.",
    });
  }
};

const handleDelete = async (id: number) => {
  Swal.fire({
    title: "Delete Category?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    confirmButtonText: "Delete",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("accessToken");

        await api.delete(`/category/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Category deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        fetchCategories();
      } catch (error: any) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message ||
            "Unable to delete category.",
        });
      }
    }
  });
};
return (
  <div className="dashboard-layout">
    {/* Mobile Toggle */}
    <div
      className="admin-menu-toggle"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      ☰
    </div>

    <AdminSidebar sidebarOpen={sidebarOpen} />

    <main className="dashboard-content">
      <AdminHeader />

      <div className="page-header">
        <h1>Categories</h1>

        <button
          className="add-book-btn"
          onClick={() => navigate("/add-category")}
        >
          + Add Category
        </button>
      </div>

      <div className="books-table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>

                  <td>{category.categoryName}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/edit-category/${category.id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(category.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  No Categories Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  </div>
);
}

export default Categories;