import { api } from "@/lib/api/api"

export type SchoolCall = {
  id: number
  proximityUUID: string
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
