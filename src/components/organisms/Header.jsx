import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import { useCart } from "@/hooks/useCart";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const categories = [
    { name: "Electronics", icon: "Laptop" },
    { name: "Fashion", icon: "ShoppingBag" },
    { name: "Home", icon: "Home" },
    { name: "Sports", icon: "Dumbbell" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
              <ApperIcon name="ShoppingBag" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ShopHub
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 flex-1 max-w-2xl mx-8">
            <SearchBar className="flex-1" />
          </div>

          <nav className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <Button
                variant="ghost"
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                Categories
                <ApperIcon name="ChevronDown" size={16} className="ml-1" />
              </Button>
              
              <AnimatePresence>
                {categoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onMouseEnter={() => setCategoriesOpen(true)}
                    onMouseLeave={() => setCategoriesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                  >
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        to={`/category/${category.name}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <ApperIcon name={category.icon} size={20} className="text-primary" />
                        <span className="font-medium text-gray-900">{category.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/deals">
              <Button variant="ghost">
                <ApperIcon name="Tag" size={18} className="mr-2" />
                Deals
              </Button>
            </Link>

            <Link to="/orders">
              <Button variant="ghost">
                <ApperIcon name="Package" size={18} className="mr-2" />
                Orders
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="primary" className="relative">
                <ApperIcon name="ShoppingCart" size={18} />
                {getCartCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-accent text-gray-900 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                  >
                    {getCartCount()}
                  </motion.span>
                )}
              </Button>
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-700"
          >
            <ApperIcon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        <div className="lg:hidden pb-4">
          <SearchBar />
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <nav className="px-4 py-4 space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={`/category/${category.name}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <ApperIcon name={category.icon} size={20} className="text-primary" />
                  <span className="font-medium text-gray-900">{category.name}</span>
                </Link>
              ))}
              <Link
                to="/deals"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <ApperIcon name="Tag" size={20} className="text-primary" />
                <span className="font-medium text-gray-900">Deals</span>
              </Link>
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <ApperIcon name="Package" size={20} className="text-primary" />
                <span className="font-medium text-gray-900">Orders</span>
              </Link>
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-lg"
              >
                <ApperIcon name="ShoppingCart" size={20} />
                <span className="font-medium">Cart ({getCartCount()})</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;