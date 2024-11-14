import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sleep(milliseconds: number) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export function randIntInterval(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)

  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

type ParseRouteUrlProps = {
  url: string
  keys: string[]
  values: string[]
}

export const getInitials = (name: string | undefined): string => {
  if (!name) return ""

  const parts = name.split(" ")

  if (parts.length > 1) {
    return parts[0][0] + parts[parts.length - 1][0]
  }
  return name.slice(0, 2)
}

export const parseRouteUrl = ({ url, keys, values }: ParseRouteUrlProps) => {
  let parsedUrl = url
  keys?.forEach((key, index) => {
    parsedUrl = parsedUrl.replace(`:${key}`, values?.[index])
  })
  return parsedUrl
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "USD",
})

export const formatCurrency = (amount: number | undefined) => {
  if (!amount) return "-"

  const formattedCurrency = currencyFormatter.format(amount)

  return formattedCurrency
}

export const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
  })

  const formattedDate = formatter.format(new Date(date))

  return formattedDate
}
