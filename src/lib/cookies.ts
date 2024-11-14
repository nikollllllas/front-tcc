import {
  destroyCookie,
  parseCookies,
  setCookie as nookiesSetCookie,
} from "nookies"

const ONE_DAY_IN_SECONDS = 60 * 60 * 24

type SetCookieOptions = {
  maxAge?: number
  path?: string
}

type SetCookieProps = {
  key: string
  value: string
  options?: SetCookieOptions
}

type DeleteCookieProps = {
  key: string
}

type GetCookieProps = {
  key: string
}

export const setCookie = ({ key, value, options }: SetCookieProps) => {
  nookiesSetCookie(undefined, key, value, {
    maxAge: options?.maxAge ?? ONE_DAY_IN_SECONDS,
    path: options?.path ?? "/",
    sameSite: "Strict",
  })
}

export const deleteCookie = ({ key }: DeleteCookieProps) => {
  destroyCookie(undefined, key)
}

export const getCookie = ({ key }: GetCookieProps): undefined | string => {
  const cookies = parseCookies()
  return cookies[key]
}
