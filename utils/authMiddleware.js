const jwt = require('jsonwebtoken');

// Middleware function to authenticate user requests
module.exports = (req, res, next) => {
  const token = req.header('x-auth-token'); // Retrieve the token from the request header
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'secret'); // Verify the token using the secret key
    req.user = decoded;
    next(); // Call the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
