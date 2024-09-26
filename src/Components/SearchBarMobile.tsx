import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const SearchBarMobile = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?query=${searchQuery.trim()}`);
    }
  };

  // Set search query from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    if (query) {
      setSearchQuery(query);
    } else {
      setSearchQuery("");
    }
  }, [location.search]);

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="md:hidden w-full px-4 py-2.5 flex justify-between items-center bg-white shadow-md border-t border-gray-300 sticky top-16 z-50"
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="flex-grow bg-gray-100 text-gray-700 px-4 py-2 rounded-lg focus:outline-none border-2 border-gray-200 focus:border-teal-500 transition-all duration-200"
      />
      <button
        type="submit"
        className="ml-2 text-white bg-teal-500 hover:bg-teal-600 rounded-lg p-2 transition-all duration-200"
      >
        <CiSearch className="text-2xl" />
      </button>
    </form>
  );
};

export default SearchBarMobile;
