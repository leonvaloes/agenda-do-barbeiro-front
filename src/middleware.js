import { NextResponse } from 'next/server'

// Middleware executa em cada requisição
export function middleware(request) {
  // Lê o cookie chamado "token"
  const token = request.cookies.get('token')?.value
  const role= request.cookies.get('role')?.value
  const id= request.cookies.get('id')?.value

  // redireciona para /auth caso nao tenha nenhum token ativo
  if (!token) {
    if (!request.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }
  }

  // Se estiver na rota /auth e já tiver token, redireciona para /
  if (request.nextUrl.pathname.startsWith('/auth') && token) {
    if(role === 'EMPRESA')
      return NextResponse.redirect(new URL('/admin/empresa', request.url))
    else if(role === 'ATENDENTE')
      return NextResponse.redirect(new URL('/admin/atendente', request.url))
    else if(role === 'CLIENTE')
      return NextResponse.redirect(new URL('/admin/cliente', request.url))   
  }

  // Senão, deixa seguir normalmente
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/admin/:path*', '/auth'],
}
