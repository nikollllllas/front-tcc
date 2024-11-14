import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { z } from "zod"

import { CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

import { CoursesTableHeader } from "./courses-table-header"
import { CoursesTableRow } from "./courses-table-row"
import { listCourses } from "@/lib/api/courses/list-courses"

export const CoursesTable = () => {
  const [searchParams] = useSearchParams()

  const page = z.coerce.number().parse(searchParams.get("page") ?? "1")
  const term = z.coerce.string().parse(searchParams.get("term") ?? "")

  const coursesQuery = useQuery({
    queryKey: ["list-courses", page, term],
    queryFn: () => listCourses(),
  })

  return (
    <div>
      <Table>
        <CoursesTableHeader />
        <TableBody>
          {(coursesQuery.isLoading || !coursesQuery.data) && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-20 w-full items-center justify-center text-center">
                {coursesQuery.isLoading ? (
                  <Loader2 className="inline-block h-5 w-5 animate-spin text-muted" />
                ) : (
                  "Nenhum registro encontrado."
                )}
              </TableCell>
            </TableRow>
          )}

          {coursesQuery.data &&
            coursesQuery.data.data.map((course) => (
              <>
                <CoursesTableRow
                  course={course}
                  key={course.id}
                />
              </>
            ))}
        </TableBody>
      </Table>

      {coursesQuery.data && (
        <CardFooter>
{/*           <Pagination
            currentPage={coursesQuery.data.current_page}
            total={coursesQuery.data.total}
            perPage={coursesQuery.data.per_page}
            from={coursesQuery.data.from}
            to={coursesQuery.data.to}
            showPerPageSelect={false}
          /> */}
        </CardFooter>
      )}
    </div>
  )
}
