import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

type Book = {
  issueId: number;
  bookName: string;
  dueDate: string;
  returnDate?: string;
  fineAmount: number;
  status: string;
};

function Fines() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [totalPending, setTotalPending] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [pendingBooks, setPendingBooks] = useState(0);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchFines = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("accessToken");

        const response = await api.get(
          `/issue-book/my-issued-books/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.data || [];
        setBooks(data);

        // 🔥 CALCULATIONS FROM SAME API

        const pending = data.filter(
          (b: Book) => b.status !== "RETURNED"
        );

        const paid = data.filter(
          (b: Book) => b.status === "RETURNED"
        );

        const pendingFine = pending.reduce(
          (sum: number, b: Book) => sum + (b.fineAmount || 0),
          0
        );

        const paidFine = paid.reduce(
          (sum: number, b: Book) => sum + (b.fineAmount || 0),
          0
        );

        setTotalPending(pendingFine);
        setTotalPaid(paidFine);
        setPendingBooks(pending.length);
      } catch (err) {
        console.log(err);
        setError("Failed to load fines");
      } finally {
        setLoading(false);
      }
    };

    fetchFines();
  }, [user.id]);

  return (
    <div className="dashboard-layout">
      <div
        className="menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </div>

      <Sidebar sidebarOpen={sidebarOpen} />

      <div className="dashboard-main">
        <Header />

        <main className="dashboard-content">
          <div className="dashboard-header">
            <h1>Fines & Penalties</h1>
            <p>Check your pending and paid fines.</p>
          </div>

          {/* STATS */}
          <div className="stats-container">
            <div className="stat-card">
              <h2>₹{totalPending}</h2>
              <p>Total Pending Fine</p>
            </div>

            <div className="stat-card">
              <h2>₹{totalPaid}</h2>
              <p>Total Paid Fine</p>
            </div>

            <div className="stat-card">
              <h2>{pendingBooks}</h2>
              <p>Pending Books</p>
            </div>
          </div>

          {/* TABLE */}
          <div className="recent-section">
            <h2>Fine Details</h2>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && (
              <table>
                <thead>
                  <tr>
                    <th>Book Name</th>
                    <th>Due Date</th>
                    <th>Fine Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {books.length > 0 ? (
                    books.map((b) => (
                      <tr key={b.issueId}>
                        <td>{b.bookName}</td>
                        <td>{b.dueDate}</td>
                        <td>₹{b.fineAmount}</td>
                        <td>
                          <span
                            className={
                              b.status === "RETURNED"
                                ? "paid-fine"
                                : "pending-fine"
                            }
                          >
                            {b.status === "RETURNED"
                              ? "Paid"
                              : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>No fine records</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Fines;