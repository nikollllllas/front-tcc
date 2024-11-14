import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getProfile } from "@/lib/api/account/get-profile";
import { signOut } from "@/lib/api/auth/sign-out";
import { ApiError } from "@/lib/api/error";
import { cookies } from "@/lib/constants/cookies";
import { routes } from "@/lib/constants/routes";
import { deleteCookie } from "@/lib/cookies";
import { getInitials } from "@/lib/utils";

export function DropdownProfile() {
  const navigate = useNavigate();

  const profileQuery = useQuery({
    queryKey: ["get-profile"],
    queryFn: () => getProfile(),
  });

  const handleSignOut = () => {
    toast.promise(signOut, {
      loading: "Desconectando...",
      success: () => {
        deleteCookie({ key: cookies.AUTH_TOKEN });
        deleteCookie({ key: cookies.SIDEBAR_STATUS });
        navigate(routes.SIGN_IN);
        return "Você foi desconectado com sucesso.";
      },
      error: (error) => {
        if (error instanceof ApiError) {
          return error.message;
        }
        return "Erro ao desconectar do sistema.";
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer flex-row items-center gap-2">
          <button
            type="button"
            className="h-8 w-8 overflow-hidden focus-visible:outline-none"
          >
            <Avatar className="h-full w-full rounded-full border border-gray-200">
              <AvatarImage
                src={profileQuery.data?.avatar?.url}
                alt={`Avatar de ${profileQuery.data?.name} ${profileQuery.data?.surname}`}
              />
              <AvatarFallback className="rounded-sm">
                {getInitials(
                  `${profileQuery.data?.name} ${profileQuery.data?.surname}`,
                )}
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">Minha conta</span>
          </button>
          <p className="text-sm font-semibold">{profileQuery.data?.name}</p>
          <ChevronDown className="text-gray-500" size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[17.25rem]">
        <DropdownMenuLabel className="flex items-center gap-x-3.5">
          <div className="h-12 w-12 overflow-hidden">
            <Avatar className="h-full w-full rounded-sm">
              <AvatarImage
                src={profileQuery.data?.avatar?.url}
                alt={`Avatar de ${profileQuery.data?.name} ${profileQuery.data?.surname}`}
              />
              <AvatarFallback className="rounded-sm">
                {getInitials(
                  `${profileQuery.data?.name} ${profileQuery.data?.surname}`,
                )}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 overflow-hidden">
            <span className="mb-0.5 block truncate text-foreground">
              {profileQuery.data?.name}
            </span>

            <span className="block truncate text-xs font-normal">
              {profileQuery.data?.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-md cursor-pointer text-foreground">
          Minha conta
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-md cursor-pointer text-foreground"
          onClick={handleSignOut}
        >
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
