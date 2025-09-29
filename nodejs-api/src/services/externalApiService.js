const axios = require('axios');

class ExternalApiService {
  constructor() {
    // Configure axios with SSL settings
    this.httpClient = axios.create({
      timeout: 10000, // 10 seconds timeout
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'NodeJS-Express-API/1.0.0'
      },
      // SSL/TLS configuration
      httpsAgent: {
        rejectUnauthorized: true, // Verify SSL certificates
        secureProtocol: 'TLSv1_2_method' // Use TLS 1.2
      }
    });

    // Add request interceptor for logging
    this.httpClient.interceptors.request.use(
      (config) => {
        console.log(`🌐 Making ${config.method.toUpperCase()} request to: ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ Request error:', error.message);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for logging
    this.httpClient.interceptors.response.use(
      (response) => {
        console.log(`✅ Response received: ${response.status} ${response.statusText}`);
        return response;
      },
      (error) => {
        console.error('❌ Response error:', error.response?.status, error.message);
        return Promise.reject(error);
      }
    );
  }

  // Example 1: Get random user data from JSONPlaceholder (HTTPS)
  async getRandomUser() {
    try {
      const response = await this.httpClient.get('https://jsonplaceholder.typicode.com/users/1');
      return {
        success: true,
        data: response.data,
        source: 'JSONPlaceholder API'
      };
    } catch (error) {
      return this.handleError(error, 'Failed to fetch random user');
    }
  }

  // Example 2: Get multiple users with error handling
  async getUsers(limit = 5) {
    try {
      const response = await this.httpClient.get(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
      return {
        success: true,
        data: response.data,
        count: response.data.length,
        source: 'JSONPlaceholder API'
      };
    } catch (error) {
      return this.handleError(error, 'Failed to fetch users');
    }
  }

  // Example 3: Get posts for a specific user
  async getUserPosts(userId) {
    try {
      const response = await this.httpClient.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      return {
        success: true,
        data: response.data,
        count: response.data.length,
        userId: userId,
        source: 'JSONPlaceholder API'
      };
    } catch (error) {
      return this.handleError(error, `Failed to fetch posts for user ${userId}`);
    }
  }

  // Example 4: Create a new post (POST request with SSL)
  async createPost(postData) {
    try {
      const response = await this.httpClient.post('https://jsonplaceholder.typicode.com/posts', postData);
      return {
        success: true,
        data: response.data,
        source: 'JSONPlaceholder API'
      };
    } catch (error) {
      return this.handleError(error, 'Failed to create post');
    }
  }

  // Example 5: Get weather data from OpenWeatherMap (requires API key)
  async getWeatherData(city, apiKey) {
    try {
      if (!apiKey) {
        throw new Error('API key is required for weather data');
      }

      const response = await this.httpClient.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      
      return {
        success: true,
        data: {
          city: response.data.name,
          country: response.data.sys.country,
          temperature: response.data.main.temp,
          description: response.data.weather[0].description,
          humidity: response.data.main.humidity,
          windSpeed: response.data.wind.speed
        },
        source: 'OpenWeatherMap API'
      };
    } catch (error) {
      return this.handleError(error, `Failed to fetch weather data for ${city}`);
    }
  }

  // Example 6: Get cryptocurrency prices (CoinGecko API)
  async getCryptoPrices(coinIds = ['bitcoin', 'ethereum']) {
    try {
      const ids = Array.isArray(coinIds) ? coinIds.join(',') : coinIds;
      const response = await this.httpClient.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );
      
      return {
        success: true,
        data: response.data,
        source: 'CoinGecko API'
      };
    } catch (error) {
      return this.handleError(error, 'Failed to fetch cryptocurrency prices');
    }
  }

  // Example 7: Make request with custom headers and SSL verification
  async makeSecureRequest(url, options = {}) {
    try {
      const config = {
        url,
        method: options.method || 'GET',
        headers: {
          ...this.httpClient.defaults.headers,
          ...options.headers
        },
        data: options.data,
        params: options.params,
        // Override SSL settings if needed
        httpsAgent: options.verifySSL !== false ? this.httpClient.defaults.httpsAgent : false
      };

      const response = await this.httpClient(config);
      return {
        success: true,
        data: response.data,
        status: response.status,
        headers: response.headers
      };
    } catch (error) {
      return this.handleError(error, 'Failed to make secure request');
    }
  }

  // Example 8: Test SSL connection to a specific endpoint
  async testSSLConnection(url) {
    try {
      const startTime = Date.now();
      const response = await this.httpClient.get(url);
      const endTime = Date.now();
      
      return {
        success: true,
        data: {
          url: url,
          status: response.status,
          responseTime: `${endTime - startTime}ms`,
          sslVerified: true,
          certificate: response.request.res.socket.getPeerCertificate ? 
            response.request.res.socket.getPeerCertificate() : 'Certificate info not available'
        }
      };
    } catch (error) {
      return this.handleError(error, `Failed to test SSL connection to ${url}`);
    }
  }

  // Error handling helper
  handleError(error, message) {
    console.error('External API Error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url
    });

    return {
      success: false,
      error: message,
      details: {
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.message
      }
    };
  }

  // Health check for external APIs
  async healthCheck() {
    const results = [];
    
    // Test multiple endpoints
    const endpoints = [
      'https://jsonplaceholder.typicode.com/users/1',
      'https://api.github.com',
      'https://httpbin.org/get'
    ];

    for (const endpoint of endpoints) {
      try {
        const startTime = Date.now();
        await this.httpClient.get(endpoint);
        const endTime = Date.now();
        
        results.push({
          endpoint,
          status: 'healthy',
          responseTime: `${endTime - startTime}ms`
        });
      } catch (error) {
        results.push({
          endpoint,
          status: 'unhealthy',
          error: error.message
        });
      }
    }

    return {
      success: true,
      data: results,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = new ExternalApiService();



