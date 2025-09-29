class Product {
  constructor(id, name, description, price, category, stock = 0) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.stock = stock;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  // Static method to create a new product
  static create(productData) {
    const { name, description, price, category, stock } = productData;
    const id = Date.now().toString(); // Simple ID generation
    return new Product(id, name, description, price, category, stock);
  }

  // Method to update product data
  update(updateData) {
    Object.keys(updateData).forEach(key => {
      if (this.hasOwnProperty(key) && key !== 'id' && key !== 'createdAt') {
        this[key] = updateData[key];
      }
    });
    this.updatedAt = new Date().toISOString();
    return this;
  }

  // Method to check if product is in stock
  isInStock() {
    return this.stock > 0;
  }

  // Method to reduce stock
  reduceStock(quantity = 1) {
    if (this.stock >= quantity) {
      this.stock -= quantity;
      this.updatedAt = new Date().toISOString();
      return true;
    }
    return false;
  }

  // Method to add stock
  addStock(quantity) {
    this.stock += quantity;
    this.updatedAt = new Date().toISOString();
    return this;
  }

  // Method to get product as plain object
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      stock: this.stock,
      inStock: this.isInStock(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Product;
