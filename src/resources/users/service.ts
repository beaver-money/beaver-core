import { db } from "@src/db";
import { UsersTable } from "@src/resources/users/schema";
import { eq } from "drizzle-orm";
import { CreateUserInput, UpdateUserInput, User } from "./types";

export function sanitize(user: User | undefined): Omit<User, 'password'> {
  if (!user) return undefined as any;
  const { password, ...rest } = user
  return rest
}

export default {
  findAll: () => db.query.users.findMany(),
  findById: (id: string) => db.query.users.findFirst({ where: (user, { eq }) => eq(user.id, id) }),
  findByEmail: (email: string) => db.query.users.findFirst({ where: (user, { eq }) => eq(user.email, email) }),
  create: (data: CreateUserInput) => db.insert(UsersTable).values(data).returning(),
  update: (id: string, data: UpdateUserInput) => db.update(UsersTable).set(data).where(eq(UsersTable.id, id)).returning(),
  delete: (id: string) => db.delete(UsersTable).where(eq(UsersTable.id, id)).returning(),
}