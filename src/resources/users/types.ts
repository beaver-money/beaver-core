import { InferSelectModel } from "drizzle-orm"
import { createUserSchema, UsersTable } from "./schema"
import z from 'zod/v4';

export type User = InferSelectModel<typeof UsersTable>
export type CreateUserInput = z.infer<typeof createUserSchema>