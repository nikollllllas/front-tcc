import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { TableCell, TableRow } from "@/components/ui/table"

type SchoolCall = {
  id: number
  uuid: string
  studentId: number
  createdAt: string
}
type SchoolCallTableRowProps = {
  schoolCall: SchoolCall
}

export const SchoolCallTableRow = ({ schoolCall }: SchoolCallTableRowProps) => (
  <TableRow
    key={schoolCall.id}
    className="hover:bg-inherit px-0">
    <TableCell className="font-medium">{schoolCall.id}</TableCell>
    <TableCell>
      <span className="text-sm font-medium text-black">{schoolCall.uuid}</span>
    </TableCell>
    <TableCell>
      <span className="text-sm font-medium text-black">
        {schoolCall.studentId}
      </span>
    </TableCell>
    <TableCell>
      <span className="font-medium text-muted-foreground">
        {format(schoolCall.createdAt, "dd MMMM yyyy, HH:mm", {
          locale: ptBR,
        })}
      </span>
    </TableCell>
  </TableRow>
)
