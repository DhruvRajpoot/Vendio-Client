import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import personImage1 from "../../../Assets/Home/Hero/1.png";
import personImage2 from "../../../Assets/Home/Hero/2.png";
import personImage3 from "../../../Assets/Home/Hero/3.png";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const slides = [
    {
      image: personImage1,
      title: "Men's Collection",
      description:
        "Discover top brands in shirts, jackets, watches, and accessories for the modern man.",
      buttonText: "Shop Now",
      backgroundColor: "bg-[#F7F3F0]",
      textColor: "text-black",
      buttonColor: "bg-black text-white",
    },
    {
      image: personImage2,
      title: "Exclusive Deals",
      description:
        "Take advantage of limited-time discounts on premium brands and products.",
      buttonText: "Discover Now",
      backgroundColor: "bg-[#E8E8E8]",
      textColor: "text-black",
      buttonColor: "bg-red-600 text-white",
    },
    {
      image: personImage3,
      title: "New Arrivals",
      description:
        "Check out the latest trends and new styles just in for a fresh wardrobe update.",
      buttonText: "Explore",
      backgroundColor: "bg-[#F0F8FF]",
      textColor: "text-blue-900",
      buttonColor: "bg-blue-600 text-white",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-hero",
          prevEl: ".swiper-button-prev-hero",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        loop
        className="hero-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`w-full h-[70vh] md:h-[80vh] ${slide.backgroundColor} flex items-center justify-center`}
            >
              <div className="flex flex-col lg:flex-row items-center h-full max-w-screen-xl mx-auto px-4">
                <div className="flex flex-col items-center lg:items-start lg:text-left flex-1 mb-6 lg:mb-0 pt-16 text-center lg:pl-20 xl:pl-0">
                  <h1
                    className={`text-3xl md:text-5xl font-bold ${slide.textColor} mb-4`}
                  >
                    {slide.title}
                  </h1>
                  <p className={`text-sm md:text-lg ${slide.textColor} mb-6`}>
                    {slide.description}
                  </p>
                  <button
                    className={`px-6 py-3 rounded-full shadow-lg transition duration-300 ${slide.buttonColor} hover:opacity-90`}
                    onClick={() => {
                      navigate("/products");
                    }}
                  >
                    {slide.buttonText}
                  </button>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full h-full relative">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev-hero bg-black text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-md hover:bg-gray-700 absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <FaArrowLeft />
        </div>
        <div className="swiper-button-next-hero bg-black text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-md hover:bg-gray-700 absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
          <FaArrowRight />
        </div>
      </Swiper>
    </div>
  );
};

export default Hero;
