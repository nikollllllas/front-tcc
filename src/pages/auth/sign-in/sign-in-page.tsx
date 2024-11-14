import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { getCookie } from "@/lib/cookies"

import { SignInForm } from "./sign-in-form"
import { cookies } from "@/lib/constants/cookies"
import { routes } from "@/lib/constants/routes"

export function SignInPage() {
  const navigate = useNavigate()
  /* 
  const redirectIfHasAuthToken = useCallback(() => {
    const isAuthenticated = getCookie({ key: cookies.AUTH_TOKEN })

    if (isAuthenticated) {
      navigate(routes.HOME, { replace: true })
    }
  }, [navigate])

  useEffect(redirectIfHasAuthToken) */

  return (
    <div className="min-w-[25rem]">
      <div className="mb-10 space-y-2">
        <h2 className="font-manrope text-4xl font-bold text-gray-950">
          Fazer login
        </h2>
        <p className="text text-sm text-gray-700">Faça o login para acessar.</p>
      </div>

      <SignInForm />
    </div>
  )
}
