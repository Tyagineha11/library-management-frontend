import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../services/api";

function Books() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [categories, setCategories] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);

  const booksPerPage = 12;

  useEffect(() => {
    fetchCategories();
    fetchBooks();
  }, []);

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

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await api.get("/books/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBooks(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter Books
  const filteredBooks = books.filter((book: any) => {
    const categoryMatch =
      selectedCategory === "all"
        ? true
        : book.categoryName === selectedCategory;

    const searchMatch = book.bookName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  // Pagination
  const totalPages = Math.ceil(
    filteredBooks.length / booksPerPage
  );

  const startIndex = (currentPage - 1) * booksPerPage;

  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + booksPerPage
  );

  const handleIssueBook = async (bookId: number) => {
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

  // LocalStorage se login user lo
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  console.log("Logged User:", user);

  try {
    await api.post(
      "/issue-book/issue",
      {
        studentId: user.id, // agar id nahi ho to niche check karo
        bookId: bookId,
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

    fetchBooks();
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

  return (
    <>
      <Header />

      {/* HERO */}

      <section className="hero">
        <div className="hero-content">
          <h1>
            Smart Library
            <span>Management System</span>
          </h1>
        </div>
      </section>

      {/* SEARCH */}

      <div className="search-box-page">
        <input
          type="text"
          placeholder="Search Books..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* CATEGORY */}

      <section className="categories">
        <h2>Browse Categories</h2>

        <div className="category-list">

          <button
            className={`category-item ${
              selectedCategory === "all" ? "active" : ""
            }`}
            onClick={() => {
              setSelectedCategory("all");
              setCurrentPage(1);
            }}
          >
            All Books
          </button>

          {categories.map((category: any) => (
            <button
              key={category.id}
              className={`category-item ${
                selectedCategory === category.categoryName
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setSelectedCategory(category.categoryName);
                setCurrentPage(1);
              }}
            >
              {category.categoryName}
            </button>
          ))}
        </div>
      </section>

      {/* BOOKS */}

      <section className="featured-books">
        <div className="books-container">

          {currentBooks.length > 0 ? (

            currentBooks.map((book: any) => (

              <div
                key={book.bookId}
                className="book-card show"
              >

                <img
                  src={`data:image/jpeg;base64,${book.image}`}
                  alt={book.bookName}
                />

                <div className="book-info">

                  <h3>{book.bookName}</h3>

                  <p>
                    {book.description
                      ? book.description.substring(0, 20) + "..."
                      : "No Description"}
                  </p>

                  <div className="book-buttons">

                    <button
                      className="details-btn"
                      onClick={() =>
                        navigate(`/book/${book.bookId}`)
                      }
                    >
                      Details
                    </button>

                    <button
                      className="issue-btn"
                      onClick={() => handleIssueBook(book.bookId)}
                    >
                      Issue Book
                    </button>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <h2 style={{ textAlign: "center", width: "100%" }}>
              No Books Found
            </h2>

          )}

        </div>

        {/* PAGINATION */}

        {totalPages > 1 && (

          <div className="pagination">

            {[...Array(totalPages)].map((_, index) => (

              <button
                key={index}
                className={
                  currentPage === index + 1
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(index + 1)
                }
              >
                {index + 1}
              </button>

            ))}

          </div>

        )}

      </section>

      <Footer />
    </>
  );
}

export default Books;