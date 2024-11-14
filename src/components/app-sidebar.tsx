import * as React from "react"
import {
  AudioWaveform,
  Bolt,
  BookOpen,
  BookPlus,
  Command,
  GalleryVerticalEnd,
  GraduationCap,
  Home,
  Pen,
  Radio,
  School,
} from "lucide-react"

import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { routes } from "@/lib/constants/routes"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  projects: [
    {
      name: "Home",
      url: routes.HOME,
      icon: Home,
    },
    {
      name: "Beacons",
      url: routes.BEACON,
      icon: Bolt,
    },
    {
      name: "Cursos",
      url: routes.COURSE,
      icon: School,
    },
    {
      name: "Chamadas",
      url: routes.SCHOOL_CALL,
      icon: Radio,
    },
    {
      name: "Estudantes",
      url: routes.STUDENT,
      icon: BookOpen,
    },
    {
      name: "Matérias",
      url: routes.SUBJECTS,
      icon: BookPlus,
    },
    {
      name: "Professores",
      url: routes.TEACHER,
      icon: GraduationCap,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}>
      <SidebarHeader>
        <div className="flex justify-center items-center h-16">
          <span className="font-bold text-blue-600 text-xl">
            TCC Atendance APP
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
