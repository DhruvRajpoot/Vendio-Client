import React from "react";
import Navbar from "../../Components/Navbar";
import Breadcrumb from "../../Components/Breadcrump";
import Footer from "../../Components/Footer";
import ProductCard from "../../Components/ProductCard"; // Assuming you have this component
import { products } from "../../Store/products";
import Lottie from "lottie-react";
import notFoundAnimation from "../../Assets/Lottie/notfound.json";

const ProductNotFound: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Breadcrumb
        items={[
          { label: "Home", link: "/" },
          { label: "Products", link: "/products" },
          { label: "Product Not Found" },
        ]}
      />
      <main className="flex-grow container mx-auto px-4 max-w-screen-xl pt-0 pb-12">
        <div className="text-center">
          <div className="mx-auto w-96">
            <Lottie animationData={notFoundAnimation} />
          </div>

          <h6 className="text-lg font-semibold text-gray-800">
            The product you are looking for does not exist. Meanwhile, you can
            check out other products.
          </h6>
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mt-16">
          Popular Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductNotFound;
