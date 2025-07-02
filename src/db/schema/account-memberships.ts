import { relations } from "drizzle-orm"
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core"
import { AccountRoles } from "./account-roles"
import { AccountsTable } from "./accounts"
import { UsersTable } from "./users"

export const AccountMembershipsTable = pgTable('account_memberships', {
    accountId: uuid('account_id').notNull().references(() => AccountsTable.id),
    userId: uuid('user_id').notNull().references(() => UsersTable.id),
    role: AccountRoles('role').default('EDITOR').notNull(),
    invitedAt: timestamp('invited_at').defaultNow().notNull(),
    joinedAt: timestamp('joined_at'),
},
    (table) => [
        primaryKey({
            name: 'pk_account_memberships',
            columns: [table.accountId, table.userId],
        })
    ]
)

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