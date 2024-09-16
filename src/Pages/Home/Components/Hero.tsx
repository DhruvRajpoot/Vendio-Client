import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import heroImage1 from "../../../Assets/Home/Hero/1.png";
import heroImage2 from "../../../Assets/Home/Hero/2.png";
import heroImage3 from "../../../Assets/Home/Hero/3.png";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const slides = [
    {
      image: heroImage1,
      title: "Latest Fashion Trends",
      description: "Handpicked collections for all seasons.",
      buttonText: "Shop Now",
      backgroundColor: "bg-gradient-to-r from-gray-400 to-gray-400",
      overlay: "bg-black/30",
    },
    {
      image: heroImage2,
      title: "Exclusive Accessories",
      description: "Finishing touches to elevate your style.",
      buttonText: "Explore Accessories",
      backgroundColor: "bg-gradient-to-r from-indigo-400 to-purple-500",
      overlay: "bg-black/30",
    },
    {
      image: heroImage3,
      title: "New Footwear Arrivals",
      description: "Step into style with our new arrivals.",
      buttonText: "Browse Footwear",
      backgroundColor: "bg-gradient-to-r from-teal-400 to-teal-500",
      overlay: "bg-black/30",
    },
  ];

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-hero",
          prevEl: ".swiper-button-prev-hero",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="hero-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`relative w-full h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[80vh] flex flex-col lg:flex-row items-center justify-between ${slide.backgroundColor} px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32`}
            >
              {/* Content Section */}
              <div className="relative z-20 text-white flex flex-col justify-center items-center lg:items-start pt-10 lg:pt-0 text-center lg:text-left">
                <h1 className="text-3xl md:text-4xl xl:text-5xl font-extrabold mb-4">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-md md:text-lg lg:text-xl mb-6">
                  {slide.description}
                </p>
                <button
                  className="px-6 sm:px-8 py-2 lg:py-3 rounded-full bg-white text-black font-semibold shadow-lg hover:bg-gray-200 transition duration-300 text-sm md:text-base"
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  {slide.buttonText}
                </button>
              </div>

              {/* Image Section */}
              <div className="w-full lg:w-1/2 h-full flex justify-center lg:justify-end items-center">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full lg:object-bottom 2xl:object-contain"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Arrows */}
        <div className="swiper-button-prev-hero text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-900/50 hover:bg-gray-900">
          <FaArrowLeft />
        </div>
        <div className="swiper-button-next-hero text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-900/50 hover:bg-gray-900">
          <FaArrowRight />
        </div>
      </Swiper>
    </div>
  );
};

export default Hero;
