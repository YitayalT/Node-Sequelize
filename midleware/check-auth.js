const jwt = require('jsonwebtoken');
exports.checkAuth = async (req, res, next) => {
        const token = await req.cookies["access-token"];
        if (!token) {
            res.status(200).json({
                error: 'user not authenticated!'
            });
        }
        // const token = req.headers['authorization'].split(' ')[1];
    //    const token = req.headers["x-access-token"];
    try {
        const decodedToken = await jwt.verify(token, "secret");
        if (decodedToken) {
            req.user = decodedToken;
            console.log(req.user);
              return next();
        }
    } catch (error) {
      return res.status(401).json({
        message: "token not found",
        error: error,
      });
    }
}