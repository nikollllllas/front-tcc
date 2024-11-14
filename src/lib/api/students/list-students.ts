import { api } from "@/lib/api/api"

type Student = {
  id: number
  cpf: string
  academicalRegister: string
  name: string
  email: string
  birthDate: string
  createdAt: string
  updatedAt: string
}

type GetStudentResponse = Student[]

export const listStudents = async () => {
  /*   const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
    term,
  }) */

  const result = await api.get<GetStudentResponse>(
    /* `/companies?${queryParams.toString()}` */
    `/students`,
    {
      headers: {
        token: `${localStorage.getItem("authToken")}`,
      },
    }
  )

  return result
}
