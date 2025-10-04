import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import StarRating from "@/components/atoms/StarRating";
import { useCart } from "@/hooks/useCart";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.Id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={handleCardClick}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer group"
    >
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <Badge variant="accent" className="absolute top-3 right-3">
            -{discount}%
          </Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white px-4 py-2 rounded-lg font-semibold text-gray-900">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} size={14} showValue />
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="group-hover:scale-105"
          >
            <ApperIcon name="ShoppingCart" size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;