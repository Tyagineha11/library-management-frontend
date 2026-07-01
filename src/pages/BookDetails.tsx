import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../services/api";
import Swal from "sweetalert2";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await api.get(`/books/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBook(response.data.data);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to load book details.",
      });
    }
  };

  const handleIssueBook = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first.",
      });

      navigate("/login");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    try {
      await api.post(
        "/issue-book/issue",
        {
          studentId: user.id,
          bookId: book.bookId,
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
        text: "Book Issued Successfully",
      });

      fetchBook();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Unable to issue book.",
      });
    }
  };

  if (!book) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <>
      <Header />

      <section className="book-details">

        <div className="book-details-card">

          <div className="book-image-section">

            <img
              src={`data:image/jpeg;base64,${book.image}`}
              alt={book.bookName}
            />

          </div>

          <div className="details-content">

            <span className="book-tag">
              📚 Library Collection
            </span>

            <h1>{book.bookName}</h1>

            <p>{book.description}</p>

            <div className="book-info-grid">

              <div className="info-box">
                <span>Author</span>
                <h4>{book.author}</h4>
              </div>

              <div className="info-box">
                <span>Category</span>
                <h4>{book.categoryName}</h4>
              </div>

              <div className="info-box">
                <span>Total Pages</span>
                <h4>{book.totalPages}</h4>
              </div>

              <div className="info-box">
                <span>Available</span>
                <h4>{book.availableQuantity}</h4>
              </div>

              <div className="info-box">
                <span>Total Quantity</span>
                <h4>{book.quantity}</h4>
              </div>

              <div className="info-box">
                <span>Status</span>
                <h4>{book.status}</h4>
              </div>

            </div>

            <div className="action-buttons">

              <button
                className="issue-btn"
                onClick={handleIssueBook}
                disabled={book.availableQuantity === 0}
              >
                {book.availableQuantity === 0
                  ? "Out of Stock"
                  : "Issue Book"}
              </button>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default BookDetails;