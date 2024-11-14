import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ApiError } from "@/lib/api/error"
import { createSubject } from "@/lib/api/subjects/create-subjects"

const createSubjectDataFormSchema = z.object({
  name: z.string({
    required_error: "Campo obrigatório.",
  }),
  description: z.string({
    required_error: "Campo obrigatório.",
  }),
  workload: z.coerce
    .number({
      required_error: "Campo obrigatório.",
    })
    .min(1, "Carga horária deve ser maior que 0."),
})

type CreateSubjectSchema = z.infer<typeof createSubjectDataFormSchema>

type CreateSubjectFormProps = {
  handleDialogVisibility: (value: boolean) => void
}

export const CreateSubjectForm = ({
  handleDialogVisibility,
}: CreateSubjectFormProps) => {
  const queryClient = useQueryClient()

  const form = useForm<CreateSubjectSchema>({
    resolver: zodResolver(createSubjectDataFormSchema),
    values: {
      name: "",
      description: "",
      workload: 0,
    },
  })

  const handleSubmitSubjectData: SubmitHandler<CreateSubjectSchema> = async (
    subjectData
  ) => {
    try {
      const result = await createSubject(subjectData)

      if (result?.id) {
        queryClient.refetchQueries({ queryKey: ["list-subjects"] })
        handleDialogVisibility(false)
      }

      toast.success("Matéria salvo com sucesso!")
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message)
        return
      }

      toast.error("Erro ao salvar matéria.")
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitSubjectData)}
        className="flex w-full flex-col gap-6">
        <main className="grid gap-6 sm:grid-cols-auto-fill">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-danger text-xs font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição.</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Descrição."
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-danger text-xs font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workload"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carga Horária</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="Carga Horária"
                  />
                </FormControl>
                <FormMessage className="text-danger text-xs font-normal" />
              </FormItem>
            )}
          />
        </main>

        <footer className="inline-flex items-center justify-end">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="min-w-20"
            onClick={() => handleDialogVisibility(false)}>
            Cancelar
          </Button>

          <Button
            size="sm"
            className="ml-1 min-w-20"
            isLoading={form.formState.isSubmitting}
            type="submit">
            Salvar
          </Button>
        </footer>
      </form>
    </Form>
  )
}
