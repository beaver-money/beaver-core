import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt, { sign } from "jsonwebtoken";
import userService, { sanitize } from "../users/service";
import { User } from "../users/types";
import signJwt from "@src/utils/sign-jwt";
const JWT_SECRET = process.env.JWT_SECRET!

export async function signup(req: Request, res: Response) {
  const { email, password, name } = req.body;
  // Validate email/password here...eventually
  const hashedPassword = await bcrypt.hash(password, 10);
  const [user] = await userService.create({ name, email, password: hashedPassword });
  const token = signJwt(user);
  res.status(201).json({ user: sanitize(user), token });
}

export function login(req: Request, res: Response) {
  const user = req.user as User;
  const token = signJwt(user);
  res.status(200).json({ user: sanitize(user), token });
}