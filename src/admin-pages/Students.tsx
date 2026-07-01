import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import api from "../services/api";

type Student = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
};

function Students() {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await api.get("/users/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      setStudents(response.data.data || []);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to load students.",
      });
    }
  };

  return (
    <div className="dashboard-layout">

      <div
        className="admin-menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </div>

      <AdminSidebar sidebarOpen={sidebarOpen} />

      <main className="dashboard-content">

        <AdminHeader />

        <div className="page-header">
          <h1>Students</h1>
        </div>

        <div className="books-table-card">

          <table>

            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No.</th>
                <th>Address</th>
              </tr>
            </thead>

            <tbody>

              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={student.id}>

                    <td>{index + 1}</td>

                    <td>{student.name}</td>

                    <td>{student.email}</td>

                    <td>{student.mobile}</td>

                    <td>{student.address}</td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    style={{ textAlign: "center" }}
                  >
                    No Students Found
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

export default Students;