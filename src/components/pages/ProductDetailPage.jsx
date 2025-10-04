import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import StarRating from "@/components/atoms/StarRating";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useCart } from "@/hooks/useCart";
import productService from "@/services/api/productService";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await productService.getById(id);
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate("/checkout");
    }
  };

  if (loading) return <Loading type="detail" />;
  if (error) return <Error message={error} onRetry={loadProduct} />;
  if (!product) return <Error message="Product not found" />;

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ApperIcon name="ArrowLeft" size={20} />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </div>
          <div className="flex gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? "border-primary shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              {discount > 0 && (
                <Badge variant="accent" className="text-base px-3 py-1">
                  -{discount}%
                </Badge>
              )}
            </div>
            <p className="text-gray-600 mb-4">{product.brand}</p>
            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={product.rating} size={20} showValue />
              <span className="text-gray-600">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {discount > 0 && (
              <p className="text-green-600 font-medium">
                You save ${(product.originalPrice - product.price).toFixed(2)} ({discount}%)
              </p>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Specifications</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-1">{key}</p>
                  <p className="font-medium text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <ApperIcon name="Minus" size={18} />
              </Button>
              <span className="w-16 text-center text-xl font-semibold">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                <ApperIcon name="Plus" size={18} />
              </Button>
            </div>

            <div className="flex-1 flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ApperIcon name="ShoppingCart" size={18} className="mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                <ApperIcon name="Zap" size={18} className="mr-2" />
                Buy Now
              </Button>
            </div>
          </div>

          {!product.inStock && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-600 font-semibold">Currently Out of Stock</p>
              <p className="text-sm text-red-500 mt-1">Check back soon for availability</p>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-green-600">
              <ApperIcon name="ShieldCheck" size={20} />
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <ApperIcon name="Truck" size={20} />
              <span className="text-sm font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <ApperIcon name="RotateCcw" size={20} />
              <span className="text-sm font-medium">Easy Returns</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailPage;