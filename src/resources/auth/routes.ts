
import { Router } from "express";

import { signup, login } from "./controller";
import { signupSchema } from "./schema";
import { validateBody } from "../../middleware/validate-body";

const router = Router();

router.post("/signup", validateBody(signupSchema), signup);
router.post("/login", login);

export default router;