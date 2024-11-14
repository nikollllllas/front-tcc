import { api } from "@/lib/api/api"

type CreateTeacher = {
  cpf: string
  name: string
  email: string
  subjects: number[]
}

type CreateTeacherResponse = {
  id: number
}

export const createTeacher = async (data: CreateTeacher) => {
  const { data: result } = await api.post<CreateTeacherResponse>(
    "/teachers",
    data,
    { headers: { token: `${localStorage.getItem("authToken")}` } }
  )
  return result
}
