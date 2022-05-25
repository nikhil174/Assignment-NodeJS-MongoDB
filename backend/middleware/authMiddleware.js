const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModal");

//middleware to protect the routes only authorized user can access
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // check if the token exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get the token from the header
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not auhtorized");
  }
});

module.exports = { protect };
