import { TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const SchoolCallTableHeader = () => (
  <TableHeader className="table-auto">
    <TableRow>
      <TableHead className="w-[100px] font-medium uppercase text-muted-foreground">
        ID
      </TableHead>
      <TableHead className="font-medium uppercase text-muted-foreground">
        UUID
      </TableHead>
      <TableHead className="font-medium uppercase text-muted-foreground">
        ID do Estudante
      </TableHead>
      <TableHead className="font-medium uppercase text-muted-foreground">
        Realizada em
      </TableHead>
    </TableRow>
  </TableHeader>
)
