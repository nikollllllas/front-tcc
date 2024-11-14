import axios, { isAxiosError } from "axios"
import { toast } from "sonner"

import { routes } from "../constants/routes"
import { ApiError } from "./error"
import { sleep, randIntInterval } from "@/hooks/utils"
import { env } from "@/env"

const api = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
})

api.interceptors.request.use(
  async (config) => {
    if (env.VITE_API_ENABLE_DELAY) {
      await sleep(randIntInterval(600, 2400))
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!isAxiosError(error)) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401) {
      handleUnauthorized()
    } else if (error.response?.status === 403) {
      handleForbidden()
    }

    const status = error.response?.status || 0
    const code = error.response?.data?.error?.code || 0
    const message =
      error.response?.data?.error?.message ||
      "Erro ao realizar requisição à API."
    const details = error.response?.data?.error?.details

    return Promise.reject(new ApiError(message, status, code, details))
  }
)

function handleUnauthorized() {
  const url = new URL(window.location.href)
  const fallbackPath = encodeURIComponent(`${url.pathname}${url.search}`)
  const signInPath =
    fallbackPath === encodeURIComponent(routes.HOME) ||
    fallbackPath === encodeURIComponent(routes.SIGN_IN)
      ? routes.SIGN_IN
      : `${routes.SIGN_IN}?fallback=${fallbackPath}`

  window.location.href = signInPath
}

function handleForbidden() {
  toast.error(
    "Ops! Parece que você não possui permissão para executar esta ação."
  )
}

export { api, handleUnauthorized }
