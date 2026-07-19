import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search..."
}) {
  return (
    <div className="search-bar">

      <FiSearch className="search-icon" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />

    </div>
  );
}