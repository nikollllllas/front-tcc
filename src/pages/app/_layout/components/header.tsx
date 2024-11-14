import { ArrowRightToLine } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { routes } from "@/lib/constants/routes"
import { cn } from "@/lib/utils"

export function Header(props: React.HTMLAttributes<HTMLDivElement>) {
  const { state, toggleSidebar } = useSidebar()
  const isExpanded = state === "expanded"

  return (
    <header
      {...props}
      className={cn(
        "fixed h-16 w-full lg:z-20",
        isExpanded ? "lg:w-[calc(100vw-15rem)]" : "w-[calc(100vw-3rem)]"
      )}>
      <div
        className={cn(
          "flex h-16 items-center justify-between border-b border-black/5 bg-background/10 backdrop-blur-lg backdrop-filter"
        )}>
        <div className="flex h-16 gap-4">
          <div
            className={cn(
              "flex h-16 items-center justify-center gap-4",
              isExpanded ? "lg:hidden" : ""
            )}>
            <Button
              variant={"ghost"}
              className="mr-2 flex h-8 self-center p-2"
              onClick={toggleSidebar}>
              <ArrowRightToLine className="text-gray-400 size-4 scale-100 stroke-primary transition-all" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
