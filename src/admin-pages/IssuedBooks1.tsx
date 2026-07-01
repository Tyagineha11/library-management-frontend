import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import api from "../services/api";

function IssuedBooks() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  type IssuedBook = {
  issueId: number;
  studentName: string;
  bookName: string;
  issueDate: string;
  returnDate: string;
  fineAmount: number;
  status: string;
};

const [issuedBooks, setIssuedBooks] =
  useState<IssuedBook[]>([]);

  useEffect(() => {
  fetchIssuedBooks();
}, []);

const fetchIssuedBooks = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await api.get(
      "/issue-book/all-issued-books",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data.data);

    setIssuedBooks(response.data.data || []);
  } catch (error) {
    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Unable to load issued books.",
    });
  }
};

const handleReturn = async (id: number) => {
  const result = await Swal.fire({
    title: "Return Book?",
    text: "Are you sure you want to return this book?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, Return",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    const token = localStorage.getItem("accessToken");

    await api.put(
      `/issue-book/return/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Returned",
      text: "Book Returned Successfully",
      timer: 1500,
      showConfirmButton: false,
    });

    fetchIssuedBooks();
  } catch (error: any) {
    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        error.response?.data?.message ||
        "Unable to return book.",
    });
  }
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

          <h1>Issued Books</h1>

        </div>

        <div className="books-table-card">

          <table>

            <thead>

              <tr>
                <th>S.No.</th>
                <th>Student Name</th>
                <th>Book Name</th>
                <th>Issue Date</th>
                <th>Return Date</th>
                <th>Fine</th>
                {/* <th>Status</th> */}
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {issuedBooks.length > 0 ? (
              issuedBooks.map((book,index)=>(
              <tr key={book.issueId}>
              <td>{index+1}</td>
              <td>{book.studentName}</td>
              <td>{book.bookName}</td>
              <td>{book.issueDate}</td>
              <td>{book.returnDate}</td>
              <td>₹ {book.fineAmount}</td>
              {/* <td>
              <span
              className={
                book.status === "RETURNED"
                  ? "status-returned"
                  : "status-issued"
              }
              >
              {book.status}
              </span>
              </td> */}
              <td>
              {book.status === "ISSUED" ? (
                <button
                  className="return-btn"
                  onClick={() => handleReturn(book.issueId)}
                >
                  Return
                </button>
              ) : (
                <span
                  style={{
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  Returned
                </span>
              )}
              </td>
              </tr>
              ))

              ):(

              <tr>

              <td colSpan={8}>
              No Issued Books Found
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

export default IssuedBooks;