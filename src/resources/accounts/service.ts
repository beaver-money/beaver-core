import { db } from "@src/db";
import { AccountMembershipsTable, AccountsTable } from "./schema";
import { eq, and } from "drizzle-orm";

export default {
  deleteAccount: (accountId: string) =>
    db.delete(AccountsTable).where(eq(AccountsTable.id, accountId)),

  findMembershipByUserId: (userId: string) =>
    db.query.account_memberships.findFirst({
      where: (membership, { eq }) => eq(membership.userId, userId),
    }),

  createAccount: (primaryUserId: string) =>
    db.insert(AccountsTable).values({
      primaryUserId,
    }).returning(),

  addMembership: (accountId: string, userId: string) =>
    db.insert(AccountMembershipsTable).values({
      accountId: accountId,
      userId: userId,
      joinedAt: new Date(),
    }),
};
