# External API Examples with SSL

This document provides examples of how to call external APIs with SSL/TLS encryption using the Node.js Express application.

## 🔐 SSL/TLS Configuration

The application is configured with secure SSL/TLS settings:

- **SSL Certificate Verification**: Enabled (`rejectUnauthorized: true`)
- **TLS Version**: TLS 1.2 (`TLSv1_2_method`)
- **Timeout**: 10 seconds
- **Request/Response Logging**: Enabled for debugging

## 📡 Available External API Endpoints

### 1. **Random User Data**
Get a random user from JSONPlaceholder API (HTTPS).

```bash
curl http://localhost:3000/api/external/random-user
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Leanne Graham",
    "email": "Sincere@april.biz",
    "phone": "1-770-736-8031 x56442"
  },
  "source": "JSONPlaceholder API"
}
```

### 2. **Multiple Users**
Get multiple users with optional limit.

```bash
curl "http://localhost:3000/api/external/users?limit=3"
```

### 3. **User Posts**
Get posts for a specific user.

```bash
curl http://localhost:3000/api/external/users/1/posts
```

### 4. **Create Post**
Create a new post via external API.

```bash
curl -X POST http://localhost:3000/api/external/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Post",
    "body": "This is the content of my post",
    "userId": 1
  }'
```

### 5. **Weather Data** (Requires API Key)
Get weather information for a city.

```bash
# Get your free API key from: https://openweathermap.org/api
curl "http://localhost:3000/api/external/weather/London?apiKey=YOUR_API_KEY"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "city": "London",
    "country": "GB",
    "temperature": 15.2,
    "description": "light rain",
    "humidity": 87,
    "windSpeed": 3.6
  },
  "source": "OpenWeatherMap API"
}
```

### 6. **Cryptocurrency Prices**
Get current cryptocurrency prices.

```bash
curl http://localhost:3000/api/external/crypto
```

**With specific coins:**
```bash
curl "http://localhost:3000/api/external/crypto?coins=bitcoin,ethereum,cardano"
```

### 7. **Secure Request to Any URL**
Make a secure request to any HTTPS endpoint.

```bash
curl -X POST http://localhost:3000/api/external/secure-request \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://api.github.com/user",
    "method": "GET",
    "headers": {
      "Authorization": "Bearer YOUR_GITHUB_TOKEN"
    }
  }'
```

### 8. **SSL Connection Test**
Test SSL connection to any URL.

```bash
curl "http://localhost:3000/api/external/test-ssl/https://www.google.com"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://www.google.com",
    "status": 200,
    "responseTime": "245ms",
    "sslVerified": true,
    "certificate": {
      "subject": "CN=www.google.com",
      "issuer": "CN=GTS CA 1C3",
      "valid_from": "2023-10-31T00:00:00.000Z",
      "valid_to": "2024-01-23T00:00:00.000Z"
    }
  }
}
```

### 9. **External API Health Check**
Check the health of multiple external APIs.

```bash
curl http://localhost:3000/api/external/health
```

## 🛡️ SSL Security Features

### Certificate Verification
```javascript
// The service automatically verifies SSL certificates
httpsAgent: {
  rejectUnauthorized: true, // Verify SSL certificates
  secureProtocol: 'TLSv1_2_method' // Use TLS 1.2
}
```

### Custom SSL Configuration
```javascript
// You can customize SSL settings per request
const result = await externalApiService.makeSecureRequest(url, {
  verifySSL: false // Disable SSL verification (not recommended for production)
});
```

## 🔧 Error Handling

The service includes comprehensive error handling:

```json
{
  "success": false,
  "error": "Failed to fetch data",
  "details": {
    "code": "ENOTFOUND",
    "status": 404,
    "statusText": "Not Found",
    "message": "getaddrinfo ENOTFOUND api.example.com"
  }
}
```

## 📊 Logging

All external API calls are logged:

```
🌐 Making GET request to: https://jsonplaceholder.typicode.com/users/1
✅ Response received: 200 OK
```

## 🚀 Usage in Your Code

### Basic Usage
```javascript
const externalApiService = require('./services/externalApiService');

// Get random user
const user = await externalApiService.getRandomUser();

// Get weather data
const weather = await externalApiService.getWeatherData('London', 'YOUR_API_KEY');

// Make custom secure request
const result = await externalApiService.makeSecureRequest('https://api.example.com/data', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer token' },
  data: { key: 'value' }
});
```

### Error Handling
```javascript
try {
  const result = await externalApiService.getRandomUser();
  if (result.success) {
    console.log('Data:', result.data);
  } else {
    console.error('Error:', result.error);
  }
} catch (error) {
  console.error('Unexpected error:', error);
}
```

## 🔑 API Keys

Some external APIs require API keys:

1. **OpenWeatherMap**: Get free API key at https://openweathermap.org/api
2. **GitHub**: Create personal access token at https://github.com/settings/tokens
3. **CoinGecko**: Free tier available, no key required

## 🧪 Testing SSL Connections

Test various HTTPS endpoints:

```bash
# Test Google
curl "http://localhost:3000/api/external/test-ssl/https://www.google.com"

# Test GitHub API
curl "http://localhost:3000/api/external/test-ssl/https://api.github.com"

# Test JSONPlaceholder
curl "http://localhost:3000/api/external/test-ssl/https://jsonplaceholder.typicode.com"
```

## 📝 Best Practices

1. **Always use HTTPS** for external API calls
2. **Verify SSL certificates** in production
3. **Set appropriate timeouts** to avoid hanging requests
4. **Handle errors gracefully** with proper error messages
5. **Log requests and responses** for debugging
6. **Use environment variables** for API keys
7. **Implement rate limiting** for external API calls
8. **Cache responses** when appropriate to reduce API calls

## 🔍 Troubleshooting

### Common SSL Issues

1. **Certificate verification failed**
   - Check if the certificate is valid
   - Ensure the server supports TLS 1.2+

2. **Connection timeout**
   - Check network connectivity
   - Verify the URL is correct
   - Increase timeout if needed

3. **DNS resolution failed**
   - Check if the domain exists
   - Verify DNS settings

### Debug Mode
Enable detailed logging by setting:
```bash
NODE_ENV=development npm run dev
```



