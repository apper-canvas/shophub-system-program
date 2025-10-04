import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ProductCard from "@/components/molecules/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import productService from "@/services/api/productService";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query) {
      searchProducts();
    }
  }, [query]);

  const searchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const results = await productService.search(query);
      setProducts(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={searchProducts} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <ApperIcon name="Search" size={32} className="text-primary" />
          <h1 className="text-4xl font-bold text-gray-900">
            Search Results
          </h1>
        </div>
        <p className="text-gray-600">
          {products.length} {products.length === 1 ? "result" : "results"} for "{query}"
        </p>
      </motion.div>

      {products.length === 0 ? (
        <Empty
          icon="SearchX"
          title="No results found"
          message={`We couldn't find any products matching "${query}". Try different keywords.`}
          actionLabel="Browse All Products"
          actionPath="/"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;