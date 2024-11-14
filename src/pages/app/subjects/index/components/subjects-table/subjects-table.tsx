import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { z } from "zod"

import { CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

import { SubjectsTableHeader } from "./subjects-table-header"
import { listSubjects } from "@/lib/api/subjects/list-subjects"
import { SubjectsTableRow } from "./students-table-row"

export const SubjectsTable = () => {
  const [searchParams] = useSearchParams()

  const term = z.coerce.string().parse(searchParams.get("term") ?? "")

  const subjectsQuery = useQuery({
    queryKey: ["list-subjects", term],
    queryFn: () => listSubjects(),
  })

  return (
    <div>
      <Table>
        <SubjectsTableHeader />
        <TableBody>
          {(subjectsQuery.isLoading || !subjectsQuery.data) && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-20 w-full items-center justify-center text-center">
                {subjectsQuery.isLoading ? (
                  <Loader2 className="inline-block h-5 w-5 animate-spin text-muted" />
                ) : (
                  "Nenhum registro encontrado."
                )}
              </TableCell>
            </TableRow>
          )}

          {subjectsQuery.data &&
            subjectsQuery.data.data.map((subject) => (
              <>
                <SubjectsTableRow
                  subject={subject}
                  key={subject.id}
                />
              </>
            ))}
        </TableBody>
      </Table>

      {subjectsQuery.data && (
        <CardFooter>
          {/*           <Pagination
            currentPage={subjectsQuery.data.current_page}
            total={subjectsQuery.data.total}
            perPage={subjectsQuery.data.per_page}
            from={subjectsQuery.data.from}
            to={subjectsQuery.data.to}
            showPerPageSelect={false}
          /> */}
        </CardFooter>
      )}
    </div>
  )
}
