import Navbar from "../../Components/Navbar";
import Hero from "./Components/Hero";
import TopProducts from "./Components/TopProducts";
import Ranges from "./Components/Ranges";
import UserTestimonials from "./Components/Testimonials";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Ranges />
      <TopProducts />
      <UserTestimonials />
    </div>
  );
};

export default Home;
