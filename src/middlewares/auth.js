const jwt = require("jsonwebtoken");
var JWT_SEC_KEY = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  try {
    //console.log('auth--->',req);
  //  console.log('token-->',req.header("Authorization"));
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Auth Error" });
    const split_token = token.split(" ");
    const bearer_token = split_token[1];
    const decoded = jwt.verify(bearer_token, JWT_SEC_KEY);
    req.userId = decoded._id;
    req.userInfo = decoded;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
