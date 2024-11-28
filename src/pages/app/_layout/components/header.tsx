
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function Header(props: React.HTMLAttributes<HTMLDivElement>) {
  const { state } = useSidebar()
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
        )}></div>
    </header>
  )
}
