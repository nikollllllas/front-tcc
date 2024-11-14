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
import { CreateCourseForm } from "./create-courses-form"

export const CreateCourseDialog = () => {
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
          Criar Curso
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:border-gray-800 max-h-dvh max-w-3xl overflow-auto">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-xl font-medium">
            Criar Curso
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <CreateCourseForm handleDialogVisibility={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
