import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryCard from "../components/CategoryCard";
import FeaturedBooks from "../components/FeaturedBooks";
import api from "../services/api";

function Home() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [categories, setCategories] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
    fetchBooks();

    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    reveals.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await api.get("/category/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await api.get("/books/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBooks(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Category Filter
  const filteredBooks =
    selectedCategory === "all"
      ? books
      : books.filter(
          (book: any) =>
            book.categoryName === selectedCategory
        );

  // Home par sirf first 8 books
  const featuredBooks = filteredBooks.slice(0, 8);

  return (
    <>
      <Header />

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <h1>
            Smart Library
            <span>Management System</span>
          </h1>

          <p>
            Manage Books, Authors, Categories,
            Students, Issue & Return Operations
            from one powerful dashboard.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/login")}
            >
              Login to Library
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/books")}
            >
              View Library
            </button>

          </div>

        </div>

      </section>

      {/* CATEGORY */}

      <CategoryCard
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* FEATURED BOOKS */}

      <FeaturedBooks books={featuredBooks} />

      {/* FEATURES */}

      <section className="features reveal">

        <div className="section-title">

          <h2>Why Choose Our Library?</h2>

          <p>
            Everything you need for a modern reading experience.
          </p>

        </div>

        <div className="feature-container">

          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>{books.length} Books</h3>
            <p>
              Explore thousands of books across multiple categories.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📂</div>
            <h3>{categories.length} Categories</h3>
            <p>
              Browse books category wise.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Quick Search</h3>
            <p>
              Find your favourite books instantly.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👨‍🎓</div>
            <h3>Student Friendly</h3>
            <p>
              Easy Issue & Return process.
            </p>
          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Home;