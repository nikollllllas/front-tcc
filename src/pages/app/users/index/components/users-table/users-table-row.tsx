import { TableCell, TableRow } from "@/components/ui/table"

type Users = {
  id: number
  name: string
  email: string
}

type UsersTableRowProps = {
  user: Users
}

export const UsersTableRow = ({ user }: UsersTableRowProps) => (
  <TableRow
    key={user.id}
    className="hover:bg-inherit px-0">
    <TableCell className="font-medium">{user.id}</TableCell>
    <TableCell>
      <span className="text-sm font-medium text-black">{user.name}</span>
    </TableCell>
    <TableCell>
      <span className="font-medium text-muted-foreground">{user.email}</span>
    </TableCell>
  </TableRow>
)
