import React from "react";
import ProductCard from "../../../Components/ProductCard";
import { products } from "../../../Store/products";

const TopProducts: React.FC = () => {
  const topProducts = products.sort(() => Math.random() - 0.5).slice(0, 6);

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-12">
          Our Top Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20">
          {topProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopProducts;
