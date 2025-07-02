import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { AccountsTable } from "./accounts"
import { UsersTable } from "./users"
import { AccountRoles } from "./account-roles"
import { relations } from "drizzle-orm"

export const AccountMembershipsTable = pgTable('account_memberships', {
    id: uuid('id').primaryKey().defaultRandom(),
    accountId: uuid('account_id')
        .notNull()
        .references(() => AccountsTable.id),
    userId: uuid('user_id')
        .notNull()
        .references(() => UsersTable.id),
    role: AccountRoles('role').default('EDITOR').notNull(),
    invitedAt: timestamp('invited_at').defaultNow().notNull(),
    joinedAt: timestamp('joined_at'),
})

export const accountMembershipsRelations = relations(AccountMembershipsTable, ({ one }) => ({
    account: one(AccountsTable, {
        fields: [AccountMembershipsTable.accountId],
        references: [AccountsTable.id],
    }),
    user: one(UsersTable, {
        fields: [AccountMembershipsTable.userId],
        references: [UsersTable.id],
    }),
}))