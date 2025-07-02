import { db } from "@src/db";
import { UsersTable } from "@src/resources/users/schema";
import { NewUser } from "./types";

export default {
  findAll: () => db.query.users.findMany(),
  findById: (id: string) => db.query.users.findFirst({ where: (user, { eq }) => eq(user.id, id) }),
  create: (data: NewUser) => db.insert(UsersTable).values(data).returning(),
}