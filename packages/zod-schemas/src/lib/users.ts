import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string().min(5, "Name should have a minimum of 5 characters."),
    email: z.string().email("Invalid email"),
  })
  .strict();

export type User = z.infer<typeof userSchema>;
