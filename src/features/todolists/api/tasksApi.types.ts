import { TaskPriority, TaskStatus } from "@/common/enums"
import * as z from "zod";
import { baseResponseSchema } from "@/common/types"

export const domainTaskSchema = z.object({
  description: z.string().nullable(),
  deadline: z.string().nullable(),
  startDate: z.string().nullable(),
  title: z.string(),
  id: z.string(),
  todoListId: z.string(),
  order: z.int(),
  addedDate: z.iso.datetime({local: true}),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
})

export type DomainTask = z.infer<typeof domainTaskSchema>

export const getTasksResponse = z.object({
  error: z.string().nullable(),
  totalCount: z.number(),
  items: domainTaskSchema.array(),
})

export type GetTasksResponse = z.infer<typeof getTasksResponse>

export const taskPutPostResponse = baseResponseSchema(
  z.object({
    item: domainTaskSchema
  })
)

export type TaskPutPostResponse = z.infer<typeof taskPutPostResponse>


export type UpdateTaskModel = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
