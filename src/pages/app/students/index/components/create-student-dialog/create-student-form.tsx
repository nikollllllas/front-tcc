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
import { createStudent } from "@/lib/api/students/create-student"
import { Select } from "@/components/shared/select"
import { listCourses } from "@/lib/api/courses/list-courses"
import { useMemo } from "react"
import { listSubjects } from "@/lib/api/subjects/list-subjects"

const createStudentDataFormSchema = z.object({
  cpf: z.string({
    required_error: "Campo obrigatório.",
  }),
  academicalRegister: z.string({
    required_error: "Campo obrigatório.",
  }),
  name: z.string({
    required_error: "Campo obrigatório.",
  }),
  email: z
    .string({ required_error: "Campo obrigatório." })
    .email("Insira um email válido"),
  birthDate: z.string({
    required_error: "Campo obrigatório.",
  }),
  courseId: z.number(),
  subjects: z.array(z.number()),
})

type CreateStudentSchema = z.infer<typeof createStudentDataFormSchema>

type CreateStudentFormProps = {
  handleDialogVisibility: (value: boolean) => void
}

export const CreateStudentForm = ({
  handleDialogVisibility,
}: CreateStudentFormProps) => {
  const queryClient = useQueryClient()

  const form = useForm<CreateStudentSchema>({
    resolver: zodResolver(createStudentDataFormSchema),
    values: {
      cpf: "",
      academicalRegister: "",
      name: "",
      email: "",
      birthDate: "",
      courseId: 0,
      subjects: [],
    },
  })

  const coursesQuery = useQuery({
    queryKey: ["courses"],
    queryFn: listCourses,
  })

  const subjectsQuery = useQuery({
    queryKey: ["subjects"],
    queryFn: listSubjects,
  })

  const courseOptions = useMemo(
    () =>
      coursesQuery.data?.data.map((course) => ({
        label: course.name,
        value: course.id,
      })),
    [coursesQuery.data]
  )

  const subjectOptions = useMemo(
    () =>
      subjectsQuery.data?.data.map((subject) => ({
        label: subject.name,
        value: subject.id,
      })),
    [subjectsQuery.data]
  )

  const handleSubmitStudentData: SubmitHandler<CreateStudentSchema> = async (
    studentData
  ) => {
    try {
      const result = await createStudent(studentData)

      if (result?.id) {
        queryClient.refetchQueries({ queryKey: ["list-students"] })
        handleDialogVisibility(false)
      }

      toast.success("Estudante salvo com sucesso!")
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message)
        return
      }

      toast.error("Erro ao salvar estudante.")
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitStudentData)}
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
                    maxLength={11}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-danger text-xs font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="academicalRegister"
            render={({ field }) => (
              <FormItem>
                <FormLabel>R.A.</FormLabel>
                <FormControl>
                  <Input
                    placeholder="R.A."
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
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Nascimento</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder="Senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-danger text-xs font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="courseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Curso</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={courseOptions?.find(
                      (option) => option.value === field.value
                    )}
                    onChange={(selected) => {
                      field.onChange(
                        selected ? (selected as { value: number }).value : 0
                      )
                    }}
                    placeholder="Selecione um curso"
                    noOptionsMessage="Sem mais opções"
                    options={courseOptions}
                    className="h-10 w-full"
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
                <FormLabel>Materias</FormLabel>
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
