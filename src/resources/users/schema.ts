import { relations } from "drizzle-orm"
import { pgTable, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"
import { AccountMembershipsTable } from "../accounts/schema"
import { z } from "zod/v4"

export const UsersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 100 }),
  auth0Id: varchar('auth0_id', { length: 128 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
},
  (table) => [
    uniqueIndex('idx_users_email').on(table.email)
  ]
)

export const usersRelations = relations(UsersTable, ({ many }) => ({
  memberships: many(AccountMembershipsTable),
}))

export const updateUserSchema = createInsertSchema(UsersTable)
  .pick({
    email: true,
    name: true,
  })
  .partial()
  .strict()
  .extend({
    email: z.email().optional(),
  });;