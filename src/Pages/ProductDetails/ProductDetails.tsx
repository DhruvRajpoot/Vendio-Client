import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Breadcrumb from "../../Components/Breadcrump";
import Footer from "../../Components/Footer";
import {
  FaStar,
  FaStarHalfAlt,
  FaHeart,
  FaShoppingCart,
  FaShoppingBag,
} from "react-icons/fa";
import { products } from "../../Store/products";
import ProductCard from "../../Components/ProductCard";
import ProductNotFound from "./ProductNotFound";
import { useCart } from "../../Context/CartContext";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const product = products.find((product) => product.id === productId);

  const { addToCart } = useCart();

  if (!product) {
    return <ProductNotFound />;
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(prev + amount, 1));
  };

  const discountedPrice = (
    product.price -
    product.price * (product.discount / 100)
  ).toFixed(2);

  const discountPercentage = product.discount.toFixed(0);

  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const totalStars = 5;

    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }, (_, index) => (
          <FaStar key={index} className="text-yellow-500 text-lg" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500 text-lg" />}
        {Array.from(
          { length: totalStars - fullStars - (hasHalfStar ? 1 : 0) },
          (_, index) => (
            <FaStar key={index} className="text-gray-300 text-lg" />
          )
        )}
      </div>
    );
  };

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Products", link: "/products" },
    { label: product.title },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />

      <section className="container mx-auto px-4 max-w-screen-xl py-12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="mb-4">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-auto h-32 object-cover rounded-lg border border-gray-200 hover:border-teal-500 transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            {/* Wishlist Icon */}
            <div className="flex justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {product.title}
              </h1>

              <button className="w-fit h-fit bg-gray-300 text-gray-800 p-2 rounded-md shadow-lg hover:bg-gray-400">
                <FaHeart size={20} />
              </button>
            </div>

            <div className="flex justify-between items-start mb-4">
              {/* Rating and Stock */}
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2 justify-end">
                  <span className="text-gray-600 bg-green-100 px-3 py-1 rounded-full text-sm">
                    In Stock
                  </span>
                  <div>{renderRating(product.rating)}</div>
                </div>
              </div>
            </div>

            <p className="text-xl text-red-600 font-semibold mb-2">
              ₹{discountedPrice}{" "}
              <span className="line-through text-gray-500 text-lg">
                ₹{product.price}
              </span>{" "}
              <span className="text-green-600 font-semibold">
                ({discountPercentage}% off)
              </span>
            </p>
            <div className="flex items-center mb-4">
              <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
                {product.category}
              </span>
            </div>

            {/* Available Offers */}
            <div className="my-12 bg-gray-100 px-6 py-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Available Offers</h2>
              <ul className="text-sm list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>Bank Offer:</strong> 10% Instant Discount upto ₹500 on
                  first Flipkart Pay Later EMI Transaction.{" "}
                  <span className="text-blue-600">T&C</span>
                </li>
                <li>
                  <strong>Bank Offer:</strong> 5% Cashback on Flipkart Axis Bank
                  Card. <span className="text-blue-600">T&C</span>
                </li>
                <li>
                  <strong>Special Price:</strong> Get extra ₹5000 off (price
                  inclusive of cashback/coupon).{" "}
                  <span className="text-blue-600">T&C</span>
                </li>
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
              >
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 mb-6">
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="bg-teal-600 text-white py-2 px-6 rounded-md shadow-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
              >
                <FaShoppingCart className="text-xl" />
                <span>Add to Cart</span>
              </button>

              {/* Buy Now Button */}
              <button className="bg-orange-600 text-white py-2 px-6 rounded-md shadow-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
                <FaShoppingBag className="text-xl" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="my-12 px-6 py-8 bg-gray-50 shadow-sm rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-300 pb-2">
            Description
          </h2>
          <p className="text-gray-800 leading-relaxed mb-4">
            {product.description}
          </p>
          <p className="text-gray-800 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            lacinia, nisl nec pellentesque luctus, nunc nulla tincidunt nunc,
            nec tempus odio nunc sed massa. Nullam nec quam nec nunc malesuada
            interdum. Nulla facilisi. Donec nec nunc in nunc feugiat lacinia.
            Nullam
          </p>
        </div>

        {/* Product Specifications */}
        <div className="my-12 px-6 py-8 bg-gray-50 shadow-sm rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-300 pb-2">
            Specifications
          </h2>
          <ul className="list-disc list-inside text-gray-800 space-y-3">
            <li>
              <strong className="font-semibold">Material:</strong> Plastic,
              Rubber
            </li>
            <li>
              <strong className="font-semibold">Dimensions:</strong> 6.5 x 4.5 x
              2 inches
            </li>
            <li>
              <strong className="font-semibold">Weight:</strong> 0.5 lbs
            </li>
            <li>
              <strong className="font-semibold">Warranty:</strong> 1 year
            </li>
          </ul>
        </div>

        {/* Related Products */}
        <div className="my-12">
          <h2 className="text-3xl font-semibold text-gray-800 mt-16">
            Related Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {relatedProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetails;
