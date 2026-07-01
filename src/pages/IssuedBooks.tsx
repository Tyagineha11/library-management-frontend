import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/api";

type Book = {
  issueId: number;
  bookName: string;
  // studentName: string;
  issueDate: string;
  dueDate: string;
  status: string;
};

function MyIssuedBooks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("user");

        if (!token || !userData) {
          setError("User not found");
          setLoading(false);
          return;
        }

        const user = JSON.parse(userData);
        setUser(user);

        const response = await api.get(
          `/issue-book/my-issued-books/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API RESPONSE:", response.data);

        setBooks(response.data.data || []);
      } catch (err) {
        console.log(err);
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="issued-books-page">
      <div
        className="menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </div>

      <Sidebar sidebarOpen={sidebarOpen} />

      <main className="dashboard-content">
        <Header />

        <div className="dashboard-header">
          <h1>My Issued Books</h1>
          <p>Books issued to you</p>
        </div>

        <div className="issued-books-card">
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <table>
              <thead>
                <tr>
                  <th>Book Name</th>
                  {/* <th>Student Name</th> */}
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {books.length > 0 ? (
                  books.map((book) => (
                    <tr key={book.issueId}>
                      <td>{book.bookName}</td>
                      {/* <td>{book.studentName}</td> */}
                      <td>{book.issueDate}</td>
                      <td>{book.dueDate}</td>
                      <td>
                        <span
                          className={
                            book.status === "RETURNED"
                              ? "status-returned"
                              : "status-issued"
                          }
                        >
                          {book.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>No books issued</td>
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

export default MyIssuedBooks;