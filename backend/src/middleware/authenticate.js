import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/verifyToken.js";

export async function authenticateMiddleware(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    throw new jwt.JsonWebTokenError('token is not exists');
  }

  const token =  authorizationHeader.split(' ')[1];
  
  if (!token) {
    throw new jwt.JsonWebTokenError('token is not exists');
  }

  try {
    await verifyToken(token);
    next();
  } catch (err) {
    next(err);
  }
}