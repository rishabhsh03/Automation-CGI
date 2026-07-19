import "./InventoryFilter.css";

export default function InventoryFilter({
  search,
  setSearch,
  category,
  setCategory,
  warehouse,
  setWarehouse,
  status,
  setStatus,
  sortBy,
  setSortBy,
  categories = [],
  warehouses = [],
}) {
  return (
    <div className="inventory-filter">

      {/* Search */}

      <div className="filter-group">

        <label>Search</label>

        <input
          type="text"
          placeholder="Search SKU or Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Category */}

      <div className="filter-group">

        <label>Category</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>

          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}

        </select>

      </div>

      {/* Warehouse */}

      <div className="filter-group">

        <label>Warehouse</label>

        <select
          value={warehouse}
          onChange={(e) => setWarehouse(e.target.value)}
        >
          <option value="">All</option>

          {warehouses.map((wh) => (
            <option key={wh} value={wh}>
              {wh}
            </option>
          ))}

        </select>

      </div>

      {/* Status */}

      <div className="filter-group">

        <label>Status</label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out Of Stock">Out Of Stock</option>
        </select>

      </div>

      {/* Sort */}

      <div className="filter-group">

        <label>Sort</label>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Default</option>
          <option value="qtyHigh">Qty High → Low</option>
          <option value="qtyLow">Qty Low → High</option>
          <option value="nameAZ">Name A-Z</option>
          <option value="nameZA">Name Z-A</option>
        </select>

      </div>

      {/* Reset */}

      <button
        className="reset-btn"
        onClick={() => {
          setSearch("");
          setCategory("");
          setWarehouse("");
          setStatus("");
          setSortBy("");
        }}
      >
        Reset
      </button>

    </div>
  );
}