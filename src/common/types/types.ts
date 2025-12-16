import { z } from "zod"

export const fieldErrorSchema = z.object({
  error: z.string(),
  field: z.string()
})

export type FieldError = z.infer<typeof fieldErrorSchema>


export const baseResponseSchema = <T extends z.ZodTypeAny>(schema: T) => (
    z.object({
    data: schema,
    resultCode: z.number(),
    messages: z.string().array(),
    fieldsErrors: fieldErrorSchema.array()
  })
)

export const defaultResponseSchema = baseResponseSchema(z.object({}))

export type DefaultResponse = z.infer<typeof defaultResponseSchema>

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"






//   export type BaseResponse<T = {}> = {
//   data: T
//   resultCode: number
//   messages: string[]
//   fieldsErrors: FieldError[]
// }
