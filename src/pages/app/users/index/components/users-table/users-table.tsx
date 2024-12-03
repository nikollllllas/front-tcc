import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { z } from "zod"

import { CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

import { UsersTableHeader } from "./users-table-header"
import { UsersTableRow } from "./users-table-row"
import { listUsers } from "@/lib/api/users/list-users"

export const UsersTable = () => {
  const [searchParams] = useSearchParams()

  const page = z.coerce.number().parse(searchParams.get("page") ?? "1")
  const term = z.coerce.string().parse(searchParams.get("term") ?? "")

  const usersQuery = useQuery({
    queryKey: ["list-users", page, term],
    queryFn: () => listUsers(),
  })

  return (
    <div>
      <Table>
        <UsersTableHeader />
        <TableBody>
          {(usersQuery.isLoading || !usersQuery.data) && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-20 w-full items-center justify-center text-center">
                {usersQuery.isLoading ? (
                  <Loader2 className="inline-block h-5 w-5 animate-spin text-muted" />
                ) : (
                  "Nenhum registro encontrado."
                )}
              </TableCell>
            </TableRow>
          )}

          {usersQuery.data &&
            usersQuery.data.data.map((user) => (
              <>
                <UsersTableRow
                  user={user}
                  key={user.id}
                />
              </>
            ))}
        </TableBody>
      </Table>

      {usersQuery.data && (
        <CardFooter>
          {/*           <Pagination
            currentPage={usersQuery.data.current_page}
            total={usersQuery.data.total}
            perPage={usersQuery.data.per_page}
            from={usersQuery.data.from}
            to={usersQuery.data.to}
            showPerPageSelect={false}
          /> */}
        </CardFooter>
      )}
    </div>
  )
}
