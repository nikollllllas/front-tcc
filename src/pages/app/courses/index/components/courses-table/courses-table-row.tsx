import { TableCell, TableRow } from "@/components/ui/table"

type Course = {
  id: number
  name: string
  description: string
}

type CourseTableRowProps = {
  course: Course
}

export const CoursesTableRow = ({ course }: CourseTableRowProps) => (
  <TableRow
    key={course.id}
    className="hover:bg-inherit px-0">
    <TableCell className="font-medium">{course.id}</TableCell>
    <TableCell>
      <span className="text-sm font-medium text-black">{course.name}</span>
    </TableCell>
    <TableCell>
      <span className="text-sm font-medium text-black">
        {course.description}
      </span>
    </TableCell>
  </TableRow>
)
