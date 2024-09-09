import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import ProductCard from "../../../Components/ProductCard";
import { Product } from "../../../Context/ProductContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface RelatedProductsProps {
  title: string;
  relatedProducts: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  title,
  relatedProducts,
}) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">{title}</h2>
      <div className="relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay, Navigation]}
          autoplay={{ delay: 1500 }}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next-related",
            prevEl: ".swiper-button-prev-related",
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="related-products-swiper"
        >
          {relatedProducts.map((product) => (
            <SwiperSlide key={product._id} className="pb-16">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-prev-related bg-black text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 p-3 flex items-center justify-center shadow-md hover:bg-gray-700 absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <FaArrowLeft />
        </div>
        <div className="swiper-button-next-related bg-black text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 p-3 flex items-center justify-center shadow-md hover:bg-gray-700 absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
