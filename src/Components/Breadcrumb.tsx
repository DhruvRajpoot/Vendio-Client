import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="bg-gray-100 py-3 mb-6">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <ul className="flex items-center space-x-4 text-gray-600 overflow-hidden">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.link ? (
                <li className="flex-shrink-0">
                  <Link
                    to={item.link}
                    className="hover:text-teal-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ) : (
                <li className="text-gray-500 font-semibold flex-shrink-0">
                  {item.label}
                </li>
              )}
              {index < items.length - 1 && <li className="text-gray-400">/</li>}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Breadcrumb;
