import { validateBody } from "@src/middleware/validate-body";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "@src/resources/users/controller";
import { Router } from "express";
import { createUserSchema } from "./schema";

const router = Router();

router.get('/', getUsers)
router.post('/', validateBody(createUserSchema), createUser)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router