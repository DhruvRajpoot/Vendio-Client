import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import logo from "../Assets/Images/logo.png";
import { Link } from "react-router-dom";
import { GrGithub } from "react-icons/gr";

const Footer = () => {
  const quickLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/",
    },
    {
      name: "Products",
      link: "/",
    },
    {
      name: "Help & Support",
      link: "/",
    },
  ];

  const contacts = [
    {
      link: "mailto:dhruvrajpootiiitbhopal@gmail.com",
      icon: <IoMail />,
    },
    {
      link: "https://github.com/DhruvRajpoot/Vendio",
      icon: <GrGithub />,
    },
    {
      link: "https://www.linkedin.com/in/dhruv-rajpoot/",
      icon: <FaLinkedin />,
    },
    {
      link: "",
      icon: <FaInstagram />,
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl md:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
            <img src={logo} alt="Vendio" className="w-12 h-12" />
            <h1 className="text-3xl up font-bold text-white">Vendio</h1>
          </div>
          <p className="text-gray-400">
            Vendio is a modern eCommerce platform offering a seamless online
            shopping experience with intuitive navigation and a wide range of
            products.
          </p>
        </div>

        <div className="flex flex-col items-start md:mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-6 text-left relative">
            Quick Links
            <div className="w-20 h-1 bg-teal-500 absolute -bottom-2 rounded-lg left-0"></div>
          </h2>
          <ul className="space-y-2 text-left">
            {quickLinks.map((link, index) => (
              <li
                key={index}
                className="hover:text-gray-200 cursor-pointer transition-colors"
              >
                <Link to={link.link}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start lg:mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center md:text-left relative">
            Contact Us
            <div className="w-20 h-1 bg-teal-500 absolute -bottom-2 rounded-lg left-0"></div>
          </h2>
          <div className="flex gap-4">
            {contacts.map((contact, index) => (
              <a
                key={index}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors shadow-md transform hover:scale-105"
              >
                {contact.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-6 mt-8 text-center">
        <p className="text-sm text-gray-400 mb-1">
          &copy; 2024 Vendio. All rights reserved.
        </p>

        <a
          href="https://github.com/dhruvrajpoot"
          target="_blank"
          className="text-xs text-gray-500 hover:text-gray-200 transition duration-200"
        >
          Developed by Dhruv Rajpoot
        </a>
      </div>
    </footer>
  );
};

export default Footer;
