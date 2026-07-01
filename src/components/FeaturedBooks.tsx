import { Link } from "react-router-dom";

type FeaturedBooksProps = {
  books: any[];
};

function FeaturedBooks({ books }: FeaturedBooksProps) {

  const user = localStorage.getItem("user");

  return (
    <section className="featured-books reveal">

      <div className="books-container">

        {books.length > 0 ? (

          books.map((book: any) => (

            <div
              key={book.bookId}
              className="book-card show"
            >

              <img
                src={`data:image/jpeg;base64,${book.image}`}
                alt={book.bookName}
              />

              <div className="book-info">

                <h3>{book.bookName}</h3>

                <p>
                  {book.description
                    ? book.description.substring(0, 20) + "..."
                    : "No Description"}
                </p>

                <div className="book-buttons">

                  <Link
                    to={`/book/${book.bookId}`}
                    className="details-btn"
                  >
                    Details
                  </Link>

                  <button className="issue-btn">
                    Issue Book
                  </button>

                </div>

              </div>

            </div>

          ))

        ) : (

          !user ? (

            <div className="login-message">
              <h3>Login Required</h3>
              <p>
                Please log in to view and issue books from the library.
              </p>
            </div>

          ) : (

            <div className="login-message">
              <h3>No Books Available</h3>
              <p>
                There are no books available in this category.
              </p>
            </div>

          )

        )}

      </div>

      <div className="view-more-container">

        <Link
          to="/books"
          className="view-more-btn"
        >
          View More Books
        </Link>

      </div>

    </section>
  );
}

export default FeaturedBooks;