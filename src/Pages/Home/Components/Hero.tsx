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

const Hero: React.FC = () => {
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
    <div className="w-full relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        loop
        className="hero-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`w-full h-[500px] ${slide.backgroundColor} flex items-center justify-center`}
            >
              <div className="flex flex-col md:flex-row items-center h-full max-w-screen-xl mx-auto">
                <div className="flex flex-col justify-center md:text-left p-4 md:pl-8 flex-1">
                  <h1
                    className={`text-4xl md:text-5xl font-bold ${slide.textColor}`}
                  >
                    {slide.title}
                  </h1>
                  <p className={`text-lg md:text-xl mt-4 ${slide.textColor}`}>
                    {slide.description}
                  </p>
                  <button
                    className={`mt-6 px-8 py-4 w-fit rounded-full shadow-lg transition duration-300 ${slide.buttonColor} hover:opacity-90`}
                  >
                    {slide.buttonText}
                  </button>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full h-full relative">
                    <img
                      src={slide.image}
                      alt="Person"
                      className="w-full h-full object-none object-bottom"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev bg-black text-white rounded-full w-10 h-10 p-2.5 flex items-center justify-center shadow-md hover:bg-gray-700 absolute left-4 top-1/2 transform -translate-y-1/2 z-10 after:content-none">
          <FaArrowLeft />
        </div>
        <div className="swiper-button-next bg-black text-white rounded-full w-10 h-10 p-2.5 flex items-center justify-center shadow-md hover:bg-gray-700 absolute right-4 top-1/2 transform -translate-y-1/2 z-10 after:content-none">
          <FaArrowRight />
        </div>
      </Swiper>
    </div>
  );
};

export default Hero;
