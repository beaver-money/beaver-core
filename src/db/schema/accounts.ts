import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { UsersTable } from "./users"
import { relations } from "drizzle-orm"
import { AccountMembershipsTable } from "./account-memberships"

export const AccountsTable = pgTable('accounts', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 150 }).notNull(),
    primaryUserId: uuid('primary_user_id').notNull().references(() => UsersTable.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
})

export const accountsRelations = relations(AccountsTable, ({ many, one }) => ({
    memberships: many(AccountMembershipsTable),
    primaryUser: one(UsersTable, {
        fields: [AccountsTable.primaryUserId],
        references: [UsersTable.id],
    }),
}))