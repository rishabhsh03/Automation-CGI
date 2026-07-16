import "../CategoryProgress.css";
export default function CategoryProgress({ categories = [] }) {
  return (
    <div className="category-card">

      <div className="category-header">
        <h2>Top Categories</h2>
      </div>

      <div className="category-scroll">

        {categories.map((item) => (
          <div className="category-item" key={item.category}>

            <div className="category-title">
              <span>{item.category}</span>
              <span>{item.total}</span>
            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${Number(item.total) * 10}%`,
                }}
              ></div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}