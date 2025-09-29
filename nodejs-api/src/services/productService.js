const Product = require('../models/Product');

class ProductService {
  constructor() {
    // In-memory storage (in real app, this would be a database)
    this.products = [
      new Product('1', 'Laptop', 'High-performance laptop for work and gaming', 999.99, 'Electronics', 10),
      new Product('2', 'Smartphone', 'Latest smartphone with advanced features', 699.99, 'Electronics', 25),
      new Product('3', 'Coffee Mug', 'Ceramic coffee mug with company logo', 12.99, 'Accessories', 50),
      new Product('4', 'Wireless Headphones', 'Noise-cancelling wireless headphones', 199.99, 'Electronics', 15),
      new Product('5', 'Desk Lamp', 'LED desk lamp with adjustable brightness', 49.99, 'Furniture', 8)
    ];
  }

  // Get all products
  getAllProducts() {
    return this.products.map(product => product.toJSON());
  }

  // Get product by ID
  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    return product ? product.toJSON() : null;
  }

  // Create new product
  createProduct(productData) {
    // Validate required fields
    if (!productData.name || !productData.price || !productData.category) {
      throw new Error('Name, price, and category are required');
    }

    // Validate price
    if (productData.price < 0) {
      throw new Error('Price must be positive');
    }

    // Validate stock
    if (productData.stock !== undefined && productData.stock < 0) {
      throw new Error('Stock cannot be negative');
    }

    const product = Product.create(productData);
    this.products.push(product);
    return product.toJSON();
  }

  // Update product
  updateProduct(id, updateData) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    // Validate price if being updated
    if (updateData.price !== undefined && updateData.price < 0) {
      throw new Error('Price must be positive');
    }

    // Validate stock if being updated
    if (updateData.stock !== undefined && updateData.stock < 0) {
      throw new Error('Stock cannot be negative');
    }

    this.products[productIndex].update(updateData);
    return this.products[productIndex].toJSON();
  }

  // Delete product
  deleteProduct(id) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    const deletedProduct = this.products[productIndex].toJSON();
    this.products.splice(productIndex, 1);
    return deletedProduct;
  }

  // Search products
  searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return this.products
      .filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      )
      .map(product => product.toJSON());
  }

  // Get products by category
  getProductsByCategory(category) {
    return this.products
      .filter(product => product.category.toLowerCase() === category.toLowerCase())
      .map(product => product.toJSON());
  }

  // Get products in stock
  getProductsInStock() {
    return this.products
      .filter(product => product.isInStock())
      .map(product => product.toJSON());
  }

  // Get products out of stock
  getProductsOutOfStock() {
    return this.products
      .filter(product => !product.isInStock())
      .map(product => product.toJSON());
  }

  // Update product stock
  updateStock(id, quantity) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    if (quantity < 0) {
      // Reduce stock
      const success = this.products[productIndex].reduceStock(Math.abs(quantity));
      if (!success) {
        throw new Error('Insufficient stock');
      }
    } else {
      // Add stock
      this.products[productIndex].addStock(quantity);
    }

    return this.products[productIndex].toJSON();
  }

  // Get products by price range
  getProductsByPriceRange(minPrice, maxPrice) {
    return this.products
      .filter(product => product.price >= minPrice && product.price <= maxPrice)
      .map(product => product.toJSON());
  }
}

module.exports = new ProductService();
