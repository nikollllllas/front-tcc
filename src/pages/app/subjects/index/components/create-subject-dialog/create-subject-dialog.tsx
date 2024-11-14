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
import { CreateSubjectForm } from "./create-subject-form"

export const CreateSubjectDialog = () => {
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
          Criar Matéria
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:border-gray-800 max-h-dvh max-w-3xl overflow-auto">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-xl font-medium">
            Criar Matéria
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <CreateSubjectForm handleDialogVisibility={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
