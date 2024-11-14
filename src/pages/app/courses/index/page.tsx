import type { ChangeEvent } from "react"
import { useCallback, useRef } from "react"
import { useSearchParams } from "react-router-dom"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CreateCourseDialog } from "./components/create-courses-dialog/create-courses-dialog"
import { CoursesTable } from "./components/courses-table/courses-table"


export const CoursePage = () => {
  const [, setSearchParams] = useSearchParams()

  const timeOutSearch = useRef<NodeJS.Timeout>()

  const handleInputSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      clearTimeout(timeOutSearch.current)
      timeOutSearch.current = setTimeout(() => {
        setSearchParams((state) => {
          state.set("page", "1")
          state.set("term", value)
          return state
        })
      }, 500)
    },
    [setSearchParams]
  )

  return (
    <>
      <div className="mb-4 w-full p-4">
        <Card>
          <CardHeader className="flex flex-col justify-between gap-4 p-4 sm:flex-row">
            <Input
              placeholder="Pesquisar..."
              onChange={(event) => handleInputSearch(event)}
              className="w-full sm:max-w-sm"
            />

            <CreateCourseDialog />
          </CardHeader>
          <CardContent className="space-y-4 p-0">
            <CoursesTable />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
