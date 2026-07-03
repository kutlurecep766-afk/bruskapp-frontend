import { NextRequest, NextResponse } from 'next/server'

const BRUSKAPP_DOMAINS = ['bruskapp.com', 'www.bruskapp.com', 'localhost:3000']

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  if (!BRUSKAPP_DOMAINS.some(d => host.includes(d))) {
    const domain = host.split(':')[0]
    const originalPath = url.pathname === '/' ? '' : url.pathname
    url.pathname = `/site/${domain}${originalPath}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon|api).*)'],
}
