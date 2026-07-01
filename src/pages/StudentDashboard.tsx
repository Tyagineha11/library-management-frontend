import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function StudentDashboard() {
const [issuedBooks, setIssuedBooks] = useState<any[]>([]);
const [issuedCount, setIssuedCount] = useState(0);
const [dueSoon, setDueSoon] = useState(0);
const [pendingFine, setPendingFine] = useState(0);
const [booksRead, setBooksRead] = useState(0);

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    const fetchDashboard = async () => {

        const token = localStorage.getItem("accessToken");
        const role = localStorage.getItem("role");
        const userData = localStorage.getItem("user");

        if (!token) {
            navigate("/login");
            return;
        }

        if (role !== "STUDENT") {
            navigate("/login");
            return;
        }

        if (!userData) return;

        const user = JSON.parse(userData);

        setUser(user);

        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await api.get(
                `/issue-book/my-issued-books/${user.id}`,
                config
            );

            const books = response.data.data || [];

            setIssuedBooks(books);

            setIssuedCount(
                books.filter((b: any) => b.status === "ISSUED").length
            );

            setBooksRead(
                books.filter((b: any) => b.status === "RETURNED").length
            );

            const fine = books.reduce(
                (sum: number, b: any) => sum + (b.fineAmount || 0),
                0
            );

            setPendingFine(fine);

            const today = new Date();

            const due = books.filter((b: any) => {

                const dueDate = new Date(b.dueDate);

                const diff =
                    (dueDate.getTime() - today.getTime()) /
                    (1000 * 60 * 60 * 24);

                return diff <= 3 && diff >= 0;

            });

            setDueSoon(due.length);

        } catch (error) {

            console.log(error);

        }

    };

    fetchDashboard();

}, [navigate]);

  return (

    <div className="student-dashboard">

      {/* Sidebar Toggle */}

      <div
        className="menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </div>

      {/* Sidebar */}

      <div
        className={`sidebar ${sidebarOpen ? "active" : ""}`}
      >
        <Sidebar sidebarOpen={sidebarOpen} />
        <Header />
      </div>

      {/* Dashboard */}

      <main className="dashboard-content">

        <div className="dashboard-header">

          <h1>Student Dashboard</h1>

          <h3>
            Welcome, {user?.name} 👋
          </h3>

          <p>
            {user?.email}
          </p>

        </div>

        {/* Stats */}

        <div className="stats-container">

          <div className="stat-card">
            <h2>{issuedCount}</h2>
            <p>Issued Books</p>
          </div>

          <div className="stat-card">
            <h2>{dueSoon}</h2>
            <p>Due Soon</p>
          </div>

          <div className="stat-card">
            <h2>₹{pendingFine}</h2>
            <p>Pending Fine</p>
          </div>

          <div className="stat-card">
            <h2>{booksRead}</h2>
            <p>Books Read</p>
          </div>

        </div>

        {/* Recent Books */}

        <div className="recent-section">

          <h2>Recently Issued Books</h2>

          <table>

            <thead>
              <tr>
                <th>Book</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

                {
                issuedBooks.length > 0 ? (

                issuedBooks.map((book: any) => (

                <tr key={book.issueId}>

                <td>{book.bookName}</td>

                <td>{book.issueDate}</td>

                <td>{book.dueDate}</td>

                <td>

                <span className={book.status === "RETURNED" ? "returned" : "issued"}>

                {book.status}

                </span>

                </td>

                </tr>

                ))

                ) : (

                <tr>

                <td colSpan={4} style={{ textAlign: "center" }}>
                No Books Issued Yet
                </td>

                </tr>

                )

                }

              </tbody>

          </table>

        </div>

      </main>

    </div>

  );
}

export default StudentDashboard;