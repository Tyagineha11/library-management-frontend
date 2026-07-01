import { useState } from "react";
import Swal from "sweetalert2";

import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

function ReturnBook() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const books = [
    {
      id: 1,
      student: "Neha Tyagi",
      book: "Java Mastery",
      issueDate: "10 Jun 2026",
      dueDate: "25 Jun 2026"
    },
    {
      id: 2,
      student: "Rahul Sharma",
      book: "Spring Boot Guide",
      issueDate: "12 Jun 2026",
      dueDate: "27 Jun 2026"
    }
  ];

  const handleReturn = () => {

    Swal.fire({
      icon: "success",
      title: "Book Returned",
      text: "Book Returned Successfully",
      confirmButtonColor: "#0d1622"
    });

  };

  return (
    <div className="dashboard-layout">

      <div
        className="admin-menu-toggle"
        onClick={() =>
          setSidebarOpen(!sidebarOpen)
        }
      >
        ☰
      </div>

      <AdminSidebar
        sidebarOpen={sidebarOpen}
      />

      <main className="dashboard-content">

        <AdminHeader />

        <div className="page-header">
          <h1>Return Books</h1>
        </div>

        <div className="books-table-card">

          <table>

            <thead>

              <tr>
                <th>S.No.</th>
                <th>Student</th>
                <th>Book Name</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {books.map((book, index) => (

                <tr key={book.id}>

                  <td>{index + 1}</td>

                  <td>{book.student}</td>

                  <td>{book.book}</td>

                  <td>{book.issueDate}</td>

                  <td>{book.dueDate}</td>

                  <td>

                    <button
                      className="return-btn"
                      onClick={handleReturn}
                    >
                      Return
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}

export default ReturnBook;