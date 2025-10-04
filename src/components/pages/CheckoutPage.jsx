import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useCart } from "@/hooks/useCart";
import orderService from "@/services/api/orderService";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: ""
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const orderData = {
        items: cart.map(item => ({
          productId: item.Id.toString(),
          quantity: item.quantity,
          selectedOptions: {},
          addedAt: new Date().toISOString()
        })),
        subtotal,
        tax,
        shipping,
        total,
        shippingAddress: shippingInfo,
        paymentMethod: `Credit Card ending in ${paymentInfo.cardNumber.slice(-4)}`,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
      };

      const order = await orderService.create(orderData);
      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/confirmation/${order.Id}`);
    } catch (error) {
      toast.error("Failed to process order. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Checkout</h1>
        
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step >= 1 ? "bg-primary text-white" : "bg-gray-200"
            }`}>
              1
            </div>
            <span className="font-medium">Shipping</span>
          </div>
          <div className={`h-0.5 w-12 ${step >= 2 ? "bg-primary" : "bg-gray-300"}`} />
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step >= 2 ? "bg-primary text-white" : "bg-gray-200"
            }`}>
              2
            </div>
            <span className="font-medium">Payment</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleShippingSubmit}
              className="bg-white rounded-lg shadow-lg p-6 space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  required
                  value={shippingInfo.fullName}
                  onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                />
                <Input
                  label="Email"
                  type="email"
                  required
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                />
              </div>

              <Input
                label="Phone Number"
                type="tel"
                required
                value={shippingInfo.phone}
                onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
              />

              <Input
                label="Address Line 1"
                type="text"
                required
                value={shippingInfo.addressLine1}
                onChange={(e) => setShippingInfo({...shippingInfo, addressLine1: e.target.value})}
              />

              <Input
                label="Address Line 2 (Optional)"
                type="text"
                value={shippingInfo.addressLine2}
                onChange={(e) => setShippingInfo({...shippingInfo, addressLine2: e.target.value})}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="City"
                  type="text"
                  required
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                />
                <Input
                  label="State"
                  type="text"
                  required
                  value={shippingInfo.state}
                  onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                />
                <Input
                  label="ZIP Code"
                  type="text"
                  required
                  value={shippingInfo.zipCode}
                  onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                />
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Continue to Payment
                <ApperIcon name="ArrowRight" size={18} className="ml-2" />
              </Button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handlePaymentSubmit}
              className="bg-white rounded-lg shadow-lg p-6 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(1)}
                >
                  <ApperIcon name="ArrowLeft" size={18} className="mr-2" />
                  Back
                </Button>
              </div>

              <Input
                label="Card Number"
                type="text"
                required
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                value={paymentInfo.cardNumber}
                onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
              />

              <Input
                label="Cardholder Name"
                type="text"
                required
                value={paymentInfo.cardName}
                onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  type="text"
                  required
                  placeholder="MM/YY"
                  maxLength={5}
                  value={paymentInfo.expiryDate}
                  onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                />
                <Input
                  label="CVV"
                  type="text"
                  required
                  placeholder="123"
                  maxLength={4}
                  value={paymentInfo.cvv}
                  onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <ApperIcon name="ShieldCheck" size={24} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900 mb-1">Secure Payment</p>
                    <p className="text-sm text-blue-700">Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={processing}
              >
                {processing ? (
                  <>Processing...</>
                ) : (
                  <>
                    Place Order
                    <ApperIcon name="Check" size={18} className="ml-2" />
                  </>
                )}
              </Button>
            </motion.form>
          )}
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 sticky top-24"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.Id} className="flex gap-3">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900 line-clamp-1">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
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
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;