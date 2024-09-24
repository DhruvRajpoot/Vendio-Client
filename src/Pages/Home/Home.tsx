import Navbar from "../../Components/Navbar";
import Hero from "./Components/Hero";
import TopProducts from "./Components/TopProducts";
import Ranges from "./Components/Ranges";
import UserTestimonials from "./Components/Testimonials";
import Footer from "../../Components/Footer";
// import ScrollingStripe from "../../Components/ScrollingStripe";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      {/* <ScrollingStripe /> */}
      <Hero />
      <Ranges />
      <TopProducts />
      <UserTestimonials />
      <Footer />
    </div>
  );
};

export default Home;
