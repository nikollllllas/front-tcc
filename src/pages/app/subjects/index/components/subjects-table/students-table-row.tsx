import { TableCell, TableRow } from "@/components/ui/table"

type Subject = {
  id: number
  name: string
  description: string
  workload: number
}
type SubjectTableRowProps = {
  subject: Subject
}

export const SubjectsTableRow = ({ subject }: SubjectTableRowProps) => (
  <TableRow
    key={subject.id}
    className="hover:bg-inherit px-0">
    <TableCell className="font-medium">{subject.id}</TableCell>
    <TableCell className="w-48">
      <span className="text-sm font-medium text-black">{subject.name}</span>
    </TableCell>
    <TableCell>
      <span className="text-sm font-medium text-black line-clamp-1">
        {subject.description}
      </span>
    </TableCell>
    <TableCell>
      <span className="text-sm font-medium text-black">{subject.workload}</span>
    </TableCell>
  </TableRow>
)
