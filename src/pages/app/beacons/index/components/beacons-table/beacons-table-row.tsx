import { TableCell, TableRow } from "@/components/ui/table"

type Beacon = {
  id: number
  uuid: string
  subjectId: string
  teacherId: string
  teacher: {
    id: number
    cpf: string
    name: string
    email: string
  }
  subject: {
    id: number
    name: string
    description: string
    workload: number
  }
}

type BeaconTableRowProps = {
  beacon: Beacon
}

export const BeaconsTableRow = ({ beacon }: BeaconTableRowProps) => (
  <TableRow
    key={beacon.id}
    className="hover:bg-inherit px-0">
    <TableCell className="font-medium">{beacon.id}</TableCell>
    <TableCell>
      <span className="text-sm font-medium text-black">{beacon.uuid}</span>
    </TableCell>
    <TableCell>
      <span className="text-sm font-medium text-black">
        {beacon.subject.name}
      </span>
    </TableCell>
    <TableCell>
      <span className="text-sm font-medium text-black">
        {beacon.teacher.name}
      </span>
    </TableCell>
  </TableRow>
)
