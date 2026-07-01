type CategoryCardProps = {
  categories: any[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

function CategoryCard({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryCardProps) {
  return (
    <section className="categories reveal">

      <h2>Browse Categories</h2>

      <div className="category-list">

        <button
          className={`category-item ${
            selectedCategory === "all" ? "active" : ""
          }`}
          onClick={() => setSelectedCategory("all")}
        >
          All Books
        </button>

        {categories.map((category: any) => (

          <button
            key={category.id}
            className={`category-item ${
              selectedCategory === category.categoryName
                ? "active"
                : ""
            }`}
            onClick={() =>
              setSelectedCategory(category.categoryName)
            }
          >
            {category.categoryName}
          </button>

        ))}

      </div>

    </section>
  );
}

export default CategoryCard;