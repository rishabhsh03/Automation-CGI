import "./CategoryProgress.css";

export default function CategoryProgress({ categories = [] }) {
  return (
    <div className="category-card">

      <div className="category-header">
        <h2>Top Categories</h2>

        <button className="view-btn">
          View All
        </button>
      </div>

      <div className="category-scroll">

        {categories.map((item) => {

          const percentage = Math.min(Number(item.total) * 10, 100);

          return (
            <div className="category-item" key={item.category}>

              <div className="category-info">

                <span>{item.category}</span>

                <span>{item.total}</span>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: `${percentage}%` }}
                ></div>

              </div>

            </div>
          );

        })}

      </div>

    </div>
  );
}