import { api } from "../api"

type GetProfileResponse = {
  name: string
  surname: string
  email: string
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>("/account/profile")

  return response.data
}
