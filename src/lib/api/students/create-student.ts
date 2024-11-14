import { api } from "@/lib/api/api"

type CreateStudent = {
  cpf: string
  academicalRegister: string
  name: string
  email: string
  birthDate: string
  courseId: number
  subjects: number[]
}

type CreateStudentResponse = {
  id: number
}

export const createStudent = async (data: CreateStudent) => {
  const { data: result } = await api.post<CreateStudentResponse>(
    "/students",
    data,
    { headers: { token: `${localStorage.getItem("authToken")}` } }
  )
  return result
}
