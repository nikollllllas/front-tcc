import { TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const TeachersTableHeader = () => (
  <TableHeader className="table-auto">
    <TableRow>
      <TableHead className="w-[100px] font-medium uppercase text-muted-foreground">
        ID
      </TableHead>
      <TableHead className="font-medium uppercase text-muted-foreground">
        Nome
      </TableHead>
      <TableHead className="font-medium uppercase text-muted-foreground">
        Email
      </TableHead>
    </TableRow>
  </TableHeader>
)
