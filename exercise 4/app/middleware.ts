import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const auth = request.cookies.get('auth')?.value;
  const role = request.cookies.get('role')?.value;

  // Protect /dashboard
  if (url.pathname.startsWith('/blog') && auth !== 'true') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protect /admin
  if (url.pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}


export const config = { 
    matcher: ['/blog/:path*', '/admin/:path*'],
}