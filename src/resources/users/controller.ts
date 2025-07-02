import userService from "@src/resources/users/service";
import { Request, Response } from "express";
import { CreateUserInput, User } from "./types";

export async function getUsers(req: Request, res: Response) {
  try {
    const allUsers: User[] = await userService.findAll();
    res.json(allUsers)
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getUserById(req: Request, res: Response) {
  const userId = req.params.id;
  const user: User | undefined = await userService.findById(userId);
  if (!user) {
    res.status(404).json({ error: "User not found" });
  }
  res.json(user);
}

export async function createUser(req: Request, res: Response) {
  const newUser = req.body
  const [insertedUser] = await userService.create(newUser);
  res.status(201).json(insertedUser);
}

export async function updateUser(req: Request, res: Response) {
  const userId = req.params.id;
  const updatedData = req.body as Partial<CreateUserInput>;
  const [updatedUser] = await userService.update(userId, updatedData);
  if (!updatedUser) {
    res.status(404).json({ error: "User not found" });
  }
  res.json(updatedUser);
}

export async function deleteUser(req: Request, res: Response) {
  const userId = req.params.id;
  const [deletedUser] = await userService.delete(userId);
  if (!deletedUser) {
    res.status(404).json({ error: "User not found" });
  }
  res.json(deletedUser);
}