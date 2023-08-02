import { z } from 'zod'

export const singUpScheme = z
  .object({
    email: z.string().email().default(''),
    password: z.string().min(3).default(''),
    confirmPassword: z.string().min(3).default(''),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
