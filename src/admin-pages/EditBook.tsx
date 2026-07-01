import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import api from "../services/api";

type Category = {
  id: number;
  categoryName: string;
};

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [bookImage, setBookImage] =
    useState<File | null>(null);

  const [previewImage, setPreviewImage] =
    useState("");

  const [categories, setCategories] =
    useState<Category[]>([]);

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
    fetchBook();
  }, []);

  // ==========================
  // Get All Categories
  // ==========================

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await api.get("/category/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Get Book By Id
  // ==========================

  const fetchBook = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await api.get(`/books/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const book = response.data.data;

      setFormData({
        bookName: book.bookName,
        author: book.author,
        description: book.description,
        categoryId: String(book.categoryId),
        totalPages: book.totalPages,
        quantity: book.quantity,
      });

      if (book.image) {
        setPreviewImage(
          `data:image/jpeg;base64,${book.image}`
        );
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to load book.",
      });
    }
  };

  // ==========================
  // Handle Input
  // ==========================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("accessToken");

    const data = new FormData();

    data.append("bookName", formData.bookName);
    data.append("author", formData.author);
    data.append("description", formData.description);
    data.append("categoryId", formData.categoryId);
    data.append("totalPages", formData.totalPages);
    data.append("quantity", formData.quantity);

    if (bookImage) {
      data.append("image", bookImage);
    }

    await api.put(`/books/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Book Updated Successfully",
      timer: 1500,
      showConfirmButton: false,
    });

    navigate("/manage-books");
  } catch (error: any) {
    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        error.response?.data?.message ||
        "Unable to update book.",
    });
  }
};
return (
  <div className="dashboard-layout">

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

        <h1>Edit Book</h1>

        {/* Yahan apna form paste karo */}

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
              required
            />
          </div>

          {/* Image */}

          <div className="form-group">
            <label>Book Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.length) {
                  setBookImage(e.target.files[0]);
                  setPreviewImage(
                    URL.createObjectURL(e.target.files[0])
                  );
                }
              }}
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
              required
            />
          </div>

          {/* Quantity */}

          <div className="form-group">
            <label>Total Copies</label>

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image Preview */}

          {previewImage && (
            <div className="image-preview">
              <img
                src={previewImage}
                alt="Book"
                style={{
                  width: "180px",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}

          <button
            type="submit"
            className="save-book-btn"
          >
            Update Book
          </button>

        </form>

      </div>

    </main>

  </div>
);
}

export default EditBook;