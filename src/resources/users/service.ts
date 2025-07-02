import { db } from "@src/db";
import { UsersTable } from "@src/resources/users/schema";
import { NewUser } from "./types";
import { eq } from "drizzle-orm";

export default {
  findAll: () => db.query.users.findMany(),
  findById: (id: string) => db.query.users.findFirst({ where: (user, { eq }) => eq(user.id, id) }),
  create: (data: NewUser) => db.insert(UsersTable).values(data).returning(),
  update: (id: string, data: Partial<NewUser>) => db.update(UsersTable).set(data).where(eq(UsersTable.id, id)).returning(),
  delete: (id: string) => db.delete(UsersTable).where(eq(UsersTable.id, id)).returning(),
}