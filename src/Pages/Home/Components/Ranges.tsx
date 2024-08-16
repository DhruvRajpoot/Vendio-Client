import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type RangeItem = {
  title: string;
  imageSrc: string;
};

const ranges: RangeItem[] = [
  {
    title: "Fashion",
    imageSrc: "https://i.imgur.com/QkIa5tT.jpeg",
  },
  {
    title: "Electronics",
    imageSrc: "https://i.imgur.com/ZANVnHE.jpeg",
  },
  {
    title: "Footwear",
    imageSrc: "https://i.imgur.com/hKcMNJs.jpeg",
  },
  {
    title: "Sports",
    imageSrc: "https://i.imgur.com/Ex5x3IU.jpg",
  },
  {
    title: "Furniture",
    imageSrc: "https://i.imgur.com/6wkyyIN.jpeg",
  },
];

const Ranges: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 sm:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
          Explore Our Ranges
        </h2>
        <p className="text-center sm:text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Discover a curated selection of high-quality products across different
          categories, carefully chosen to suit your style and needs.
        </p>
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView="auto"
            navigation={{
              nextEl: ".swiper-button-next-ranges",
              prevEl: ".swiper-button-prev-ranges",
            }}
            pagination={{
              clickable: true,
            }}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            loop
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="ranges-slider"
          >
            {ranges.map((range, index) => (
              <SwiperSlide key={index}>
                <div
                  className="group relative overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105 mx-4 my-8"
                  onClick={() => {
                    navigate("/products?category=" + range.title);
                  }}
                >
                  <img
                    src={range.imageSrc}
                    alt={range.title}
                    className="w-full h-60 object-cover object-center"
                  />
                  <h3 className="text-center text-lg font-medium my-4 px-4">
                    {range.title}
                  </h3>
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                    <span className="text-white text-xl font-semibold">
                      Shop Now
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-prev-ranges bg-black text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 p-3 flex items-center justify-center shadow-md hover:bg-gray-700 absolute left-4 2xl:-left-16 top-1/2 transform -translate-y-1/2 z-10 after:content-none">
            <FaArrowLeft />
          </div>
          <div className="swiper-button-next-ranges bg-black text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 p-3 flex items-center justify-center shadow-md hover:bg-gray-700 absolute right-4 2xl:-right-16 top-1/2 transform -translate-y-1/2 z-10 after:content-none">
            <FaArrowRight />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ranges;
