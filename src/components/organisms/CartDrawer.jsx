import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import CartItem from "@/components/molecules/CartItem";
import Empty from "@/components/ui/Empty";
import { useCart } from "@/hooks/useCart";

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ApperIcon name="X" size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex items-center">
                  <Empty
                    icon="ShoppingCart"
                    title="Your cart is empty"
                    message="Add some products to get started"
                    actionLabel="Start Shopping"
                    actionPath="/"
                  />
                </div>
              ) : (
                cart.map((item) => (
                  <CartItem
                    key={item.Id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-white space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold text-gray-700">Subtotal:</span>
                  <span className="text-2xl font-bold text-primary">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <ApperIcon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;