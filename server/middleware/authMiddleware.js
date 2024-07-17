const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.AuthToken || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.redirect('/auth/login');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.redirect('/auth/login');
        }
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
