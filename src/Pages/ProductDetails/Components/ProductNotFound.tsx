import React from "react";
import Navbar from "../../../Components/Navbar";
import Breadcrumb from "../../../Components/Breadcrump";
import Footer from "../../../Components/Footer";
import { products } from "../../../Store/products";
import Lottie from "lottie-react";
import notFoundAnimation from "../../../Assets/Lottie/notfound.json";
import RelatedProducts from "./RelatedProducts";

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

        <div className="mt-8">
          <RelatedProducts
            title="Popular Products"
            relatedProducts={products.slice(0, 6)}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductNotFound;
