const jwt = require('jsonwebtoken');

const verifyAdminToken = (req, res, next) => {
    // Get token from cookies or authorization header
    const token = req.cookies.AdminToken || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' }); // Changed to JSON response
    }

    // Remove 'Bearer ' prefix from the token if present
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' }); // Changed to JSON response
        }
        req.admin = decoded;
        next();
    });
};

module.exports = verifyAdminToken;
