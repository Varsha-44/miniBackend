const jwt = require('jsonwebtoken');

// Middleware to authenticate requests using JWT
const authenticate = (req, res, next) => {
  // Extract token from Authorization header: "Bearer <token>"
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  // If token is missing, return an error
  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing or invalid.' });
  }

  try {
    // Verify the token using JWT_SECRET (from environment variables)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach decoded user information to the request object for further processing in route handlers
    req.user = decoded;
    
    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    // If token verification fails, return a 401 error
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authenticate;
