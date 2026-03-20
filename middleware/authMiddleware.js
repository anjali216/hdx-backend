import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      if (!token || token === "null" || token === "undefined") {
        return res.status(401).json({ message: "Not authorized, token missing" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded || !decoded.id) {
        return res.status(401).json({ message: "Not authorized, invalid token payload" });
      }

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found, may have been deleted" });
      }

      return next();

    } catch (error) {
      // Specific JWT error messages
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired, please login again" });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token, please login again" });
      }
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token provided" });
};