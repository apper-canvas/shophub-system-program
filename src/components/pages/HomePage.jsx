import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ProductCard from "@/components/molecules/ProductCard";
import CategoryCard from "@/components/molecules/CategoryCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import productService from "@/services/api/productService";
import categoryService from "@/services/api/categoryService";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [dealProducts, setDealProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [featured, deals, cats] = await Promise.all([
        productService.getFeatured(4),
        productService.getDeals(4),
        categoryService.getMainCategories()
      ]);
      setFeaturedProducts(featured);
      setDealProducts(deals);
      setCategories(cats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary via-orange-500 to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to ShopHub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Discover amazing products at unbeatable prices
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/category/Electronics">
                <Button variant="accent" size="lg">
                  <ApperIcon name="Zap" size={20} className="mr-2" />
                  Shop Electronics
                </Button>
              </Link>
              <Link to="/deals">
                <Button variant="ghost" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-2 border-white">
                  <ApperIcon name="Tag" size={20} className="mr-2" />
                  View Deals
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
              <p className="text-gray-600">Find what you're looking for</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked favorites for you</p>
            </div>
            <Link to="/category/Electronics">
              <Button variant="ghost">
                View All
                <ApperIcon name="ArrowRight" size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-accent to-yellow-400 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-gray-900">
              <h2 className="text-3xl font-bold mb-2">Today's Hot Deals</h2>
              <p className="text-lg">Save up to 40% on selected items</p>
            </div>
            <Link to="/deals">
              <Button variant="ghost" size="lg" className="bg-white hover:bg-gray-100 text-gray-900">
                <ApperIcon name="Flame" size={20} className="mr-2" />
                Shop Deals
              </Button>
            </Link>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Special Offers</h2>
              <p className="text-gray-600">Limited time deals you don't want to miss</p>
            </div>
            <Link to="/deals">
              <Button variant="ghost">
                View All
                <ApperIcon name="ArrowRight" size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dealProducts.map((product, index) => (
              <motion.div
                key={product.Id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <ApperIcon name="Truck" size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Free Shipping</h3>
            <p className="text-gray-600">On orders over $50</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <ApperIcon name="ShieldCheck" size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Payment</h3>
            <p className="text-gray-600">100% secure transactions</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <ApperIcon name="RotateCcw" size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Returns</h3>
            <p className="text-gray-600">30-day return policy</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;