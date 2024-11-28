import { Navigate } from "react-router-dom"
import { SignInForm } from "./sign-in-form"
import { routes } from "@/lib/constants/routes"

export function SignInPage() {
  if (!localStorage.getItem("authToken")) {
    return <Navigate to={routes.SIGN_IN} />
  }

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
