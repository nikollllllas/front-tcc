import { DialogTrigger } from "@radix-ui/react-dialog"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CreateStudentForm } from "./create-student-form"

export const CreateStudentDialog = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  return (
    <Dialog
      open={dialogIsOpen}
      onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="px-4"
          size="sm">
          Criar Aluno
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:border-gray-800 max-h-dvh max-w-3xl overflow-auto">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-xl font-medium">
            Criar Usuário
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <CreateStudentForm handleDialogVisibility={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
