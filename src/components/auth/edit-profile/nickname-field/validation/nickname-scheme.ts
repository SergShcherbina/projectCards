import { z } from 'zod'

export const nicknameScheme = z.object({
  nickname: z.string().min(2),
})
