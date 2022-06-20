const jwt = require('jsonwebtoken');
exports.checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'secret');
        req.userData = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            'message': 'expired token',
            'error': error
        });
    }
}