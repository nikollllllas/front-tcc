import { api } from "@/lib/api/api"

type CreateCourse = {
  name: string
  description: string
  subjects: number[]
  students: number[]
}

type CreateCourseResponse = {
  id: number
}

export const createCourse = async (data: CreateCourse) => {
  const { data: result } = await api.post<CreateCourseResponse>(
    "/courses",
    data,
    { headers: { token: `${localStorage.getItem("authToken")}` } }
  )
  return result
}
