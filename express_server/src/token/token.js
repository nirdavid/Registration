const jwt = require('jsonwebtoken');

module.exports = {
    generateAccessToken: function(username) {
        return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
    },

    authenticateToken: function(req, res, next) {
        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.status(401).json({"success": "false", "msg": 'Missing Token (Unauthorized)'});
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({"success": "false", "msg": 'Wrong Token (Forbidden)'});
            }
            next()
        })
    }
};
