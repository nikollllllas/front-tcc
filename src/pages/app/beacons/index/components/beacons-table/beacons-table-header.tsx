import { TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const BeaconsTableHeader = () => (
  <TableHeader className="table-auto">
    <TableRow>
      <TableHead className="w-[100px] font-medium uppercase text-muted-foreground">
        ID
      </TableHead>
      <TableHead className="font-medium uppercase text-muted-foreground">
        UUID
      </TableHead>
      <TableHead className="font-medium uppercase text-muted-foreground">
        Matéria
      </TableHead>
      <TableHead className="font-medium uppercase text-muted-foreground">
        Professor
      </TableHead>
    </TableRow>
  </TableHeader>
)
