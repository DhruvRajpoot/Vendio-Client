import React, { useRef, useState } from "react";
import { FaChevronDown, FaFilter } from "react-icons/fa";
import useOutsideClick from "../Hooks/useOutsideClick";
import { useLocation } from "react-router-dom";

interface FilterBarProps {
  onFilterChange: (filters: { category: string; sortBy: string }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [category, setCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Relevancy");
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [sortByOpen, setSortByOpen] = useState<boolean>(false);

  const location = useLocation();
  const categoryQuery = new URLSearchParams(location.search).get("category");

  if (categoryQuery && category !== categoryQuery) {
    setCategory(categoryQuery);
  }

  const categories = ["All", "Electronics", "Fashion", "Footwear", "Sports"];
  const sortOptions = ["Relevancy", "Low to High", "High to Low"];

  const handleFilterChange = () => {
    onFilterChange({ category, sortBy });
  };

  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const sortByMenuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    categoryMenuRef,
    () => {
      setCategoryOpen(false);
    },
    categoryOpen
  );

  useOutsideClick(
    sortByMenuRef,
    () => {
      setSortByOpen(false);
    },
    sortByOpen
  );

  return (
    <div className="mb-6 p-3 bg-white rounded-md shadow-sm flex gap-4 flex-col xs:flex-row xs:gap-6 items-center justify-between">
      <div className="flex items-center gap-4 sm:gap-6 w-full xs:w-auto">
        {/* Category Filter */}
        <div className="relative min-w-fit flex-1 xs:flex-grow-0 sm:w-48">
          <div
            className="cursor-pointer p-2 border border-gray-200 rounded-md text-gray-600 flex gap-2 justify-between items-center select-none"
            onClick={() => setCategoryOpen(!categoryOpen)}
            ref={categoryMenuRef}
          >
            <span className="text-sm">{category}</span>
            <FaChevronDown className="text-xs" />
          </div>
          {categoryOpen && (
            <div className="absolute z-10 mt-1 min-w-28 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setCategoryOpen(false);
                  }}
                  className={`p-2 text-sm hover:bg-teal-500 hover:text-white transition-colors duration-200 cursor-pointer ${
                    category === cat ? "bg-teal-500 text-white" : ""
                  }`}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sort by Price */}
        <div className="relative min-w-fit flex-1 xs:flex-grow-0 sm:w-48">
          <div
            className="cursor-pointer p-2 border border-gray-200 rounded-md text-gray-600 flex gap-2 justify-between items-center select-none"
            onClick={() => setSortByOpen(!sortByOpen)}
            ref={sortByMenuRef}
          >
            <span className="text-sm">{sortBy}</span>
            <FaChevronDown className="text-xs" />
          </div>

          {sortByOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              {sortOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    setSortByOpen(false);
                  }}
                  className={`p-2 text-sm hover:bg-teal-500 hover:text-white transition-colors duration-200 cursor-pointer ${
                    sortBy === option ? "bg-teal-500 text-white" : ""
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={handleFilterChange}
        className="ml-auto xs:ml-0 px-4 py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition-colors duration-200 flex items-center gap-2 text-sm"
      >
        <FaFilter className="text-xs" />
        Apply Filters
      </button>
    </div>
  );
};

export default FilterBar;
