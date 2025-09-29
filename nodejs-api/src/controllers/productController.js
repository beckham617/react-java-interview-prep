const productService = require('../services/productService');

class ProductController {
  // GET /api/products
  async getAllProducts(req, res) {
    try {
      const { search, category, inStock, minPrice, maxPrice } = req.query;
      
      let products;
      
      if (search) {
        products = productService.searchProducts(search);
      } else if (category) {
        products = productService.getProductsByCategory(category);
      } else if (inStock === 'true') {
        products = productService.getProductsInStock();
      } else if (inStock === 'false') {
        products = productService.getProductsOutOfStock();
      } else if (minPrice && maxPrice) {
        products = productService.getProductsByPriceRange(
          parseFloat(minPrice), 
          parseFloat(maxPrice)
        );
      } else {
        products = productService.getAllProducts();
      }

      res.status(200).json({
        success: true,
        data: products,
        count: products.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // GET /api/products/:id
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = productService.getProductById(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }

      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // POST /api/products
  async createProduct(req, res) {
    try {
      const productData = req.body;
      const product = productService.createProduct(productData);

      res.status(201).json({
        success: true,
        data: product,
        message: 'Product created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  // PUT /api/products/:id
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const product = productService.updateProduct(id, updateData);

      res.status(200).json({
        success: true,
        data: product,
        message: 'Product updated successfully'
      });
    } catch (error) {
      const statusCode = error.message === 'Product not found' ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        error: error.message
      });
    }
  }

  // DELETE /api/products/:id
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const product = productService.deleteProduct(id);

      res.status(200).json({
        success: true,
        data: product,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }

  // PATCH /api/products/:id/stock
  async updateStock(req, res) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (quantity === undefined || quantity === null) {
        return res.status(400).json({
          success: false,
          error: 'Quantity is required'
        });
      }

      const product = productService.updateStock(id, quantity);

      res.status(200).json({
        success: true,
        data: product,
        message: 'Stock updated successfully'
      });
    } catch (error) {
      const statusCode = error.message === 'Product not found' ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new ProductController();
