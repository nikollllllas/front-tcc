import { api } from "@/lib/api/api"

type Course = {
  id: number
  name: string
  description: string
}

type GetCourseResponse = Course[]

export const listCourses = async () => {
  /*   const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
    term,
  }) */

  const result = await api.get<GetCourseResponse>(
    /* `/companies?${queryParams.toString()}` */
    `/courses`,
    {
      headers: {
        token: `${localStorage.getItem("authToken")}`,
      },
    }
  )

  return result
}
