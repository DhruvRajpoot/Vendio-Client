import React from "react";
import { FaTag } from "react-icons/fa";

const ScrollingStripe: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-teal-800 text-white py-2">
      <div className="flex items-center gap-20 whitespace-nowrap animate-marquee">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-6 py-1 bg-teal-700 rounded-full shadow-lg"
          >
            <FaTag className="sm:text-xl text-yellow-300 animate-pulse" />
            <span className="text-sm sm:text-base font-bold tracking-wide">
              Save 10% more with{" "}
              <span className="font-extrabold text-yellow-400">"SAVE10"</span> –
              Limited time offer!
            </span>
            <FaTag className="sm:text-xl text-yellow-300 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingStripe;
