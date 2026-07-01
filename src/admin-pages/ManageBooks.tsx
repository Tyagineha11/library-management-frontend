import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import api from "../services/api";

type Book = {
  bookId: number;
  bookName: string;
  author: string;
  categoryName: string;
  totalPages: number;
  status: string;
  image: string;
};

function ManageBooks() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");

      const response = await api.get("/books/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      setBooks(response.data.data || []);
    } catch (error: any) {
        console.log(error);
        console.log(error.response);
        console.log(error.response?.data);

          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data?.message || "Unable to fetch books",
          });
        } finally {
              setLoading(false);
            }
          };

      const handleDelete = (bookId: number) => {
            Swal.fire({
            title: "Delete Book?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                const token = localStorage.getItem("accessToken");

              await api.delete(`/books/delete/${bookId}`,  {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });

          Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Book deleted successfully.",
            timer: 1500,
            showConfirmButton: false,
          });

          fetchBooks();
        } catch (error) {
          console.log(error);

          Swal.fire({
            icon: "error",
            title: "Delete Failed",
            text: "Unable to delete book.",
          });
        }
      }
    });
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

        <div className="page-header">
          <h1>Manage Books</h1>

          <button
            className="add-book-btn"
            onClick={() => navigate("/add-book")}
          >
            + Add Book
          </button>
        </div>

        <div className="books-table-card">

          {loading ? (
            <p>Loading Books...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Image</th>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Pages</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

             <tbody>
                {books.length > 0 ? (
                  books.map((book, index) => (
                    <tr key={book.bookId}>

                      <td>{index + 1}</td>

                      <td>
                        {book.image ? (
                          <img
                            src={`data:image/jpeg;base64,${book.image}`}
                            alt={book.bookName}
                            width={60}
                            height={80}
                            style={{
                              objectFit: "cover",
                              borderRadius: "6px",
                            }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>

                      <td>{book.bookName}</td>

                      <td>{book.author}</td>

                      <td>{book.categoryName}</td>

                      <td>{book.totalPages}</td>

                      <td>
                        <span
                          className={
                            book.status === "AVAILABLE"
                              ? "status-available"
                              : "status-issued"
                          }
                        >
                          {book.status}
                        </span>
                      </td>

                      <td className="action-column">
                        <button
                          className="edit-btn"
                          onClick={() => navigate(`/edit-book/${book.bookId}`)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(book.bookId)}
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center" }}>
                      No Books Found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          )}
        </div>

      </main>
    </div>
  );
}

export default ManageBooks;