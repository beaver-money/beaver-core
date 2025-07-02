import { createUser, deleteUser, getUserById, getUsers, updateUser } from "@src/resources/users/controller";
import { Router } from "express";

const router = Router();

router.get('/', getUsers)
router.post('/', createUser)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router