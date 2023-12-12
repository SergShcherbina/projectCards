import { z } from 'zod'
// const MAX_FILE_SIZE = 100000
// const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif']

export const cardSchema = z.object({
  question: z
    .string()
    .nonempty('Enter a question')
    .min(3, 'Question must be at least 3 characters')
    .max(200, 'Question must be at more 200 characters'),
  answer: z
    .string()
    .nonempty('Enter a answer')
    .min(3, 'Answer must be at least 3 characters')
    .max(200, 'Answer must be at more 200 characters'),
  // questionImg: z.union([
  //   z.string(),
  //   z
  //     .instanceof(File)
  //     .refine(file => file?.size <= MAX_FILE_SIZE, `Max file size is 100k.`)
  //     .refine(
  //       file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //       'Only .jpg, .jpeg, .png , .avif .webp formats are supported.'
  //     )
  //     .optional(),
  // ]),
  // answerImg: z.union([
  //   z.string(),
  //   z
  //     .instanceof(File)
  //     .refine(file => file?.size <= MAX_FILE_SIZE, `Max file size is 100k.`)
  //     .refine(
  //       file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //       'Only .jpg, .jpeg, .png , .avif .webp formats are supported.'
  //     )
  //     .optional(),
  // ]),
  questionImg: z.any(),
  answerImg: z.any(),
})
