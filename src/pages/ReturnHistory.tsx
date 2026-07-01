import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function ReturnHistory() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

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
            <h1>Return History</h1>
            <p>
              View all your returned books.
            </p>
          </div>

          <div className="recent-section">

            <h2>Returned Books</h2>

            <table>

              <thead>
                <tr>
                  <th>Book Name</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>Java Mastery</td>
                  <td>01 Jun 2026</td>
                  <td>15 Jun 2026</td>
                  <td>13 Jun 2026</td>
                  <td>
                    <span className="returned">
                      Returned
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Spring Boot Guide</td>
                  <td>10 May 2026</td>
                  <td>25 May 2026</td>
                  <td>24 May 2026</td>
                  <td>
                    <span className="returned">
                      Returned
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Quantum World</td>
                  <td>15 Apr 2026</td>
                  <td>30 Apr 2026</td>
                  <td>28 Apr 2026</td>
                  <td>
                    <span className="returned">
                      Returned
                    </span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </main>

      </div>

    </div>
  );
}

export default ReturnHistory;