import { db } from "@src/db";
import { UsersTable } from "@src/resources/users/schema";
import { eq } from "drizzle-orm";
import { CreateUserInput } from "./types";

export default {
  findAll: () => db.query.users.findMany(),
  findById: (id: string) => db.query.users.findFirst({ where: (user, { eq }) => eq(user.id, id) }),
  create: (data: CreateUserInput) => db.insert(UsersTable).values(data).returning(),
  update: (id: string, data: Partial<CreateUserInput>) => db.update(UsersTable).set(data).where(eq(UsersTable.id, id)).returning(),
  delete: (id: string) => db.delete(UsersTable).where(eq(UsersTable.id, id)).returning(),
}