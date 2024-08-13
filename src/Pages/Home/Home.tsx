import Navbar from "../../Components/Navbar";
import Hero from "./Components/Hero";
import TopProducts from "./Components/TopProducts";
import Ranges from "./Components/Ranges";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Ranges />
      <TopProducts />
    </div>
  );
};

export default Home;
