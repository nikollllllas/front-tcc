import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { z } from "zod"

import { CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

import { TeachersTableHeader } from "./teachers-table-header"
import { listTeachers } from "@/lib/api/teachers/list-teachers"
import { TeachersTableRow } from "./teachers-table-row"

export const TeachersTable = () => {
  const [searchParams] = useSearchParams()

  const page = z.coerce.number().parse(searchParams.get("page") ?? "1")
  const term = z.coerce.string().parse(searchParams.get("term") ?? "")

  const teachersQuery = useQuery({
    queryKey: ["list-teachers", page, term],
    queryFn: () => listTeachers(),
  })

  return (
    <div>
      <Table>
        <TeachersTableHeader />
        <TableBody>
          {(teachersQuery.isLoading || !teachersQuery.data) && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-20 w-full items-center justify-center text-center">
                {teachersQuery.isLoading ? (
                  <Loader2 className="inline-block h-5 w-5 animate-spin text-muted" />
                ) : (
                  "Nenhum registro encontrado."
                )}
              </TableCell>
            </TableRow>
          )}

          {teachersQuery.data &&
            teachersQuery.data.data.map((teacher) => (
              <>
                <TeachersTableRow
                  teacher={teacher}
                  key={teacher.id}
                />
              </>
            ))}
        </TableBody>
      </Table>

      {teachersQuery.data && (
        <CardFooter>
{/*           <Pagination
            currentPage={teachersQuery.data.current_page}
            total={teachersQuery.data.total}
            perPage={teachersQuery.data.per_page}
            from={teachersQuery.data.from}
            to={teachersQuery.data.to}
            showPerPageSelect={false}
          /> */}
        </CardFooter>
      )}
    </div>
  )
}
