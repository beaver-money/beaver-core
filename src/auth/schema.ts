import { z } from "zod/v4";

export const signupSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type SignupInput = z.infer<typeof signupSchema>;
