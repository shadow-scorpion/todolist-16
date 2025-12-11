import * as z from "zod";

export type LoginInputs = z.infer<typeof loginSchema>

export const loginSchema = z.object({
  email: z.email(),
  password: z.string()
    .min(4, 'Too short password')
    .max(10, 'Too long password'),
  rememberMe: z.boolean()
})



// const User1 = z.object({
//   email: z.email().max(20),
//   password: z.string().min(3, 'Bro its too small').max(10, 'Made pass less'),
//   rememberMe: z.boolean()
// })
//
// type User = z.infer<typeof User1>
//
// const data: User = User1.parse({email: 'mailo-my@gmail.com', password: 1034, rememberMe: 'true'});
//
// console.log(data)