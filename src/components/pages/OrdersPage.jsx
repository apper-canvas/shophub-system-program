import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import orderService from "@/services/api/orderService";
import { format } from "date-fns";

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await orderService.getAll();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status) => {
    const variants = {
      "Processing": "warning",
      "Shipped": "primary",
      "Delivered": "success",
      "Cancelled": "default"
    };
    return variants[status] || "default";
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadOrders} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </motion.div>

      {orders.length === 0 ? (
        <Empty
          icon="Package"
          title="No orders yet"
          message="Start shopping to see your orders here"
          actionLabel="Start Shopping"
          actionPath="/"
        />
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order #{order.Id}</p>
                    <p className="font-semibold text-gray-900">
                      {format(new Date(order.createdAt), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
                <Badge variant={getStatusVariant(order.status)}>
                  {order.status}
                </Badge>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                    <p className="font-semibold text-gray-900">{order.estimatedDelivery}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ApperIcon name="Package" size={16} />
                    <span>{order.items.length} {order.items.length === 1 ? "item" : "items"}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/confirmation/${order.Id}`)}
                  >
                    View Details
                    <ApperIcon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;