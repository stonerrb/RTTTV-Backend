const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('Authorization');
  
    // Check if the token is missing
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Token missing' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.secretKey);
  
      // Attach the decoded payload to the request for further use
      req.user = decoded;
  
      // Move to the next middleware or route handler
      next();
    } catch (err) {
      // Token verification failed
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
  };
  
  module.exports = {jwtMiddleware};