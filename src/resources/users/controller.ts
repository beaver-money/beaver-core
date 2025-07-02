import userService from "@src/resources/users/service";
import { Request, Response } from "express";
import { NewUser, User } from "./types";

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
  try {
    const user: User | undefined = await userService.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createUser(req: Request, res: Response) {
  const newUser = req.body as NewUser
  try {
    const [insertedUser] = await userService.create(newUser);
    res.status(201).json(insertedUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateUser(req: Request, res: Response) {
  const userId = req.params.id;
  const updatedData = req.body as Partial<NewUser>;
  try {
    const [updatedUser] = await userService.update(userId, updatedData);
    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const userId = req.params.id;
  try {
    const [deletedUser] = await userService.delete(userId);
    if (!deletedUser) {
      res.status(404).json({ error: "User not found" });
    }
    res.json(deletedUser);
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}