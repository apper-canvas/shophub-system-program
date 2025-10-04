import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import CartItem from "@/components/molecules/CartItem";
import Empty from "@/components/ui/Empty";
import { useCart } from "@/hooks/useCart";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Empty
          icon="ShoppingCart"
          title="Your cart is empty"
          message="Add some products to get started with your shopping"
          actionLabel="Start Shopping"
          actionPath="/"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">{cart.length} {cart.length === 1 ? "item" : "items"} in your cart</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <CartItem
              key={item.Id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 sticky top-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              {subtotal < 50 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <ApperIcon name="Info" size={14} className="inline mr-1" />
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-3xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full mb-3"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
              <ApperIcon name="ArrowRight" size={18} className="ml-2" />
            </Button>
            
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>

            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ApperIcon name="ShieldCheck" size={16} className="text-green-600" />
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ApperIcon name="Truck" size={16} className="text-blue-600" />
                <span>Free shipping over $50</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ApperIcon name="RotateCcw" size={16} className="text-purple-600" />
                <span>30-day return policy</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;