import React, { useEffect, useMemo, useState, useCallback } from "react";
import ProductCard from "../../Components/ProductCard";
import Navbar from "../../Components/Navbar";
import Breadcrumb from "../../Components/Breadcrumb";
import Footer from "../../Components/Footer";
import FilterBar from "./Components/FilterBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useProduct } from "../../Context/ProductContext";
import SearchBarMobile from "../../Components/SearchBarMobile";

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { products = [] } = useProduct();

  const [currentPage, setCurrentPage] = useState(() => {
    const pageParam = new URLSearchParams(location.search).get("page");
    return pageParam ? parseInt(pageParam, 10) : 1;
  });

  const productsPerPage = 9;

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const categoryFilter = queryParams.get("category") || "All";
  const sortBy = queryParams.get("sortBy") || "Relevancy";
  const searchQuery = queryParams.get("query") || "";

  useEffect(() => {
    const pageParam = parseInt(queryParams.get("page") || "1", 10);
    setCurrentPage(pageParam);
  }, [queryParams]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter((product) =>
        product.categories.includes(categoryFilter)
      );
    }

    // search query filter
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(lowercasedQuery) ||
          product.description.toLowerCase().includes(lowercasedQuery) ||
          product.categories.some((category) =>
            category.toLowerCase().includes(lowercasedQuery)
          )
      );
    }

    // sort logic
    if (sortBy !== "Relevancy") {
      const discountPrice = (product: any) =>
        product.price - (product.price * product.discount) / 100;

      filtered = filtered.sort((a, b) => {
        if (sortBy === "Low to High") {
          return discountPrice(a) - discountPrice(b);
        } else if (sortBy === "High to Low") {
          return discountPrice(b) - discountPrice(a);
        }
        return 0;
      });
    }

    return filtered;
  }, [categoryFilter, sortBy, searchQuery, products]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginatedProducts = useMemo(
    () =>
      filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      ),
    [filteredProducts, currentPage, productsPerPage]
  );

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      if (pageNumber === currentPage) return;
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("page", pageNumber.toString());
      navigate(`?${searchParams.toString()}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [navigate, location.search, currentPage]
  );

  const breadcrumbItems = useMemo(() => {
    const items = [
      { label: "Home", link: "/" },
      { label: "Products", link: "/products" },
    ];

    if (categoryFilter !== "All") {
      items.push({
        label: categoryFilter,
        link: `/products?category=${categoryFilter}`,
      });
    }

    if (searchQuery) {
      items.push({
        label: `"${searchQuery}"`,
        link: `/products?query=${searchQuery}`,
      });
    }

    return items;
  }, [categoryFilter, searchQuery]);

  const handleFilterChange = useCallback(
    (filters: { category: string; sortBy: string }) => {
      const searchParams = new URLSearchParams(location.search);
      if (filters.category) searchParams.set("category", filters.category);
      if (filters.sortBy) searchParams.set("sortBy", filters.sortBy);
      searchParams.set("page", "1");
      navigate(`?${searchParams.toString()}`);
    },
    [navigate, location.search]
  );

  const handleResetFilters = useCallback(() => {
    navigate("/products");
  }, [navigate]);

  return (
    <div className="bg-neutral-50 min-h-screen">
      <Navbar />
      <SearchBarMobile />

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
                <ProductCard key={product._id} product={product} />
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
