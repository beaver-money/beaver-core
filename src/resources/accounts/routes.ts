import { Router } from "express";
import { createAccount } from "./controller";
import { asyncHandler } from "@utils/async-handler";
import { validateBody } from "@src/middleware/validate-body";
import { createAccountSchema } from "./schema";

const router = Router();

router.post("/", validateBody(createAccountSchema), asyncHandler(createAccount));

export default router;
