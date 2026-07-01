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

function AddBook() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [bookImage, setBookImage] = useState<File | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState({
    bookName: "",
    author: "",
    description: "",
    categoryId: "",
    totalPages: "",
    quantity: "",
  });

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

      console.log(response.data);

      setCategories(response.data.data || []);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to load categories.",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("accessToken");

    const formDataToSend = new FormData();

    formDataToSend.append("bookName", formData.bookName);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("categoryId", formData.categoryId);
    formDataToSend.append("totalPages", formData.totalPages);
    formDataToSend.append("quantity", formData.quantity);

    if (bookImage) {
      formDataToSend.append("image", bookImage);
    }

    // Check FormData
    for (const pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }

    const response = await api.post(
      "/books/add",
      formDataToSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Book Added Successfully",
    });

    navigate("/manage-books");
  } catch (error: any) {
    console.log(error);
    console.log(error.response);
    console.log(error.response?.data);

    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        error.response?.data?.message ||
        "Unable to add book.",
    });
  }
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

        <div className="add-book-card">

          <h1>Add New Book</h1>

          <form
            className="add-book-form"
            onSubmit={handleSubmit}
          >

            {/* Book Name */}

            <div className="form-group">

              <label>Book Name</label>

              <input
                type="text"
                name="bookName"
                value={formData.bookName}
                onChange={handleChange}
                placeholder="Enter book name"
                required
              />

            </div>

            {/* Author */}

            <div className="form-group">

              <label>Author</label>

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
              />

            </div>

            {/* Book Image */}

            <div className="form-group">

              <label>Book Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setBookImage(
                    e.target.files?.[0] || null
                  )
                }
                required
              />

            </div>

            {/* Description */}

            <div className="form-group">

              <label>Description</label>

              <textarea
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                required
              />

            </div>

            {/* Category */}

            <div className="form-group">

              <label>Category</label>

              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.categoryName}
                  </option>
                ))}
              </select>

            </div>

            {/* Pages */}

            <div className="form-group">

              <label>Total Pages</label>

              <input
                type="number"
                name="totalPages"
                value={formData.totalPages}
                onChange={handleChange}
                placeholder="Enter total pages"
                required
              />

            </div>

            {/* Quantity */}

            <div className="form-group">

              <label>Total No of Copies</label>

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                required
              />

            </div>

            {/* Image Preview */}

            {bookImage && (

              <div className="image-preview">

                <img
                  src={URL.createObjectURL(bookImage)}
                  alt="Preview"
                  style={{
                    width: "180px",
                    height: "220px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                />

              </div>

            )}

            <button
              type="submit"
              className="save-book-btn"
            >
              Save Book
            </button>

          </form>

        </div>

      </main>

    </div>
  );
}

export default AddBook;