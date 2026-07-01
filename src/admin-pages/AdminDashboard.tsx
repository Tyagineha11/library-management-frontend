import { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user, setUser] = useState<any>(null);

  const [totalBooks, setTotalBooks] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [issuedBooks, setIssuedBooks] = useState(0);
  const [pendingReturns, setPendingReturns] = useState(0);

  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  useEffect(() => {

    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const token = localStorage.getItem("accessToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Books
      const books = await api.get("/books/getAll", config);
      setTotalBooks(books.data.data.length);

      // Users
      const users = await api.get("/users/allUser", config);

      const students = users.data.data.filter(
        (u: any) => u.role === "STUDENT"
      );

      setTotalStudents(students.length);

      // Issued Books
      const issued = await api.get("/issue-book/all-issued-books", config);

      setIssuedBooks(issued.data.data.length);

      const pending = issued.data.data.filter(
        (item: any) => item.status === "ISSUED"
      );

      setPendingReturns(pending.length);

      setRecentActivities(issued.data.data);

    } catch (error) {

      console.log("Dashboard Error", error);

    }

  };

  return (

    <div className="dashboard-layout">

      {/* Toggle */}

      <div
        className="admin-menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </div>

      {/* Sidebar */}

      <AdminSidebar sidebarOpen={sidebarOpen} />

      <main className="dashboard-content">

        <AdminHeader />

        {/* Header */}

        <div className="dashboard-header">

          <h1>Admin Dashboard</h1>

          <p>
            Welcome Back,
            <strong> {user?.name}</strong> 👋
          </p>

        </div>

        {/* Cards */}

        <div className="admin-stats">

          <div className="admin-card">
            <h2>{totalBooks}</h2>
            <p>Total Books</p>
          </div>

          <div className="admin-card">
            <h2>{totalStudents}</h2>
            <p>Total Students</p>
          </div>

          <div className="admin-card">
            <h2>{issuedBooks}</h2>
            <p>Issued Books</p>
          </div>

          <div className="admin-card">
            <h2>{pendingReturns}</h2>
            <p>Pending Returns</p>
          </div>

        </div>

        {/* Quick Actions */}

        <div className="quick-actions">

          <h2>Quick Actions</h2>

          <div className="action-buttons">

            <button onClick={() => navigate("/manage-books")}>
              Add Book
            </button>

            <button onClick={() => navigate("/students")}>
              View Students
            </button>

            <button onClick={() => navigate("/issued")}>
              Issue Book
            </button>

            <button onClick={() => navigate("/categories")}>
              Catgeory
            </button>

          </div>

        </div>

        {/* Recent Activities */}

        <div className="recent-section">

          <h2>Recent Activities</h2>

          <table>

            <thead>

              <tr>

                <th>Student</th>
                <th>Book</th>
                <th>Status</th>
                <th>Issue Date</th>

              </tr>

            </thead>

            <tbody>

              {recentActivities.length > 0 ? (

                recentActivities.map((activity: any) => (

                  <tr
                    key={
                      activity.issueId ||
                      activity.id
                    }
                  >

                    <td>{activity.studentName}</td>

                    <td>{activity.bookName}</td>

                    <td>{activity.status}</td>

                    <td>{activity.issueDate}</td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan={4}
                    style={{ textAlign: "center" }}
                  >
                    No Recent Activities
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

export default AdminDashboard;