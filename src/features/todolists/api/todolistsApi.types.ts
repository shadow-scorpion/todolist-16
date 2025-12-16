import * as z from "zod";
import { baseResponseSchema } from "@/common/types"

export const todolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.iso.datetime({local: true}),
  order: z.number()
})

export const createTodolistResponse = baseResponseSchema(
  z.object({
    item: todolistSchema
  })
)

export type CreateTodolistResponse = z.infer<typeof createTodolistResponse>

export type Todolist = z.infer<typeof todolistSchema>
