import { db } from "@src/db";
import { UsersTable } from "@src/resources/users/schema";
import { NewUser } from "./types";

export const userService = {
  findAll: () => db.query.users.findMany(),
  findById: (id: string) => db.query.users.findFirst({ where: (t, { eq }) => eq(t.id, id) }),
  create: (data: NewUser) => db.insert(UsersTable).values(data).returning(),
}

export default userService;