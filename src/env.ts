import { z } from "zod"

const envSchema = z.object({
  VITE_API_BASE_URL: z.string(),
  VITE_API_ENABLE_DELAY: z.string().transform((value) => value === "true"),
})

export const env = envSchema.parse(import.meta.env)
