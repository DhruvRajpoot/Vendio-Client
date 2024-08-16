import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import personImage1 from "../../../Assets/Home/Hero/1.png";
import personImage2 from "../../../Assets/Home/Hero/2.png";
import personImage3 from "../../../Assets/Home/Hero/3.png";

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    image: personImage1,
    rating: 5,
    feedback:
      "This product exceeded my expectations! The quality is fantastic.",
  },
  {
    id: 2,
    name: "Taylor Smith",
    image: personImage2,
    rating: 4.5,
    feedback:
      "Great product, really well made. Customer service was also top-notch.",
  },
  {
    id: 3,
    name: "Emily Johnson",
    image: personImage3,
    rating: 4,
    feedback:
      "Solid product overall. A bit of a delay in shipping, but customer service was helpful.",
  },
  {
    id: 4,
    name: "Michael Brown",
    image: personImage1,
    rating: 5,
    feedback:
      "Absolutely love this! Will be recommending to my friends and family.",
  },
  {
    id: 5,
    name: "Sophia White",
    image: personImage2,
    rating: 4.5,
    feedback:
      "High quality and great value for the price. Very happy with my purchase.",
  },
];

const renderRating = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const totalStars = 5;

  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: fullStars }, (_, index) => (
        <FaStar key={index} className="text-yellow-500 text-lg" />
      ))}
      {hasHalfStar && <FaStar className="text-yellow-500 text-lg" />}
      {Array.from(
        { length: totalStars - fullStars - (hasHalfStar ? 1 : 0) },
        (_, index) => (
          <FaStar key={index} className="text-gray-300 text-lg" />
        )
      )}
    </div>
  );
};

const UserTestimonials = () => {
  return (
    <section className="py-10 sm:py-16 bg-gradient-to-r from-[#ddedf0] to-[#D0E0E3]">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <h2 className="text-center text-2xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-12">
          What Our Customers Are Saying
        </h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={40}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 1500 }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="testimonialswiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8 flex flex-col items-center text-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 object-cover rounded-full mb-4 border-4 border-teal-200"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {testimonial.name}
                </h3>
                <div className="my-3">{renderRating(testimonial.rating)}</div>
                <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default UserTestimonials;
