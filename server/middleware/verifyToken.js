import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(createError(401, "You are not authenticated!"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }

    // Ensure the JWT secret is available
    if (!process.env.JWT) {
      return next(createError(500, "JWT secret is not set!"));
    }

    jwt.verify(token, process.env.JWT, (err, decoded) => {
      if (err) {
        return next(createError(401, "Token is not valid!"));
      }
      req.user = decoded;
      next();
    });

  } catch (err) {
    next(createError(500, "Internal Server Error"));
  }
};
