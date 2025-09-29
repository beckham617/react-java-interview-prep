# Node.js Express RESTful API

A sample Node.js Express application demonstrating RESTful API design with proper project structure, controllers, services, and models.

## 🚀 Features

- **RESTful API Design** - Follows REST principles
- **Modular Architecture** - Controllers, Services, Models separation
- **Input Validation** - Request validation middleware
- **Error Handling** - Comprehensive error handling
- **Security** - Helmet for security headers
- **Logging** - Morgan for HTTP request logging
- **CORS Support** - Cross-origin resource sharing enabled
- **External API Integration** - SSL/TLS secure external API calls
- **SSL/TLS Security** - Certificate verification and secure connections

## 📁 Project Structure

```
nodejs-api/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── userController.js
│   │   └── productController.js
│   ├── services/            # Business logic
│   │   ├── userService.js
│   │   └── productService.js
│   ├── models/              # Data models
│   │   ├── User.js
│   │   └── Product.js
│   ├── routes/              # API routes
│   │   ├── userRoutes.js
│   │   └── productRoutes.js
│   ├── middleware/          # Custom middleware
│   │   └── validation.js
│   └── server.js            # Main server file
├── package.json
└── README.md
```

## 🛠️ Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd nodejs-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Health Check
- **GET** `/health` - Server health status

### Users API
- **GET** `/api/users` - Get all users
  - Query params: `search`, `role`
- **GET** `/api/users/:id` - Get user by ID
- **POST** `/api/users` - Create new user
- **PUT** `/api/users/:id` - Update user
- **DELETE** `/api/users/:id` - Delete user

### Products API
- **GET** `/api/products` - Get all products
  - Query params: `search`, `category`, `inStock`, `minPrice`, `maxPrice`
- **GET** `/api/products/:id` - Get product by ID
- **POST** `/api/products` - Create new product
- **PUT** `/api/products/:id` - Update product
- **DELETE** `/api/products/:id` - Delete product
- **PATCH** `/api/products/:id/stock` - Update product stock

### External APIs (SSL/TLS)
- **GET** `/api/external/random-user` - Get random user from external API
- **GET** `/api/external/users` - Get multiple users from external API
- **GET** `/api/external/users/:userId/posts` - Get user posts
- **POST** `/api/external/posts` - Create post via external API
- **GET** `/api/external/weather/:city` - Get weather data (requires API key)
- **GET** `/api/external/crypto` - Get cryptocurrency prices
- **POST** `/api/external/secure-request` - Make secure request to any URL
- **GET** `/api/external/test-ssl/*` - Test SSL connection
- **GET** `/api/external/health` - Health check for external APIs

## 📝 API Examples

### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "role": "user"
  }'
```

### Create a Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "category": "Electronics",
    "stock": 10
  }'
```

### Search Products
```bash
curl "http://localhost:3000/api/products?search=laptop&inStock=true"
```

### Update Product Stock
```bash
curl -X PATCH http://localhost:3000/api/products/1/stock \
  -H "Content-Type: application/json" \
  -d '{"quantity": -2}'
```

### External API Examples
```bash
# Get random user from external API
curl http://localhost:3000/api/external/random-user

# Get cryptocurrency prices
curl http://localhost:3000/api/external/crypto

# Test SSL connection
curl "http://localhost:3000/api/external/test-ssl/https://www.google.com"

# Get weather data (requires API key)
curl "http://localhost:3000/api/external/weather/London?apiKey=YOUR_API_KEY"
```

## 🔧 Configuration

The server runs on port 3000 by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=8080 npm start
```

## 🏗️ Architecture

### Controllers
- Handle HTTP requests and responses
- Validate input data
- Call appropriate services
- Return formatted responses

### Services
- Contain business logic
- Handle data operations
- Perform validations
- Manage data state

### Models
- Define data structure
- Provide data manipulation methods
- Handle data validation
- Convert to/from JSON

### Routes
- Define API endpoints
- Map URLs to controllers
- Apply middleware
- Handle route parameters

## 🛡️ Security Features

- **Helmet** - Sets security headers
- **CORS** - Configurable cross-origin requests
- **Input Validation** - Request data validation
- **Error Handling** - Secure error responses

## 📊 Sample Data

The application comes with sample data:

### Users
- John Doe (admin)
- Jane Smith (user)
- Bob Johnson (user)

### Products
- Laptop (Electronics)
- Smartphone (Electronics)
- Coffee Mug (Accessories)
- Wireless Headphones (Electronics)
- Desk Lamp (Furniture)

## 🚀 Getting Started

1. Start the server: `npm run dev`
2. Visit: `http://localhost:3000/health`
3. Test the APIs using the examples above
4. Explore the code structure to understand the patterns

## 📚 Learning Points

This project demonstrates:
- **RESTful API design**
- **MVC architecture pattern**
- **Separation of concerns**
- **Error handling strategies**
- **Input validation**
- **Express.js best practices**
- **Node.js project structure**
