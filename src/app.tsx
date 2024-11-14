import "./global.css"

import { QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"
import { queryClient } from "./lib/query-client"
import { router } from "./routes"
import { MantineProvider } from "@mantine/core"

export function App() {
  return (
    <>
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </MantineProvider>
    </>
  )
}
