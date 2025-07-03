import userService, { sanitize } from "@src/resources/users/service";
import { Request, Response } from "express";

export async function getUsers(req: Request, res: Response) {
  const allUsers = await userService.findAll();
  res.status(200).json(allUsers.map(sanitize))
}

export async function getUserById(req: Request, res: Response) {
  const user = await userService.findById(req.params.id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.status(200).json(sanitize(user));
}

export async function updateUser(req: Request, res: Response) {
  const [updatedUser] = await userService.update(req.params.id, req.body);
  if (!updatedUser) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.status(200).json(sanitize(updatedUser));
}

export async function deleteUser(req: Request, res: Response) {
  const [deletedUser] = await userService.delete(req.params.id);
  if (!deletedUser) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.status(204).send();
}