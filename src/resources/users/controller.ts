
import userService, { sanitize } from "@src/resources/users/service";
import { updateAuth0User } from "@src/auth/utils";
import { Request, Response } from "express";

export async function getUserById(req: Request, res: Response) {
  const user = await userService.findById(req.params.id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.status(200).json(sanitize(user));
}

export async function updateUser(req: Request, res: Response) {
  const user = await userService.findById(req.params.id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  try {
    if (user.auth0Id) {
      await updateAuth0User(user.auth0Id, req.body);
    }
    const [updatedUser] = await userService.update(req.params.id, req.body);
    res.status(200).json(sanitize(updatedUser));
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update Auth0 user", details: err.response?.data || err.message });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const [deletedUser] = await userService.delete(req.params.id);
  if (!deletedUser) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.status(204).send();
}