import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery, useQueryClient } from "@tanstack/react-query"
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
import { Select } from "@/components/shared/select"
import { useMemo } from "react"
import { listSubjects } from "@/lib/api/subjects/list-subjects"
import { listTeachers } from "@/lib/api/teachers/list-teachers"
import { createTeacher } from "@/lib/api/teachers/create-teacher"

const createTeacherDataFormSchema = z.object({
  cpf: z.string({
    required_error: "Campo obrigatório.",
  }),
  name: z.string({
    required_error: "Campo obrigatório.",
  }),
  email: z.string({
    required_error: "Campo obrigatório.",
  }),
  subjects: z.array(z.number(), {
    required_error: "Campo obrigatório.",
  }),
})

type CreateTeacherSchema = z.infer<typeof createTeacherDataFormSchema>

type CreateTeacherFormProps = {
  handleDialogVisibility: (value: boolean) => void
}

export const CreateTeacherForm = ({
  handleDialogVisibility,
}: CreateTeacherFormProps) => {
  const queryClient = useQueryClient()

  const form = useForm<CreateTeacherSchema>({
    resolver: zodResolver(createTeacherDataFormSchema),
    values: {
      cpf: "",
      name: "",
      email: "",
      subjects: [],
    },
  })

  const subjectsQuery = useQuery({
    queryKey: ["subjects"],
    queryFn: listSubjects,
  })

  const subjectOptions = useMemo(
    () =>
      subjectsQuery.data?.data.map((subject) => ({
        label: subject.name,
        value: subject.id,
      })),
    [subjectsQuery.data]
  )

  const handleSubmitTeacherData: SubmitHandler<CreateTeacherSchema> = async (
    teacherData
  ) => {
    try {
      const result = await createTeacher(teacherData)

      if (result?.id) {
        queryClient.refetchQueries({ queryKey: ["list-teachers"] })
        handleDialogVisibility(false)
      }

      toast.success("Curso salvo com sucesso!")
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message)
        return
      }

      toast.error("Erro ao salvar curso.")
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitTeacherData)}
        className="flex w-full flex-col gap-6">
        <main className="grid gap-6 sm:grid-cols-auto-fill">
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input
                    placeholder="CPF"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-danger text-xs font-normal" />
              </FormItem>
            )}
          />

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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-danger text-xs font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subjects"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matérias</FormLabel>
                <FormControl>
                  <Select
                    value={
                      field.value
                        ? subjectOptions?.filter((option) =>
                            field.value.includes(option.value)
                          )
                        : []
                    }
                    onChange={(selected) => {
                      const selectedValues = selected
                        ? (selected as { value: number }[]).map(
                            (option) => option.value
                          )
                        : []
                      field.onChange(selectedValues)
                    }}
                    placeholder="Selecione matérias"
                    noOptionsMessage="Sem mais opções"
                    options={subjectOptions}
                    className="h-10 w-full"
                    isMulti
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
