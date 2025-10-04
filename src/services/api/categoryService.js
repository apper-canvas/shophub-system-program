import React from "react";
import Error from "@/components/ui/Error";
class CategoryService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  transformCategory(dbCategory) {
    return {
      Id: dbCategory.Id,
      name: dbCategory.name_c || '',
      icon: dbCategory.icon_c || 'Package',
      productCount: parseInt(dbCategory.product_count_c) || 0,
      parentId: dbCategory.parent_id_c?.Id || null
    };
  }

  async getAll() {
    try {
      const response = await this.apperClient.fetchRecords('category_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "icon_c"}},
          {"field": {"Name": "product_count_c"}},
          {"field": {"name": "parent_id_c"}, "referenceField": {"field": {"Name": "Id"}}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return (response.data || []).map(c => this.transformCategory(c));
    } catch (error) {
      console.error("Error fetching categories:", error?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const response = await this.apperClient.getRecordById('category_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "icon_c"}},
          {"field": {"Name": "product_count_c"}},
          {"field": {"name": "parent_id_c"}, "referenceField": {"field": {"Name": "Id"}}}
        ]
      });

      if (!response.success || !response.data) {
        console.error(response.message || "Category not found");
        throw new Error("Category not found");
      }

      return this.transformCategory(response.data);
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error?.message || error);
      throw error;
    }
  }

  async getMainCategories() {
    try {
      const response = await this.apperClient.fetchRecords('category_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "icon_c"}},
          {"field": {"Name": "product_count_c"}},
          {"field": {"name": "parent_id_c"}, "referenceField": {"field": {"Name": "Id"}}}
        ],
        where: [
          {
            "FieldName": "parent_id_c",
            "Operator": "DoesNotHaveValue",
            "Values": []
          }
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return (response.data || []).map(c => this.transformCategory(c));
    } catch (error) {
      console.error("Error fetching main categories:", error?.message || error);
      return [];
    }
  }

  async getSubcategories(parentId) {
    try {
      const response = await this.apperClient.fetchRecords('category_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "icon_c"}},
          {"field": {"Name": "product_count_c"}},
          {"field": {"name": "parent_id_c"}, "referenceField": {"field": {"Name": "Id"}}}
        ],
        where: [
          {
            "FieldName": "parent_id_c",
            "Operator": "EqualTo",
            "Values": [parseInt(parentId)]
          }
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return (response.data || []).map(c => this.transformCategory(c));
    } catch (error) {
      console.error("Error fetching subcategories:", error?.message || error);
      return [];
    }
  }

  async getCategoryTree() {
    try {
      const allCategories = await this.getAll();
      const mainCategories = allCategories.filter(c => c.parentId === null);
      
      return mainCategories.map(parent => ({
        ...parent,
        subcategories: allCategories.filter(c => c.parentId === parent.Id)
      }));
    } catch (error) {
      console.error("Error fetching category tree:", error?.message || error);
      return [];
}
  }
}

export default new CategoryService();