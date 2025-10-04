import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  const footerLinks = {
    "Shop": [
      { label: "Electronics", path: "/category/Electronics" },
      { label: "Fashion", path: "/category/Fashion" },
      { label: "Home", path: "/category/Home" },
      { label: "Sports", path: "/category/Sports" }
    ],
    "Customer Service": [
      { label: "Contact Us", path: "#" },
      { label: "Shipping Info", path: "#" },
      { label: "Returns", path: "#" },
      { label: "FAQs", path: "#" }
    ],
    "Company": [
      { label: "About Us", path: "#" },
      { label: "Careers", path: "#" },
      { label: "Press", path: "#" },
      { label: "Blog", path: "#" }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
                <ApperIcon name="ShoppingBag" size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold">ShopHub</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for quality products at amazing prices.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <ApperIcon name="Facebook" size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <ApperIcon name="Twitter" size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <ApperIcon name="Instagram" size={20} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;