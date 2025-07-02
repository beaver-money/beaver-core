import { validateBody } from "@src/middleware/validate-body";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "@src/resources/users/controller";
import { Router } from "express";
import { createUserSchema, updateUserSchema } from "./schema";

const router = Router();

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', validateBody(createUserSchema), createUser)
router.put('/:id', validateBody(updateUserSchema), updateUser)
router.delete('/:id', deleteUser)

export default router