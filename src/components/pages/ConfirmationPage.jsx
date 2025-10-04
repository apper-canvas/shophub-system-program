import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import orderService from "@/services/api/orderService";

const ConfirmationPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await orderService.getById(orderId);
      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadOrder} />;
  if (!order) return <Error message="Order not found" />;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center"
        >
          <ApperIcon name="CheckCircle" size={48} className="text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-4">Thank you for your purchase</p>
        <p className="text-gray-500">
          Order #{order.Id} • Estimated delivery: {order.estimatedDelivery}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6 mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Details</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-600">Order Number</span>
            <span className="font-semibold text-gray-900">#{order.Id}</span>
          </div>
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-600">Status</span>
            <span className="font-semibold text-green-600">{order.status}</span>
          </div>
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-600">Payment Method</span>
            <span className="font-semibold text-gray-900">{order.paymentMethod}</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
          <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
            <p className="font-medium">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.addressLine1}</p>
            {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
            <p className="mt-2">{order.shippingAddress.phone}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-lg p-6 mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span className="font-medium">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Tax</span>
            <span className="font-medium">${order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Shipping</span>
            <span className="font-medium">
              {order.shipping === 0 ? (
                <span className="text-green-600">FREE</span>
              ) : (
                `$${order.shipping.toFixed(2)}`
              )}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-gray-900">Total</span>
            <span className="text-3xl font-bold text-primary">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex gap-4"
      >
        <Button
          variant="primary"
          className="flex-1"
          onClick={() => navigate("/orders")}
        >
          <ApperIcon name="Package" size={18} className="mr-2" />
          View All Orders
        </Button>
        <Button
          variant="ghost"
          className="flex-1"
          onClick={() => navigate("/")}
        >
          <ApperIcon name="Home" size={18} className="mr-2" />
          Continue Shopping
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center"
      >
        <ApperIcon name="Mail" size={32} className="mx-auto mb-3 text-blue-600" />
        <p className="text-blue-900 font-medium mb-1">Confirmation Email Sent</p>
        <p className="text-blue-700 text-sm">
          We've sent order details and tracking information to your email
        </p>
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;