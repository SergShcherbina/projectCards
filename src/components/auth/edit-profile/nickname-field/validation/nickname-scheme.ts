import { z } from 'zod'

export const nicknameScheme = z.object({
  nickname: z.string().trim().min(2).nonempty(),
})
