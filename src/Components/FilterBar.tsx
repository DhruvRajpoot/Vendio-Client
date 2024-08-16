import React, { useRef, useState } from "react";
import { FaChevronDown, FaFilter } from "react-icons/fa";
import useOutsideClick from "../Hooks/useOutsideClick";

interface FilterBarProps {
  onFilterChange: (filters: { category: string; sortBy: string }) => void;
  category: string;
  sortBy: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange,
  category,
  sortBy,
}) => {
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [sortByOpen, setSortByOpen] = useState<boolean>(false);

  const categories = ["All", "Electronics", "Fashion", "Footwear", "Sports"];
  const sortOptions = ["Relevancy", "Low to High", "High to Low"];

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
    <div className="mb-6 p-3 bg-white rounded-md shadow-sm flex gap-4 xs:gap-6 items-center justify-between">
      <div className="flex items-center gap-4 sm:gap-6 w-full xs:w-auto">
        {/* Category Filter */}
        <div className="relative min-w-fit flex-1 xs:flex-grow-0 sm:w-48">
          <div
            className="min-w-fit xs:min-w-28 cursor-pointer p-2 border border-gray-200 rounded-md text-gray-600 flex gap-2 justify-between items-center select-none"
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
                    onFilterChange({ category: cat, sortBy });
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
            className="min-w-fit xs:min-w-28 cursor-pointer p-2 border border-gray-200 rounded-md text-gray-600 flex gap-2 justify-between items-center select-none"
            onClick={() => setSortByOpen(!sortByOpen)}
            ref={sortByMenuRef}
          >
            <span className="text-sm">{sortBy}</span>
            <FaChevronDown className="text-xs" />
          </div>
          {sortByOpen && (
            <div className="absolute z-10 mt-1 min-w-28 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              {sortOptions.map((sortOption) => (
                <div
                  key={sortOption}
                  onClick={() => {
                    onFilterChange({ category, sortBy: sortOption });
                    setSortByOpen(false);
                  }}
                  className={`p-2 text-sm hover:bg-teal-500 hover:text-white transition-colors duration-200 cursor-pointer ${
                    sortBy === sortOption ? "bg-teal-500 text-white" : ""
                  }`}
                >
                  {sortOption}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter button for mobile */}
      <div className="w-auto">
        <button className="p-3 xs:p-2 text-sm w-full bg-gray-100 rounded-md text-gray-500 font-semibold flex gap-2 items-center justify-center">
          <FaFilter className="text-teal-600 text-md" />
          <span className="hidden xs:inline-block">Filter</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
