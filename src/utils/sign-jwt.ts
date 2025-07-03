import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!

export default function signJwt(user: { id: string; email: string }) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
}