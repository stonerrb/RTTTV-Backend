const jwt = require('jsonwebtoken');
const User = require('../models/user')

const jwtMiddleware = async(req, res, next) => {
    // Get the token from the request headers
    const token = req.header('Authorization');
  
    // Check if the token is missing
    if (!token) {
      return res.status(401).json({ 
        "status": 0,
        "message": 'Unauthorized - Missing token' 
      });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

      if(!user){
        throw new Error('User may not logged in or User may not exists!!')
      }
  
      // Attach the decoded payload to the request for further use
      req.token = token
      req.user = user
  
      // Move to the next middleware or route handler
      next();
    } catch (err) {
      // Token verification failed
      return res.status(401).json({ 
          "status": 0,
          "message": err
        });
    }
  };
  
  module.exports = {jwtMiddleware};