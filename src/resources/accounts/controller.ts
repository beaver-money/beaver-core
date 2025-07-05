import { Request, Response } from "express";
import accountService from "./service";
import userService from "../users/service";

export async function createAccount(req: Request, res: Response) {
  const { primaryUserId } = req.body;
  const existingMembership = await accountService.findMembershipByUserId(primaryUserId);
  if (existingMembership) {
    res.status(409).json({ error: "User already has an account or is a member of one." });
    return;
  }

  const [account] = await accountService.createAccount(primaryUserId);
  await accountService.addMembership(account.id, primaryUserId);

  res.status(201).json({ account });
}

export async function deleteAccount(req: Request, res: Response) {
  const { accountId } = req.params;
  const auth0Id = req.auth?.sub;

  if (!accountId || !auth0Id) {
    res.status(400).json({ error: "Missing accountId or userId" });
    return;
  }

  const user = await userService.findByAuth0Id(auth0Id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const membership = await accountService.findMembershipByUserId(user.id);
  if (!membership || membership.accountId !== accountId || membership.role !== "OWNER") {
    res.status(403).json({ error: "Only the OWNER can delete this account." });
    return;
  }

  await accountService.deleteAccount(accountId);
  res.status(204).send();
}
