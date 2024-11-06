import { z } from "zod";

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(5),
    cPassword: z.string(),
  })
  .refine((data) => data.password === data.cPassword, {
    message: "Password does not match",
    path: ["cPassword"],
  });
