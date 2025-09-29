const externalApiService = require('../services/externalApiService');

class ExternalApiController {
  // GET /api/external/random-user
  async getRandomUser(req, res) {
    try {
      const result = await externalApiService.getRandomUser();
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        details: error.message
      });
    }
  }

  // GET /api/external/users
  async getUsers(req, res) {
    try {
      const { limit = 5 } = req.query;
      const result = await externalApiService.getUsers(parseInt(limit));
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        details: error.message
      });
    }
  }

  // GET /api/external/users/:userId/posts
  async getUserPosts(req, res) {
    try {
      const { userId } = req.params;
      const result = await externalApiService.getUserPosts(userId);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        details: error.message
      });
    }
  }

  // POST /api/external/posts
  async createPost(req, res) {
    try {
      const postData = req.body;
      const result = await externalApiService.createPost(postData);
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        details: error.message
      });
    }
  }

  // GET /api/external/weather/:city
  async getWeather(req, res) {
    try {
      const { city } = req.params;
      const { apiKey } = req.query;
      
      if (!apiKey) {
        return res.status(400).json({
          success: false,
          error: 'API key is required',
          message: 'Add ?apiKey=YOUR_API_KEY to the request'
        });
      }

      const result = await externalApiService.getWeatherData(city, apiKey);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        details: error.message
      });
    }
  }

  // GET /api/external/crypto
  async getCryptoPrices(req, res) {
    try {
      const { coins } = req.query;
      const coinIds = coins ? coins.split(',') : ['bitcoin', 'ethereum'];
      
      const result = await externalApiService.getCryptoPrices(coinIds);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        details: error.message
      });
    }
  }

  // POST /api/external/secure-request
  async makeSecureRequest(req, res) {
    try {
      const { url, method = 'GET', headers = {}, data, params, verifySSL = true } = req.body;
      
      if (!url) {
        return res.status(400).json({
          success: false,
          error: 'URL is required'
        });
      }

      const result = await externalApiService.makeSecureRequest(url, {
        method,
        headers,
        data,
        params,
        verifySSL
      });
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        details: error.message
      });
    }
  }

  // GET /api/external/test-ssl/:url
  async testSSLConnection(req, res) {
    try {
      const { url } = req.params;
      const decodedUrl = decodeURIComponent(url);
      
      const result = await externalApiService.testSSLConnection(decodedUrl);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        details: error.message
      });
    }
  }

  // GET /api/external/health
  async healthCheck(req, res) {
    try {
      const result = await externalApiService.healthCheck();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        details: error.message
      });
    }
  }
}

module.exports = new ExternalApiController();



