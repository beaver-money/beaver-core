import { relations } from "drizzle-orm"
import { pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core"
import { AccountMembershipsTable } from "../accounts/schema"
import { createInsertSchema } from "drizzle-zod"

export const UsersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  passwordHash: text('password_hash').notNull(),
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

export const createUserSchema = createInsertSchema(UsersTable)
  .pick({
    email: true,
    name: true,
    passwordHash: true,
  }).strict()

export const updateUserSchema = createUserSchema.partial()