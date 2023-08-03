import { z } from 'zod'

export const signInScheme = z.object({
  email: z.string().email().default(''),
  password: z.string().min(3).default(''),
  rememberMe: z.boolean().default(false),
})
