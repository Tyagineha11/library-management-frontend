import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookDetails from "./pages/BookDetails";
import StudentDashboard from "./pages/StudentDashboard";
import Profile from "./pages/Profile";
import IssuedBooks from "./pages/IssuedBooks";
import ReturnHistory from "./pages/ReturnHistory";
import Fines from "./pages/Fines";
import AdminLogin from "./admin-pages/AdminLogin";
import AdminDashboard from "./admin-pages/AdminDashboard";
import ManageBooks from "./admin-pages/ManageBooks";
import AddBook from "./admin-pages/AddBook";
import EditBook from "./admin-pages/EditBook";
import Categories from "./admin-pages/Categories";
import AddCategory from "./admin-pages/AddCategory";
import EditCategory from "./admin-pages/EditCategory";
import Students from "./admin-pages/Students";
import ReturnBook from "./admin-pages/ReturnBook";
import IssuedBooks1 from "./admin-pages/IssuedBooks1";
import UserFines from "./admin-pages/UserFines";











function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/issued-books" element={<IssuedBooks />} />
        <Route path="/return-history" element={<ReturnHistory />} />
        <Route path="/fines" element={<Fines />} />
        <Route path="/Admin" element={<AdminLogin />} /> 
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-books" element={<ManageBooks />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="/categories" element={<Categories />} /> 
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
        <Route path="/students" element={<Students />} />
        <Route path="/return-Book" element={<ReturnBook />} />
        <Route path="/issued" element={<IssuedBooks1 />} />
        <Route path="/UserFines" element={<UserFines />} />









      </Routes>
    </BrowserRouter>
  );
}

export default App;

