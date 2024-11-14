import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { TableCell, TableRow } from "@/components/ui/table"

type Student = {
  id: number
  cpf: string
  academicalRegister: string
  name: string
  email: string
  birthDate: string
  createdAt: string
  updatedAt: string
}
type StudentTableRowProps = {
  student: Student
}

export const StudentsTableRow = ({ student }: StudentTableRowProps) => (
  <TableRow
    key={student.id}
    className="hover:bg-inherit px-0">
    <TableCell className="font-medium">{student.id}</TableCell>
    <TableCell>
      <span className="text-sm font-medium text-black">
        {student.academicalRegister}
      </span>
    </TableCell>
    <TableCell>
      <span className="text-sm font-medium text-black">{student.name}</span>
    </TableCell>
    <TableCell>
      <span className="text-sm font-medium text-black">
        {student.birthDate}
      </span>
    </TableCell>
    <TableCell>
      <span className="font-medium text-muted-foreground">
        {format(student.createdAt, "dd MMMM yyyy, HH:mm", {
          locale: ptBR,
        })}
      </span>
    </TableCell>
  </TableRow>
)
