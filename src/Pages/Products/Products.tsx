import React from "react";
import ProductCard from "../../Components/ProductCard";
import { products } from "../../Store/products";
import Navbar from "../../Components/Navbar";
import Breadcrumb from "../../Components/Breadcrumb";
import Footer from "../../Components/Footer";

const ProductsPage: React.FC = () => {
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "All Products" },
  ];

  return (
    <div className="bg-neutral-50">
      <Navbar />

      <Breadcrumb items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-3 max-w-screen-xl mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
