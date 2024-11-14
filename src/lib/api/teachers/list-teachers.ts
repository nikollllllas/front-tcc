import { api } from "@/lib/api/api"

type Teacher = {
  id: number
  cpf: string
  name: string
  email: string
}

type GetTeacherResponse = Teacher[]

export const listTeachers = async () => {
  /*   const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
    term,
  }) */

  const result = await api.get<GetTeacherResponse>(
    /* `/companies?${queryParams.toString()}` */
    `/teachers`,
    {
      headers: {
        token: `${localStorage.getItem("authToken")}`,
      },
    }
  )

  return result
}
