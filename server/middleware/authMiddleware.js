import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authMiddleware(secretKey, roleKey) {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "Token not provided" });
    }

    try {
      const decoded = jwt.verify(token, secretKey);
      req[roleKey] = decoded.id;
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
  };
}

const adminAuth = authMiddleware(process.env.JWT_SECRET_ADMIN, "adminId");
const userAuth = authMiddleware(process.env.JWT_SECRET_USER, "userId");

export { adminAuth, userAuth };
