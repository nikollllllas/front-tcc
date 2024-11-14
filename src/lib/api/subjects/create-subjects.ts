import { api } from "@/lib/api/api"

type CreateSubject = {
  name: string
  description: string
  workload: number
}

type CreateSubjectResponse = {
  id: number
}

export const createSubject = async (data: CreateSubject) => {
  const { data: result } = await api.post<CreateSubjectResponse>(
    "/subjects",
    data,
    { headers: { token: `${localStorage.getItem("authToken")}` } }
  )
  return result
}
