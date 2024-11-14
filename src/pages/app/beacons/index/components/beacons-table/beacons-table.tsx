import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { z } from "zod"

import { CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

import { BeaconsTableHeader } from "./beacons-table-header"
import { BeaconsTableRow } from "./beacons-table-row"
import { listBeacons } from "@/lib/api/beacons/list-beacons"

export const BeaconsTable = () => {
  const [searchParams] = useSearchParams()

  const page = z.coerce.number().parse(searchParams.get("page") ?? "1")
  const term = z.coerce.string().parse(searchParams.get("term") ?? "")

  const beaconsQuery = useQuery({
    queryKey: ["list-beacons", page, term],
    queryFn: () => listBeacons(),
  })

  return (
    <div>
      <Table>
        <BeaconsTableHeader />
        <TableBody>
          {(beaconsQuery.isLoading || !beaconsQuery.data) && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-20 w-full items-center justify-center text-center">
                {beaconsQuery.isLoading ? (
                  <Loader2 className="inline-block h-5 w-5 animate-spin text-muted" />
                ) : (
                  "Nenhum registro encontrado."
                )}
              </TableCell>
            </TableRow>
          )}

          {beaconsQuery.data &&
            beaconsQuery.data.data.map((beacon) => (
              <>
                <BeaconsTableRow
                  beacon={beacon}
                  key={beacon.id}
                />
              </>
            ))}
        </TableBody>
      </Table>

      {beaconsQuery.data && (
        <CardFooter>
{/*           <Pagination
            currentPage={beaconsQuery.data.current_page}
            total={beaconsQuery.data.total}
            perPage={beaconsQuery.data.per_page}
            from={beaconsQuery.data.from}
            to={beaconsQuery.data.to}
            showPerPageSelect={false}
          /> */}
        </CardFooter>
      )}
    </div>
  )
}
