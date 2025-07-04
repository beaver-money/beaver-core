import { z } from "zod/v4";

export const authSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type AuthInput = z.infer<typeof authSchema>;
