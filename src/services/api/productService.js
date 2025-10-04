class ProductService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  transformProduct(dbProduct) {
    return {
      Id: dbProduct.Id,
      name: dbProduct.name_c || '',
      category: dbProduct.category_c?.Name || '',
      subcategory: dbProduct.subcategory_c || '',
      price: parseFloat(dbProduct.price_c) || 0,
      originalPrice: dbProduct.original_price_c ? parseFloat(dbProduct.original_price_c) : null,
      rating: parseFloat(dbProduct.rating_c) || 0,
      reviewCount: parseInt(dbProduct.review_count_c) || 0,
      images: dbProduct.images_c ? JSON.parse(dbProduct.images_c) : [],
      description: dbProduct.description_c || '',
      specifications: dbProduct.specifications_c ? JSON.parse(dbProduct.specifications_c) : {},
      inStock: dbProduct.in_stock_c || false,
      stockCount: parseInt(dbProduct.stock_count_c) || 0,
      brand: dbProduct.brand_c || '',
      tags: dbProduct.tags_c ? dbProduct.tags_c.split(',') : []
    };
  }

  async getAll() {
    try {
      const response = await this.apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"name": "category_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "specifications_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "tags_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return (response.data || []).map(p => this.transformProduct(p));
    } catch (error) {
      console.error("Error fetching products:", error?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const response = await this.apperClient.getRecordById('product_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"name": "category_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "specifications_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "tags_c"}}
        ]
      });

      if (!response.success || !response.data) {
        console.error(response.message || "Product not found");
        throw new Error("Product not found");
      }

      return this.transformProduct(response.data);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error?.message || error);
      throw error;
    }
  }

  async getByCategory(category) {
    try {
      const response = await this.apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"name": "category_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: [
          {
            "FieldName": "category_c",
            "Operator": "Contains",
            "Values": [category]
          }
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return (response.data || []).map(p => this.transformProduct(p));
    } catch (error) {
      console.error("Error fetching products by category:", error?.message || error);
      return [];
    }
  }

  async search(query) {
    try {
      const response = await this.apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"name": "category_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {"fieldName": "name_c", "operator": "Contains", "values": [query]}
              ],
              "operator": ""
            },
            {
              "conditions": [
                {"fieldName": "description_c", "operator": "Contains", "values": [query]}
              ],
              "operator": ""
            },
            {
              "conditions": [
                {"fieldName": "tags_c", "operator": "Contains", "values": [query]}
              ],
              "operator": ""
            }
          ]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return (response.data || []).map(p => this.transformProduct(p));
    } catch (error) {
      console.error("Error searching products:", error?.message || error);
      return [];
    }
  }

  async filterProducts(filters) {
    try {
      const where = [];
      
      if (filters.category) {
        where.push({
          "FieldName": "category_c",
          "Operator": "Contains",
          "Values": [filters.category]
        });
      }

      if (filters.subcategory) {
        where.push({
          "FieldName": "subcategory_c",
          "Operator": "EqualTo",
          "Values": [filters.subcategory]
        });
      }

      if (filters.minPrice !== undefined) {
        where.push({
          "FieldName": "price_c",
          "Operator": "GreaterThanOrEqualTo",
          "Values": [filters.minPrice.toString()]
        });
      }

      if (filters.maxPrice !== undefined) {
        where.push({
          "FieldName": "price_c",
          "Operator": "LessThanOrEqualTo",
          "Values": [filters.maxPrice.toString()]
        });
      }

      if (filters.minRating !== undefined) {
        where.push({
          "FieldName": "rating_c",
          "Operator": "GreaterThanOrEqualTo",
          "Values": [filters.minRating.toString()]
        });
      }

      if (filters.inStock !== undefined) {
        where.push({
          "FieldName": "in_stock_c",
          "Operator": "EqualTo",
          "Values": [filters.inStock ? "1" : "0"]
        });
      }

      const orderBy = [];
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "price-low":
            orderBy.push({"fieldName": "price_c", "sorttype": "ASC"});
            break;
          case "price-high":
            orderBy.push({"fieldName": "price_c", "sorttype": "DESC"});
            break;
          case "rating":
            orderBy.push({"fieldName": "rating_c", "sorttype": "DESC"});
            break;
          case "name":
            orderBy.push({"fieldName": "name_c", "sorttype": "ASC"});
            break;
        }
      }

      const response = await this.apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"name": "category_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where,
        orderBy
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return (response.data || []).map(p => this.transformProduct(p));
    } catch (error) {
      console.error("Error filtering products:", error?.message || error);
      return [];
    }
  }

  async getFeatured(count = 6) {
    try {
      const response = await this.apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"name": "category_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: [
          {
            "FieldName": "rating_c",
            "Operator": "GreaterThanOrEqualTo",
            "Values": ["4.5"]
          }
        ],
        orderBy: [{"fieldName": "rating_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": count, "offset": 0}
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return (response.data || []).map(p => this.transformProduct(p));
    } catch (error) {
      console.error("Error fetching featured products:", error?.message || error);
      return [];
    }
  }

  async getDeals(count = 6) {
    try {
      const response = await this.apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"name": "category_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: [
          {
            "FieldName": "original_price_c",
            "Operator": "HasValue",
            "Values": []
          }
        ],
        pagingInfo: {"limit": count, "offset": 0}
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return (response.data || []).filter(p => {
        const original = parseFloat(p.original_price_c);
        const current = parseFloat(p.price_c);
        return original > current;
      }).map(p => this.transformProduct(p));
    } catch (error) {
      console.error("Error fetching deals:", error?.message || error);
      return [];
    }
  }
}

export default new ProductService();