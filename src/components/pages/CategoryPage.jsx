import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ProductCard from "@/components/molecules/ProductCard";
import FilterPanel from "@/components/organisms/FilterPanel";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import productService from "@/services/api/productService";

const CategoryPage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    category: category,
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined,
    inStock: undefined,
    sortBy: searchParams.get("sort") || "name"
  });

  useEffect(() => {
    loadProducts();
  }, [category, filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const filtered = await productService.filterProducts(filters);
      setProducts(filtered);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (sortBy) => {
    setFilters(prev => ({ ...prev, sortBy }));
    setSearchParams({ sort: sortBy });
  };

  const handleClearFilters = () => {
    setFilters({
      category: category,
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
      inStock: undefined,
      sortBy: "name"
    });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProducts} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{category}</h1>
        <p className="text-gray-600">{products.length} products found</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 shrink-0">
          <div className="lg:hidden mb-4">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setShowFilters(!showFilters)}
            >
              <ApperIcon name="SlidersHorizontal" size={18} className="mr-2" />
              {showFilters ? "Hide" : "Show"} Filters
            </Button>
          </div>
          
          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={handleClearFilters}
            />
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-600">
              Showing {products.length} {products.length === 1 ? "product" : "products"}
            </p>
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {products.length === 0 ? (
            <Empty
              icon="Search"
              title="No products found"
              message="Try adjusting your filters or browse other categories"
              actionLabel="Clear Filters"
              actionPath="#"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;