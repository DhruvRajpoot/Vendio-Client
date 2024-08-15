import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";

const Custom404Page = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 text-gray-900 p-8">
        <div className="text-center max-w-lg mx-auto">
          <h1 className="text-7xl font-extrabold mb-4 text-gray-900 animate-bounce">
            404
          </h1>
          <h2 className="text-3xl mb-4 font-light text-gray-700">
            Page Not Found
          </h2>
          <p className="text-lg mb-8 text-gray-600">
            Sorry, but the page you are looking for doesn't exist. <br />{" "}
            Meanwhile, you can check out our new products.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link
              to="/products"
              className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom404Page;
