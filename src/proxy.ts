import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['pt', 'en', 'es']
const defaultLocale = 'pt'

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocales = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().substring(0, 2))

    for (const locale of preferredLocales) {
      if (locales.includes(locale)) {
        return locale
      }
    }
  }
  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`

  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|fonts|logo|id_logo|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
}
