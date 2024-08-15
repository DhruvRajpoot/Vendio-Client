import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaShoppingBag, FaHome, FaHeart } from "react-icons/fa";

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ReactElement;
}

const sidebarItems: SidebarItem[] = [
  { name: "Profile", path: "/account/profile", icon: <FaUser /> },
  { name: "Orders", path: "/account/orders", icon: <FaShoppingBag /> },
  { name: "Address", path: "/account/address", icon: <FaHome /> },
  { name: "Wishlist", path: "/account/wishlist", icon: <FaHeart /> },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (itemPath: string) => {
    return (
      currentPath === itemPath ||
      (currentPath === "/account" && itemPath === "/account/profile")
    );
  };

  return (
    <aside className="w-64 bg-white px-4 py-6 rounded-lg shadow-lg">
      <nav>
        <ul className="space-y-4">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center p-4 rounded-lg text-gray-700 hover:bg-teal-100 transition-colors ${
                  isActive(item.path)
                    ? "bg-teal-200 hover:bg-teal-200"
                    : ""
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
