import { InferSelectModel } from "drizzle-orm";
import z from 'zod/v4';
import { updateUserSchema, UsersTable } from "./schema";

export type User = InferSelectModel<typeof UsersTable>;
export type CreateUserInput = {
  email: string;
  auth0Id: string;
};
export type UpdateUserInput = z.infer<typeof updateUserSchema>;