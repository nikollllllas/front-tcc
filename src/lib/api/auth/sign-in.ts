import { api } from "../api"

type SignInRequest = {
  id: number
  password: string
}

type SignInResponse = {
  token: string
}

export async function signIn({
  id,
  password,
}: SignInRequest): Promise<SignInResponse> {
  const response = await api.post("/auth/login", {
    id,
    password,
  })

  const token = response.data.token

  return { token }
}
