import { useState } from "react";

import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

function Fines() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const fines = [
    {
      id: 1,
      student: "Neha Tyagi",
      book: "Java Mastery",
      amount: 150,
      dueDate: "20 Jun 2026",
      status: "Pending"
    },
    {
      id: 2,
      student: "Rahul Sharma",
      book: "Spring Boot Guide",
      amount: 100,
      dueDate: "18 Jun 2026",
      status: "Paid"
    }
  ];

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

          <h1>Fines Management</h1>

        </div>

        <div className="books-table-card">

          <table>

            <thead>
              <tr>
                <th>S.No.</th>
                <th>Student Name</th>
                <th>Book Name</th>
                <th>Fine Amount</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {fines.map((fine, index) => (

                <tr key={fine.id}>

                  <td>{index + 1}</td>

                  <td>{fine.student}</td>

                  <td>{fine.book}</td>

                  <td>₹{fine.amount}</td>

                  <td>{fine.dueDate}</td>

                  <td>
                    <span
                      className={
                        fine.status === "Paid"
                          ? "status-paid"
                          : "status-pending"
                      }
                    >
                      {fine.status}
                    </span>
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

export default Fines;