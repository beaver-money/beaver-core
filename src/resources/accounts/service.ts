import { db } from "@src/db";
import { and, eq } from "drizzle-orm";
import { AccountMembershipsTable, AccountsTable } from "./schema";
import { AccountRole } from "./types";

export default {
  deleteAccount: (accountId: string) =>
    db.delete(AccountsTable).where(eq(AccountsTable.id, accountId)),

  findMembershipByUserId: (userId: string) =>
    db.query.account_memberships.findMany({
      where: (membership, { eq }) => eq(membership.userId, userId),
    }),

  createAccount: (primaryUserId: string) =>
    db.insert(AccountsTable).values({
      primaryUserId,
    }).returning(),

  addMembership: async (accountId: string, userId: string, role?: AccountRole) => {
    const existing = await db.query.account_memberships.findFirst({
      where: (membership, { eq, and }) =>
        and(eq(membership.accountId, accountId), eq(membership.userId, userId)),
    });
    if (existing) {
      throw new Error("User is already a member of this account");
    }
    return db.insert(AccountMembershipsTable).values({
      accountId,
      userId,
      role: role || "OWNER",
      joinedAt: new Date(),
    });
  },

  removeMembership: (accountId: string, userId: string) =>
    db.delete(AccountMembershipsTable)
      .where(and(eq(AccountMembershipsTable.accountId, accountId), eq(AccountMembershipsTable.userId, userId))),

  findAccountsOwnedByUser: (userId: string) =>
    db.query.accounts.findMany({
      where: (account, { eq }) => eq(account.primaryUserId, userId),
    }),

  findMembershipByAccountAndUser: (accountId: string, userId: string) =>
    db.query.account_memberships.findFirst({
      where: (membership, { eq, and }) => and(eq(membership.accountId, accountId), eq(membership.userId, userId)),
    }),
};
