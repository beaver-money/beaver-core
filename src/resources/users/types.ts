import { InferSelectModel } from "drizzle-orm";
import z from 'zod/v4';
import { createUserSchema, updateUserSchema, UsersTable } from "./schema";

export type User = InferSelectModel<typeof UsersTable>
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>