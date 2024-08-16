import { FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import logo from "../Assets/Images/logo.png";
import { Link } from "react-router-dom";
import { GrGithub } from "react-icons/gr";

const Footer = () => {
  const quickLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "/" },
    { name: "Products", link: "/products" },
    { name: "My Account", link: "/account/profile" },
  ];

  const contacts = [
    { link: "mailto:dhruvrajpootiiitbhopal@gmail.com", icon: <IoMail /> },
    {
      link: "https://github.com/DhruvRajpoot/Vendio-Client",
      icon: <GrGithub />,
    },
    {
      link: "https://www.linkedin.com/in/dhruv-rajpoot/",
      icon: <FaLinkedin />,
    },
    { link: "tel:+919140790309", icon: <FaPhoneAlt /> },
  ];

  return (
    <footer className="bg-white text-gray-800 pt-8 pb-4 px-6 sm:px-10 lg:px-16 2xl:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 lg:gap-16">
        {/* Logo and Description */}
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Vendio" className="w-14 h-14" />
            <h1 className="text-3xl font-bold text-gray-900">Vendio</h1>
          </div>
          <p className="text-gray-600">
            Vendio offers a seamless online shopping experience with a diverse
            range of products, designed to make your shopping easier and
            enjoyable.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:items-center">
          <h2 className="text-xl font-bold text-gray-900 mb-6 relative">
            Quick Links
            <div className="w-20 h-1 bg-teal-500 absolute -bottom-2 rounded-lg left-0"></div>
          </h2>
          <ul className="space-y-3">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.link}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col md:items-center lg:items-start">
          <h2 className="text-xl font-bold text-gray-900 mb-6 relative">
            Contact Us
            <div className="w-20 h-1 bg-teal-500 absolute -bottom-2 rounded-lg left-0"></div>
          </h2>
          <div className="flex space-x-4">
            {contacts.map((contact, index) => (
              <a
                key={index}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors shadow-lg"
              >
                {contact.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col lg:items-start">
          <h2 className="text-xl font-bold text-gray-900 mb-6 relative">
            Stay Updated
            <div className="w-20 h-1 bg-teal-500 absolute -bottom-2 rounded-lg left-0"></div>
          </h2>
          <p className="text-gray-600 mb-4">
            Subscribe to our newsletter to receive updates on new products and
            special offers.
          </p>
          <form className="flex w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 flex-grow border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button className="bg-teal-500 text-white p-2 rounded-r-md hover:bg-teal-600 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 mt-12 text-center">
        <p className="text-sm text-gray-500">
          &copy; 2024 Vendio. All rights reserved.
        </p>
        <a
          href="https://github.com/dhruvrajpoot"
          target="_blank"
          className="text-xs text-gray-400 hover:text-gray-600 transition duration-200"
        >
          Developed by Dhruv Rajpoot
        </a>
      </div>
    </footer>
  );
};

export default Footer;
