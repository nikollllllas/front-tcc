import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn } from "@/lib/api/auth/sign-in"
import { ApiError } from "@/lib/api/error"
import { routes } from "@/lib/constants/routes"

import { signInFormSchema } from "./sign-in-schema"

type SignInFormData = z.infer<typeof signInFormSchema>

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { search } = useLocation()

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  })

  const handleSignIn = useCallback(
    async ({ id, password }: SignInFormData) => {
      try {
        const response = await signIn({
          id: Number(id),
          password,
        })

        const { token } = response

        localStorage.setItem("authToken", token)
        const searchParams = new URLSearchParams(search)
        const fallback = searchParams.get("fallback")
        const fallbackPath = fallback ? decodeURIComponent(fallback) : undefined

        navigate(fallbackPath ?? routes.HOME, { replace: true })
      } catch (error) {
        if (error instanceof ApiError) {
          toast.error(error.message)
        } else {
          toast.error("Erro ao realizar autenticação.")
        }
      }
    },
    [navigate, search]
  )

  const setInitialFocus = useCallback(() => {
    form.setFocus("id")
  }, [form.setFocus])

  useEffect(setInitialFocus, [form.setFocus])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSignIn)}
        className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-gray-600">ID</FormLabel>
              <FormControl>
                <Input
                  className="focus:border-secondary-400 focus:bg-secondary-100"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-gray-600">
                Senha
              </FormLabel>
              <FormControl>
                <div className="flex flex-row-reverse">
                  <Input
                    className="focus:border-secondary-400 focus:bg-secondary-100"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <Button
                    className="absolute bg-transparent shadow-none p-2.5"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff
                        className="text-gray-300"
                        size={15}
                      />
                    ) : (
                      <Eye
                        className="text-gray-300"
                        size={15}
                      />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant={"default"}
          type="submit">
          Entrar
        </Button>
      </form>
    </Form>
  )
}
