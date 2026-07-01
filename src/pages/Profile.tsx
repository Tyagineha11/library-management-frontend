import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../services/api";

function Profile() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    address: ""
});

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

    useEffect(() => {

    const fetchProfile = async () => {

        try {

            const token = localStorage.getItem("accessToken");
            const userData = JSON.parse(localStorage.getItem("user") || "{}");

            const response = await api.get(
                `/users/get/${userData.email}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(response.data.data);

        } catch (error) {

            console.log(error);

        }

    };

    fetchProfile();

}, []);

const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {

    setUser({
        ...user,
        [e.target.name]: e.target.value,
    });

};

const updateProfile = async () => {

    try {

        const token = localStorage.getItem("accessToken");
        const userData = JSON.parse(localStorage.getItem("user") || "{}");

        const response = await api.put(
            `/users/update/${userData.email}`,
            user,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        localStorage.setItem(
            "user",
            JSON.stringify(response.data.data)
        );

        Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message,
            timer: 1500,
            showConfirmButton: false,
        });

        console.log(response.data);
console.log(response.data.data);

    } catch (error: any) {

        Swal.fire({
            icon: "error",
            title: "Error",
            text:
                error.response?.data?.message ||
                "Something went wrong",
        });

    }
    

};

  return (
    <div className="profile-page">

      <div
        className="menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </div>

      <Sidebar sidebarOpen={sidebarOpen} />

        <Header />

      <main className="dashboard-content">

        <div className="dashboard-header">
          <h1>My Profile</h1>
          <p>Manage your profile information</p>
        </div>

        <div className="profile-card">

          <div className="profile-form">

            <div className="form-group">
              <label>Full Name</label>
             <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                  type="email"
                  value={user.email}
                  readOnly
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                  type="text"
                  name="mobile"
                  value={user.mobile}
                  onChange={handleChange}
                  maxLength={10}
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  placeholder="Enter Mobile Number"
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                  rows={4}
                  name="address"
                  value={user.address}
                  onChange={handleChange}
              />
            </div>

            <button
                className="update-btn"
                onClick={updateProfile}
            >
                Update Profile
            </button>
            

          </div>

        </div>

      </main>

    </div>
  );
}

export default Profile;