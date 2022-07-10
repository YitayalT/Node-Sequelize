const jwt = require('jsonwebtoken');
exports.checkAuth = async (req, res, next) => {
   try {
     const token = await req.cookies["access-token"];
     const decodedToken = await jwt.verify(token, "secret");
     if (decodedToken) {
       req.user = decodedToken;
      //  console.log(req.user);
       return next();
     }
   } catch (error) {
      res.status(401).render("login", {
        message: "You are not authenticated!",
        style: "style.css",
      });
    //  return res.status(401).json({
    //    message: "user not authenticated!",
    //    error: error,
    //  });
   }
}
