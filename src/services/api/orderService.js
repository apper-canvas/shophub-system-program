class OrderService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  transformOrder(dbOrder) {
    return {
      Id: dbOrder.Id,
      items: dbOrder.items_c ? JSON.parse(dbOrder.items_c) : [],
      subtotal: parseFloat(dbOrder.subtotal_c) || 0,
      tax: parseFloat(dbOrder.tax_c) || 0,
      shipping: parseFloat(dbOrder.shipping_c) || 0,
      total: parseFloat(dbOrder.total_c) || 0,
      shippingAddress: dbOrder.shipping_address_c ? JSON.parse(dbOrder.shipping_address_c) : {},
      paymentMethod: dbOrder.payment_method_c || '',
      status: dbOrder.status_c || 'Processing',
      createdAt: dbOrder.created_at_c || new Date().toISOString(),
      estimatedDelivery: dbOrder.estimated_delivery_c || ''
    };
  }

  async getAll() {
    try {
      const response = await this.apperClient.fetchRecords('order_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "subtotal_c"}},
          {"field": {"Name": "tax_c"}},
          {"field": {"Name": "shipping_c"}},
          {"field": {"Name": "total_c"}},
          {"field": {"Name": "shipping_address_c"}},
          {"field": {"Name": "payment_method_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "estimated_delivery_c"}}
        ],
        orderBy: [{"fieldName": "created_at_c", "sorttype": "DESC"}]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return (response.data || []).map(o => this.transformOrder(o));
    } catch (error) {
      console.error("Error fetching orders:", error?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const response = await this.apperClient.getRecordById('order_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "subtotal_c"}},
          {"field": {"Name": "tax_c"}},
          {"field": {"Name": "shipping_c"}},
          {"field": {"Name": "total_c"}},
          {"field": {"Name": "shipping_address_c"}},
          {"field": {"Name": "payment_method_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "estimated_delivery_c"}}
        ]
      });

      if (!response.success || !response.data) {
        console.error(response.message || "Order not found");
        throw new Error("Order not found");
      }

      return this.transformOrder(response.data);
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error?.message || error);
      throw error;
    }
  }

  async create(orderData) {
    try {
      const params = {
        records: [{
          items_c: JSON.stringify(orderData.items),
          subtotal_c: orderData.subtotal,
          tax_c: orderData.tax,
          shipping_c: orderData.shipping,
          total_c: orderData.total,
          shipping_address_c: JSON.stringify(orderData.shippingAddress),
          payment_method_c: orderData.paymentMethod,
          status_c: "Processing",
          created_at_c: new Date().toISOString(),
          estimated_delivery_c: orderData.estimatedDelivery
        }]
      };

      const response = await this.apperClient.createRecord('order_c', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create order:`, failed);
          throw new Error(failed[0].message || "Failed to create order");
        }
        
        if (successful.length > 0) {
          return this.transformOrder(successful[0].data);
        }
      }

      throw new Error("Failed to create order");
    } catch (error) {
      console.error("Error creating order:", error?.message || error);
      throw error;
    }
  }

  async calculateTotal(items, shippingMethod = "standard") {
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