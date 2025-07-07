import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import api from "../services/api";
import "../styles/searchbar.css";

const SearchBar = ({ onSearchResult }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await api.get(`/profile/search?profile_name=${query}`);
      
      // Make sure it's sent as a single object
      if (typeof onSearchResult === "function") {
        onSearchResult(res.data); // NOT spreading
      }
    } catch (err) {
      console.error("Search failed:", err);
      if (typeof onSearchResult === "function") {
        onSearchResult(null);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by Profile Name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <FaSearch className="icon" onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;
