import productsData from "../mockData/products.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ProductService {
  constructor() {
    this.products = [...productsData];
  }

  async getAll() {
    await delay(300);
    return [...this.products];
  }

  async getById(id) {
    await delay(200);
    const product = this.products.find(p => p.Id === parseInt(id));
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  }

  async getByCategory(category) {
    await delay(300);
    return this.products.filter(p => p.category === category).map(p => ({ ...p }));
  }

  async getBySubcategory(subcategory) {
    await delay(300);
    return this.products.filter(p => p.subcategory === subcategory).map(p => ({ ...p }));
  }

  async search(query) {
    await delay(250);
    const lowerQuery = query.toLowerCase();
    return this.products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    ).map(p => ({ ...p }));
  }

  async filterProducts(filters) {
    await delay(300);
    let filtered = [...this.products];

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.subcategory) {
      filtered = filtered.filter(p => p.subcategory === filters.subcategory);
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }

    if (filters.minRating !== undefined) {
      filtered = filtered.filter(p => p.rating >= filters.minRating);
    }

    if (filters.inStock !== undefined) {
      filtered = filtered.filter(p => p.inStock === filters.inStock);
    }

    if (filters.sortBy) {
      filtered = this.sortProducts(filtered, filters.sortBy);
    }

    return filtered.map(p => ({ ...p }));
  }

  sortProducts(products, sortBy) {
    const sorted = [...products];
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }

  async getFeatured(count = 6) {
    await delay(250);
    return this.products
      .filter(p => p.rating >= 4.5)
      .slice(0, count)
      .map(p => ({ ...p }));
  }

  async getDeals(count = 6) {
    await delay(250);
    return this.products
      .filter(p => p.originalPrice && p.originalPrice > p.price)
      .slice(0, count)
      .map(p => ({ ...p }));
  }
}

export default new ProductService();