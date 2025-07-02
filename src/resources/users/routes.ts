import { createUser, getUserById, getUsers } from "@src/resources/users/controller";
import { Router } from "express";

const router = Router();

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)

export default router