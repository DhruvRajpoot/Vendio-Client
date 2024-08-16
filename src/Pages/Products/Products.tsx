import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../../Components/ProductCard";
import { products } from "../../Store/products";
import Navbar from "../../Components/Navbar";
import Breadcrumb from "../../Components/Breadcrumb";
import Footer from "../../Components/Footer";
import FilterBar from "../../Components/FilterBar";
import { useLocation, useNavigate } from "react-router-dom";

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 9;

  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get("category") || "All";
  const sortBy = queryParams.get("sortBy") || "Relevancy";
  const pageParam = parseInt(queryParams.get("page") || "1", 10);

  useEffect(() => {
    setCurrentPage(pageParam);
  }, [pageParam]);

  // Filter and sort products based on query parameters
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (sortBy !== "Relevancy") {
      if (sortBy === "Low to High") {
        filtered = filtered.sort(
          (a, b) =>
            a.price -
            (a.price * a.discount) / 100 -
            (b.price - (b.price * b.discount) / 100)
        );
      } else if (sortBy === "High to Low") {
        filtered = filtered.sort(
          (a, b) =>
            b.price -
            (b.price * b.discount) / 100 -
            (a.price - (a.price * a.discount) / 100)
        );
      }
    }

    return filtered;
  }, [categoryFilter, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", pageNumber.toString());
    navigate(`?${searchParams.toString()}`);
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
    const { category, sortBy } = filters;
    const searchParams = new URLSearchParams(location.search);
    if (category) searchParams.set("category", category);
    if (sortBy) searchParams.set("sortBy", sortBy);
    searchParams.set("page", "1");
    navigate(`?${searchParams.toString()}`);
  };

  const handleResetFilters = () => {
    navigate("/products");
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      <Navbar />

      <Breadcrumb items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-3 max-w-screen-xl mb-10">
        <FilterBar
          onFilterChange={handleFilterChange}
          category={categoryFilter}
          sortBy={sortBy}
        />

        {paginatedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center col-span-full py-10">
            <p className="text-xl font-semibold text-gray-700 mb-2">
              No Products Found
            </p>
            <p className="text-md text-gray-500 mb-6">
              We couldn't find any products that match your filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
