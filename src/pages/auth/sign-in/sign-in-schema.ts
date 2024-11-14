import { z } from "zod"

export const signInFormSchema = z.object({
  id: z.string({
    required_error: "Digite seu ID.",
  }),
  password: z
    .string({
      required_error: "Digite sua senha.",
    })
    .min(6, "A senha deve conter no mínimo 6 caracteres."),
})
