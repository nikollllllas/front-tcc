import { Outlet } from "react-router-dom"

import { Header } from "./components/header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <AppSidebar />

        <section className="relative flex h-full w-full flex-col transition-all delay-100 duration-200 ease-in-out data-[sidebar-is-opened=false]:ml-[5rem] data-[sidebar-is-opened=true]:ml-[18.25rem]">
          <Header />

          <div className="flex-1 overflow-y-auto mt-20">
            <Outlet />
          </div>
        </section>
      </div>
    </SidebarProvider>
  )
}
