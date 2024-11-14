import { api } from "@/lib/api/api"

type Beacon = {
  id: number
  uuid: string
  subjectId: string
  teacherId: string
  teacher: {
    id: number
    cpf: string
    name: string
    email: string
  }
  subject: {
    id: number
    name: string
    description: string
    workload: number
  }
}

type GetBeaconResponse = Beacon[]

export const listBeacons = async () => {
  /*   const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
    term,
  }) */

  const result = await api.get<GetBeaconResponse>(
    /* `/companies?${queryParams.toString()}` */
    `/beacons`,
    {
      headers: {
        token: `${localStorage.getItem("authToken")}`,
      },
    }
  )

  console.log(result)

  return result
}
