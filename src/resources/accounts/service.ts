import { db } from "@src/db";
import { AccountMembershipsTable, AccountsTable } from "./schema";

export default {
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
