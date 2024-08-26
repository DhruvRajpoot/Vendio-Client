import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaLock, FaShippingFast, FaHeadset } from "react-icons/fa";
import aboutUsImage from "../../Assets/Images/about.jpg";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const features = [
  {
    icon: FaStar,
    title: "Quality Products",
    description:
      "We offer a range of high-quality products, selected to meet your needs.",
  },
  {
    icon: FaLock,
    title: "Secure Payment",
    description:
      "We ensure secure payment options for a worry-free shopping experience.",
  },
  {
    icon: FaShippingFast,
    title: "Fast Delivery",
    description:
      "Our efficient delivery network ensures your orders reach you quickly.",
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    description:
      "Our dedicated support team is available around the clock to assist you.",
  },
];

const AboutUs: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <div>
      <Navbar />

      <header
        className="relative h-44 xs:h-40 lg:h-52 flex items-center justify-center text-white
      bg-teal-500 overflow-hidden"
      >
        <div className="relative z-10 text-center px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Discover Vendio
          </h1>
          <p className="text-base sm:text-xl mt-2">
            Your Go-To Destination for Seamless Online Shopping
          </p>
          <Link
            to="/products"
            className="text-sm lg:text-base mt-4 inline-block bg-white text-teal-500 font-semibold py-2 px-6 rounded-full transition-colors hover:bg-gray-100 shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </header>

      {/* Our Story Section */}
      <section className="py-8 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="flex flex-col md:flex-row md:w-1/2">
            <div
              className={`rounded-lg shadow-lg w-auto h-[30dvh] md:h-[22rem] overflow-hidden ${
                imageLoaded ? "bg-transparent" : "bg-gray-200 animate-pulse"
              }`}
            >
              <img
                src={aboutUsImage}
                alt="Our Story"
                className={`rounded-lg shadow-lg w-full h-full transition-opacity duration-300 object-cover ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
          <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
            <h2 className="text-2xl text-center font-bold text-gray-900">
              Our Journey
            </h2>
            <p className="text-gray-700 mt-3 leading-relaxed sm:text-lg text-justify md:text-left">
              Vendio started with a simple idea: to make online shopping easier,
              faster, and more enjoyable for everyone. From our humble
              beginnings as a small startup, we've grown into a trusted
              eCommerce platform offering a wide range of products to suit every
              need and preference. Our team is dedicated to curating the best
              products, ensuring exceptional customer service, and providing an
              intuitive shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Why Choose Vendio?
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-teal-500 text-white p-3 rounded-full mb-3 shadow-lg">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 break-keep">
                  {feature.title}
                </h3>
                <p className="text-gray-700 mt-2 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Our Mission & Vision
          </h2>
          <p className="text-gray-700 mt-3 max-w-4xl mx-auto leading-relaxed text-justify md:text-center">
            Our mission is to provide an unparalleled online shopping experience
            by offering a vast selection of products, exceptional customer
            service, and innovative solutions. We envision becoming the leading
            eCommerce platform, known for customer-centricity, innovation, and
            trustworthiness.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mb-6 py-8 px-4 md:px-8 lg:px-16 bg-teal-500 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold">
            Ready to experience the best of online shopping?
          </h2>
          <Link
            to="/products"
            className="text-sm sm:text-base mt-4 inline-block bg-white text-teal-500 font-semibold py-2 px-6 rounded-full transition-colors hover:bg-gray-100 shadow-lg"
          >
            Start Shopping Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
