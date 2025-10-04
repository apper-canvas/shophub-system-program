import ordersData from "../mockData/orders.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class OrderService {
  constructor() {
    this.orders = [...ordersData];
  }

  async getAll() {
    await delay(300);
    return [...this.orders];
  }

  async getById(id) {
    await delay(200);
    const order = this.orders.find(o => o.Id === parseInt(id));
    if (!order) {
      throw new Error("Order not found");
    }
    return { ...order };
  }

  async create(orderData) {
    await delay(400);
    const newOrder = {
      Id: Math.max(...this.orders.map(o => o.Id), 0) + 1,
      ...orderData,
      status: "Processing",
      createdAt: new Date().toISOString(),
    };
    this.orders.push(newOrder);
    return { ...newOrder };
  }

  async calculateTotal(items, shippingMethod = "standard") {
    await delay(200);
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const shipping = shippingMethod === "express" ? 19.99 : 9.99;
    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      shipping,
      total: parseFloat((subtotal + tax + shipping).toFixed(2))
    };
  }
}

export default new OrderService();