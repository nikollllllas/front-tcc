import { TableCell, TableRow } from "@/components/ui/table"

type Teacher = {
  id: number
  name: string
  email: string
}

type TeacherTableRowProps = {
  teacher: Teacher
}

export const TeachersTableRow = ({ teacher }: TeacherTableRowProps) => (
  <TableRow
    key={teacher.id}
    className="hover:bg-inherit px-0">
    <TableCell className="font-medium">{teacher.id}</TableCell>
    <TableCell>
      <span className="text-sm font-medium text-black">{teacher.name}</span>
    </TableCell>
    <TableCell>
      <span className="text-sm font-medium text-black">{teacher.email}</span>
    </TableCell>
  </TableRow>
)
