// Validation middleware for common validations

const validateUser = (req, res, next) => {
  const { name, email, age } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Invalid email format');
    }
  }

  if (!age || isNaN(age) || age < 0 || age > 150) {
    errors.push('Age must be a number between 0 and 150');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  next();
};

const validateProduct = (req, res, next) => {
  const { name, price, category } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!price || isNaN(price) || price < 0) {
    errors.push('Price must be a positive number');
  }

  if (!category || category.trim().length === 0) {
    errors.push('Category is required');
  }

  if (req.body.stock !== undefined && (isNaN(req.body.stock) || req.body.stock < 0)) {
    errors.push('Stock must be a non-negative number');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  next();
};

const validateStockUpdate = (req, res, next) => {
  const { quantity } = req.body;
  const errors = [];

  if (quantity === undefined || quantity === null) {
    errors.push('Quantity is required');
  } else if (isNaN(quantity)) {
    errors.push('Quantity must be a number');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  next();
};

module.exports = {
  validateUser,
  validateProduct,
  validateStockUpdate
};
