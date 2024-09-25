import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Breadcrumb from "../../Components/Breadcrumb";
import Footer from "../../Components/Footer";
import {
  FaStar,
  FaStarHalfAlt,
  FaHeart,
  FaShoppingCart,
  FaShoppingBag,
} from "react-icons/fa";
import ProductNotFound from "./Components/ProductNotFound";
import { useCart } from "../../Context/CartContext";
import RelatedProducts from "./Components/RelatedProducts";
import { useWishlist } from "../../Context/WishlistContext";
import { useProduct } from "../../Context/ProductContext";
import SearchBarMobile from "../../Components/SearchBarMobile";

const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = id || "";
  const { products = [] } = useProduct(); // Ensure products is always an array

  // Find the product by ID
  const product = products.find((product) => product._id === productId);

  if (!product) {
    return <ProductNotFound />;
  }

  const { addToCart, cartItems } = useCart();
  const { checkInWishlist, handleWishlistClick } = useWishlist();

  // Filter related products based on categories
  const relatedProducts = products.filter(
    (p) =>
      p.categories.some((category) => product.categories.includes(category)) &&
      p._id !== product._id
  );

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  useEffect(() => {
    setSelectedImage(product.images[0]);
  }, [productId]);

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(prev + amount, 1));
  };

  const discountPercentage = product.discount;

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

  const specifications = [
    {
      label: "Material",
      value: "High-quality materials used for durability and longevity.",
    },
    {
      label: "Dimensions",
      value: "Varies by product. Please refer to the specific product details.",
    },
    {
      label: "Weight",
      value: "Lightweight and easy to handle.",
    },
    {
      label: "Warranty",
      value: "Typically includes a manufacturer's warranty for peace of mind.",
    },
    {
      label: "Color Options",
      value: "Available in multiple colors to suit different preferences.",
    },
    {
      label: "Compatibility",
      value: "Designed to be compatible with various devices and systems.",
    },
    {
      label: "Features",
      value:
        "Includes standard features such as adjustable settings, ergonomic design, etc.",
    },
    {
      label: "Care Instructions",
      value: "Easy to clean and maintain with standard cleaning methods.",
    },
  ];

  const isItemInCart = (productId: string) => {
    return cartItems.some((item) => item.product._id === productId);
  };

  const handleAddToCart = () => {
    if (isItemInCart(product._id)) {
      navigate("/cart");
      return;
    }
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    if (!isItemInCart(product._id)) addToCart(product, quantity);
    navigate("/cart");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchBarMobile />
      <Breadcrumb items={breadcrumbItems} />

      <section className="container mx-auto px-4 max-w-screen-xl py-5 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="mb-4">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>
            {/* Thumbnails */}
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-auto h-auto max-h-20 sm:max-h-24 lg:max-h-32 object-cover rounded-lg border border-gray-200 hover:border-teal-500 transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            {/* Wishlist Icon */}
            <div className="flex gap-2 justify-between mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {product.title}
              </h1>

              <button
                className={`w-fit h-fit p-2 rounded-md shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out ${
                  checkInWishlist(product._id)
                    ? "bg-red-100 text-red-500 hover:bg-red-200"
                    : "bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-600"
                }`}
                onClick={() => {
                  handleWishlistClick(product._id);
                }}
              >
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
              ₹{product.discountedPrice}{" "}
              <span className="line-through text-gray-500 text-lg">
                ₹{product.price}
              </span>{" "}
              <span className="text-green-600 font-semibold">
                ({discountPercentage}% off)
              </span>
            </p>
            <div className="flex items-center mb-4">
              {product.categories.map((category, index) => (
                <span
                  className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm"
                  key={index}
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Available Offers */}
            <div className="my-12 bg-gray-100 px-6 py-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Available Offers</h2>
              <ul className="text-sm list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>Special Price:</strong> Get extra 10% off using code -{" "}
                  <strong>SAVE 10</strong> .{" "}
                  <span className="text-blue-600">T&C</span>
                </li>
                <li>
                  <strong>Bank Offer:</strong> 10% Instant Discount upto ₹500 on
                  first EMI Transaction.{" "}
                  <span className="text-blue-600">T&C</span>
                </li>
                <li>
                  <strong>Bank Offer:</strong> 5% Cashback on Axis Bank Card.{" "}
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
                <span>
                  {isItemInCart(product._id) ? "View Cart" : "Add to Cart"}
                </span>
              </button>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="bg-orange-600 text-white py-2 px-6 rounded-md shadow-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
              >
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
            {specifications.map((spec, index) => (
              <li key={index}>
                <strong className="font-semibold">{spec.label}:</strong>{" "}
                {spec.value}
              </li>
            ))}
          </ul>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts
            title="Related Products"
            relatedProducts={relatedProducts}
          />
        )}
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetails;
