const jwt = require('jsonwebtoken');
const User = require('../models/user')

const middleware = async(req, res, next) => {
    // Get the token from the request headers
    const token = req.header('Authorization').replace('Bearer ', '');
  
    // Check if the token is missing
    if (!token) {
      return res.status(401).json({ 
        "status": 0,
        "message": 'Invalid token!' 
      });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

      if(!user){
        return res.status(400).send({
          "code": 0,
          "status": "Error",
          "message": "Session expired!"
      });
      }
  
      // Attach the decoded payload to the request for further use
      req.token = token
      req.user = user
  
      // Move to the next middleware or route handler
      next();
    } catch (err) {
      // Token verification failed
      return res.status(401).json({ 
          "code": 0,
          "status": "Failure",
          "message": err
        });
    }
  };
  
  module.exports = {middleware};