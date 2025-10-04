import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-4 p-4 bg-white rounded-lg shadow-sm"
    >
      <img
        src={item.images[0]}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
        <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onUpdateQuantity(item.Id, item.quantity - 1)}
          >
            <ApperIcon name="Minus" size={14} />
          </Button>
          <span className="w-10 text-center font-medium">{item.quantity}</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onUpdateQuantity(item.Id, item.quantity + 1)}
          >
            <ApperIcon name="Plus" size={14} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onRemove(item.Id)}
          className="text-red-600 hover:bg-red-50"
        >
          <ApperIcon name="Trash2" size={16} />
        </Button>
        <p className="text-lg font-bold text-primary">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
};

export default CartItem;