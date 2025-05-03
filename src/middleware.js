import { NextResponse } from 'next/server'

// Middleware executa em cada requisição
export function middleware(request) {
  // Lê o cookie chamado "token"
  const token = request.cookies.get('token')?.value

  if (!token) {
    if (!request.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }
  }

  // Se estiver na rota /auth e já tiver token, redireciona para /
  if (request.nextUrl.pathname.startsWith('/auth') && token) {
    return NextResponse.redirect(new URL('/admin/empresa', request.url))
  }


  // Senão, deixa seguir normalmente
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/admin/:path*', '/auth'],
}
