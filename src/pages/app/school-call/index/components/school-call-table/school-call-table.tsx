import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { z } from "zod"

import { CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { SchoolCallTableHeader } from "./school-call-table-header"
import { listSchoolCall } from "@/lib/api/school-call/list-school-call"
import { SchoolCallTableRow } from "./school-call-table-row"

export const SchoolCallTable = () => {
  const [searchParams] = useSearchParams()

  const page = z.coerce.number().parse(searchParams.get("page") ?? "1")
  const term = z.coerce.string().parse(searchParams.get("term") ?? "")

  const schoolCallQuery = useQuery({
    queryKey: ["list-schoolCall", page, term],
    queryFn: () => listSchoolCall(),
  })

  return (
    <div>
      <Table>
        <SchoolCallTableHeader />
        <TableBody>
          {(schoolCallQuery.isLoading || !schoolCallQuery.data) && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-20 w-full items-center justify-center text-center">
                {schoolCallQuery.isLoading ? (
                  <Loader2 className="inline-block h-5 w-5 animate-spin text-muted" />
                ) : (
                  "Nenhum registro encontrado."
                )}
              </TableCell>
            </TableRow>
          )}

          {schoolCallQuery.data &&
            schoolCallQuery.data.data.map((schoolCall) => (
              <>
                <SchoolCallTableRow
                  schoolCall={schoolCall}
                  key={schoolCall.id}
                />
              </>
            ))}
        </TableBody>
      </Table>

      {schoolCallQuery.data && (
        <CardFooter>
          {/*           <Pagination
            currentPage={schoolCallQuery.data.current_page}
            total={schoolCallQuery.data.total}
            perPage={schoolCallQuery.data.per_page}
            from={schoolCallQuery.data.from}
            to={schoolCallQuery.data.to}
            showPerPageSelect={false}
          /> */}
        </CardFooter>
      )}
    </div>
  )
}
