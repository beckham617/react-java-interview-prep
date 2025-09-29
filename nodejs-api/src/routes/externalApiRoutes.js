const express = require('express');
const externalApiController = require('../controllers/externalApiController');

const router = express.Router();

// GET /api/external/random-user - Get random user from external API
router.get('/random-user', externalApiController.getRandomUser);

// GET /api/external/users - Get multiple users from external API
router.get('/users', externalApiController.getUsers);

// GET /api/external/users/:userId/posts - Get posts for a specific user
router.get('/users/:userId/posts', externalApiController.getUserPosts);

// POST /api/external/posts - Create a new post via external API
router.post('/posts', externalApiController.createPost);

// GET /api/external/weather/:city - Get weather data (requires API key)
router.get('/weather/:city', externalApiController.getWeather);

// GET /api/external/crypto - Get cryptocurrency prices
router.get('/crypto', externalApiController.getCryptoPrices);

// POST /api/external/secure-request - Make a secure request to any URL
router.post('/secure-request', externalApiController.makeSecureRequest);

// GET /api/external/test-ssl/:url - Test SSL connection to a URL
router.get('/test-ssl/*', externalApiController.testSSLConnection);

// GET /api/external/health - Health check for external APIs
router.get('/health', externalApiController.healthCheck);

module.exports = router;



