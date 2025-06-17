const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const authHeader = req.get('Authorization') || '';
    let token = null;


    if (authHeader.startsWith('Bearer ')) {
        token = authHeader.slice(7).trim();
    } else if (authHeader) {
        token = authHeader.trim();
    }

    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = auth;