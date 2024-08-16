import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard";
import { products } from "../../Store/products";
import Navbar from "../../Components/Navbar";
import Breadcrumb from "../../Components/Breadcrumb";
import Footer from "../../Components/Footer";
import FilterBar from "../../Components/FilterBar";

const ProductsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Relevancy");
  const productsPerPage = 9;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    let filtered = [...products];

    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (sortBy !== "Relevancy") {
      if (sortBy === "Low to High") {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === "High to Low") {
        filtered = filtered.sort((a, b) => b.price - a.price);
      }
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [categoryFilter, sortBy]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "All Products" },
  ];

  const handleFilterChange = (filters: {
    category: string;
    sortBy: string;
  }) => {
    setCategoryFilter(filters.category);
    setSortBy(filters.sortBy);
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      <Navbar />

      <Breadcrumb items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-3 max-w-screen-xl mb-10">
        <FilterBar onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-3 sm:gap-4 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 hover:bg-teal-500 hover:text-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
