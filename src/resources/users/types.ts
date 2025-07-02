import { InferSelectModel } from "drizzle-orm"
import { UsersTable } from "./schema"

export type User = InferSelectModel<typeof UsersTable>
export type NewUser = Partial<Omit<User, 'id'>> & Pick<User, 'email' | 'name' | 'passwordHash'>
export type UpdateUser = Partial<NewUser> & Pick<User, 'id'>
export type DeleteUser = Pick<User, 'id'>