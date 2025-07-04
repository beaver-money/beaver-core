import { Router } from "express";

import { validateBody } from "../middleware/validate-body";
import { login, signup } from "./controller";
import { authSchema } from "./schema";

const router = Router();

router.post("/signup", validateBody(authSchema), signup);
router.post("/login", validateBody(authSchema), login);

export default router;