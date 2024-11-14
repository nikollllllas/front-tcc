import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { z } from "zod"

import { Pagination } from "@/components/shared/pagination"
import { CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

import { StudentsTableHeader } from "./students-table-header"
import { StudentsTableRow } from "./students-table-row"
import { listStudents } from "@/lib/api/students/list-students"

export const StudentsTable = () => {
  const [searchParams] = useSearchParams()

  const page = z.coerce.number().parse(searchParams.get("page") ?? "1")
  const term = z.coerce.string().parse(searchParams.get("term") ?? "")

  const studentsQuery = useQuery({
    queryKey: ["list-students", page, term],
    queryFn: () => listStudents(),
  })

  return (
    <div>
      <Table>
        <StudentsTableHeader />
        <TableBody>
          {(studentsQuery.isLoading || !studentsQuery.data) && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-20 w-full items-center justify-center text-center">
                {studentsQuery.isLoading ? (
                  <Loader2 className="inline-block h-5 w-5 animate-spin text-muted" />
                ) : (
                  "Nenhum registro encontrado."
                )}
              </TableCell>
            </TableRow>
          )}

          {studentsQuery.data &&
            studentsQuery.data.data.map((student) => (
              <>
                <StudentsTableRow
                  student={student}
                  key={student.id}
                />
              </>
            ))}
        </TableBody>
      </Table>

      {studentsQuery.data && (
        <CardFooter>
{/*           <Pagination
            currentPage={studentsQuery.data.current_page}
            total={studentsQuery.data.total}
            perPage={studentsQuery.data.per_page}
            from={studentsQuery.data.from}
            to={studentsQuery.data.to}
            showPerPageSelect={false}
          /> */}
        </CardFooter>
      )}
    </div>
  )
}
