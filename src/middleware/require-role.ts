import { Request, Response, NextFunction } from "express";
import accountService from "@src/resources/accounts/service";
import userService from "@src/resources/users/service";

/**
 * Middleware to require a user to have a specific role (or one of several roles) in an account.
 * Usage: requireRole("OWNER"), requireRole(["OWNER", "WRITE"])
 *
 * - Looks up the user from req.auth.sub (Auth0 ID)
 * - Looks up the membership for req.params.accountId
 * - If the user does not have the required role, responds 403
 * - Otherwise, calls next()
 */
export function requireRole(requiredRoles: string | string[]) {
  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const auth0Id = req.auth?.sub;
      const accountId = req.params.accountId;
      if (!auth0Id || !accountId) {
        res.status(400).json({ error: "Missing accountId or user authentication" });
        return;
      }
      const user = await userService.findByAuth0Id(auth0Id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      const membership = await accountService.findMembershipByAccountAndUser(accountId, user.id);
      if (!membership || !roles.includes(membership.role)) {
        res.status(403).json({ error: `Requires role: ${roles.join(", ")}` });
        return;
      }
      (req as any).membership = membership;
      next();
    } catch (err) {
      next(err);
    }
  };
}
