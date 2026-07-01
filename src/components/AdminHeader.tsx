import "../assets/styles/admin-common.css";

function AdminHeader() {
  return (
    <div className="admin-header">

      <div className="header-left">
        <h2>📚 LibraryHub</h2>
      </div>

      <div className="header-right">

        {/* Profile Dropdown */}

        <div className="profile-dropdown">

          <div className="admin-avatar">
            A
          </div>

          <div className="dropdown-menu">

            <h4>Administrator</h4>

            <p>Admin Panel</p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminHeader;