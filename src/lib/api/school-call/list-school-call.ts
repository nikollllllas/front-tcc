import { api } from "@/lib/api/api"

type SchoolCall = {
  id: number
  uuid: string
  studentId: number
  createdAt: string
}

type GetSchoolCallResponse = SchoolCall[]

export const listSchoolCall = async () => {
  const result = await api.get<GetSchoolCallResponse>(`/school-call`, {
    headers: {
      token: `${localStorage.getItem("authToken")}`,
    },
  })

  return result
}
