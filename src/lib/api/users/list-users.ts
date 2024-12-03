import { api } from "@/lib/api/api"

type User = {
  id: number
  name: string
  email: string
}

type GetUserResponse = User[]

export const listUsers = async () => {
  const result = await api.get<GetUserResponse>(`/students/users`, {
    headers: {
      token: `${localStorage.getItem("authToken")}`,
    },
  })

  return result
}
