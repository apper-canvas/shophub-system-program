import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ProductCard from "@/components/molecules/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import productService from "@/services/api/productService";

const DealsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      setLoading(true);
      setError("");
      const deals = await productService.getDeals(12);
      setProducts(deals);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDeals} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-r from-accent via-yellow-400 to-orange-400 rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ApperIcon name="Flame" size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Hot Deals</h1>
              <p className="text-white/90 text-lg">Limited time offers - Up to 40% off!</p>
            </div>
          </div>
        </div>
      </motion.div>

      {products.length === 0 ? (
        <Empty
          icon="Tag"
          title="No deals available"
          message="Check back soon for exciting offers"
          actionLabel="Browse Products"
          actionPath="/"
        />
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            {products.length} amazing {products.length === 1 ? "deal" : "deals"} available now
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.Id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DealsPage;