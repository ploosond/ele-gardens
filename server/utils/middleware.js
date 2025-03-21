import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "./logger.js";

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  } else {
    req.token = null;
  }
  next();
};

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: "Not authorized" });
  }
  try {
    const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "missing token" });
    }

    const user = await User.findById(decodedToken.id).select("-password");
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ error: "Not authorized as admin" });
  }
};

const unknownRequest = (req, res) => {
  return res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error);

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  }

  next(error);
};

export default {
  unknownRequest,
  errorHandler,
  tokenExtractor,
  userExtractor,
  isAdmin,
};
