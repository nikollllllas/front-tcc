import { api } from "@/lib/api/api"

type Subject = {
  id: number
  name: string
  description: string
  workload: number
}

type GetSubjectResponse = Subject[]

export const listSubjects = async () => {
  /*   const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
    term,
  }) */

  const result = await api.get<GetSubjectResponse>(
    /* `/companies?${queryParams.toString()}` */
    `/subjects`,
    {
      headers: {
        token: `${localStorage.getItem("authToken")}`,
      },
    }
  )

  return result
}
