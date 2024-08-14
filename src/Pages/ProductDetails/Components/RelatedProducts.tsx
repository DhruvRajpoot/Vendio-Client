import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import ProductCard from "../../../Components/ProductCard";
import { Product } from "../../../Context/CartContext";
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
    <div className="container">
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
          className="related-products-swiper pb-16"
        >
          {relatedProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-prev-related bg-black text-white rounded-full w-12 h-12 p-3 flex items-center justify-center shadow-md hover:bg-gray-700 absolute left-4 2xl:-left-16 top-1/3 z-10 after:content-none">
          <FaArrowLeft />
        </div>
        <div className="swiper-button-next-related bg-black text-white rounded-full w-12 h-12 p-3 flex items-center justify-center shadow-md hover:bg-gray-700 absolute right-4 2xl:-right-16 top-1/3 z-10 after:content-none">
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
