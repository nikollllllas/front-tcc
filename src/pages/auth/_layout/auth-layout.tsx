import { Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <div className=" min-h-screen  flex items-center justify-center bg-white">
      <div className="p-6 shadow-2xl rounded-lg">
        <Outlet />
      </div>
    </div>
  )
}
