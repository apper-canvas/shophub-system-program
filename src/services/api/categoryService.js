import categoriesData from "../mockData/categories.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CategoryService {
  constructor() {
    this.categories = [...categoriesData];
  }

  async getAll() {
    await delay(200);
    return [...this.categories];
  }

  async getById(id) {
    await delay(150);
    const category = this.categories.find(c => c.Id === parseInt(id));
    if (!category) {
      throw new Error("Category not found");
    }
    return { ...category };
  }

  async getMainCategories() {
    await delay(200);
    return this.categories.filter(c => c.parentId === null).map(c => ({ ...c }));
  }

  async getSubcategories(parentId) {
    await delay(200);
    return this.categories.filter(c => c.parentId === parseInt(parentId)).map(c => ({ ...c }));
  }

  async getCategoryTree() {
    await delay(250);
    const main = this.categories.filter(c => c.parentId === null);
    return main.map(parent => ({
      ...parent,
      subcategories: this.categories.filter(c => c.parentId === parent.Id)
    }));
  }
}

export default new CategoryService();