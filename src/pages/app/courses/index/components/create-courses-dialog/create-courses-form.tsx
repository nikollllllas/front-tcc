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
import { createCourse } from "@/lib/api/courses/create-courses"
import { listStudents } from "@/lib/api/students/list-students"

const createCourseDataFormSchema = z.object({
  name: z.string({
    required_error: "Campo obrigatório.",
  }),
  description: z.string({
    required_error: "Campo obrigatório.",
  }),
  subjects: z.array(z.number(), {
    required_error: "Campo obrigatório.",
  }),
  students: z.array(z.number(), {
    required_error: "Campo obrigatório.",
  }),
})

type CreateCourseSchema = z.infer<typeof createCourseDataFormSchema>

type CreateCourseFormProps = {
  handleDialogVisibility: (value: boolean) => void
}

export const CreateCourseForm = ({
  handleDialogVisibility,
}: CreateCourseFormProps) => {
  const queryClient = useQueryClient()

  const form = useForm<CreateCourseSchema>({
    resolver: zodResolver(createCourseDataFormSchema),
    values: {
      name: "",
      description: "",
      subjects: [],
      students: [],
    },
  })

  const subjectsQuery = useQuery({
    queryKey: ["subjects"],
    queryFn: listSubjects,
  })

  const studentsQuery = useQuery({
    queryKey: ["students"],
    queryFn: listStudents,
  })

  const subjectOptions = useMemo(
    () =>
      subjectsQuery.data?.data.map((subject) => ({
        label: subject.name,
        value: subject.id,
      })),
    [subjectsQuery.data]
  )

  const studentsOptions = useMemo(
    () =>
      studentsQuery.data?.data.map((subject) => ({
        label: subject.name,
        value: subject.id,
      })),
    [subjectsQuery.data]
  )

  const handleSubmitCourseData: SubmitHandler<CreateCourseSchema> = async (
    courseData
  ) => {
    try {
      const result = await createCourse(courseData)

      if (result?.id) {
        queryClient.refetchQueries({ queryKey: ["list-courses"] })
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
        onSubmit={form.handleSubmit(handleSubmitCourseData)}
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
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Descrição"
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
                    placeholder="Selecione materias"
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

          <FormField
            control={form.control}
            name="students"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estudantes</FormLabel>
                <FormControl>
                  <Select
                    value={
                      field.value
                        ? studentsOptions?.filter((option) =>
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
                    placeholder="Selecione cursos"
                    noOptionsMessage="Sem mais opções"
                    options={studentsOptions}
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
