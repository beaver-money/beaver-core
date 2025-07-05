import { Request, Response } from "express";
import accountService from "./service";

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
