import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  const role = request.cookies.get('role')?.value
  const id = request.cookies.get('id')?.value
  const pathname = request.nextUrl.pathname

  // Se não tiver token
  if (!token) {
  const pathname = request.nextUrl.pathname;

  // Permitir acesso público à página da empresa
  if (/^\/empresa\/[^/]+$/.test(pathname)) {
    return NextResponse.next();
  }

  // Se for a rota de agendamento
  if (/^\/empresa\/[^/]+\/agendamento/.test(pathname)) {
    const redirectUrl = new URL('/auth', request.url);
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirecionamento padrão
  if (!pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
}


  // Se o usuário está logado e tentando acessar /auth
  if (pathname.startsWith('/auth') && token) {
    const callbackUrl = request.nextUrl.searchParams.get('callbackUrl')

    if (role === 'EMPRESA') {
      return NextResponse.redirect(new URL('/admin/empresa', request.url))
    }

    if (role === 'ATENDENTE') {
      return NextResponse.redirect(new URL('/admin/funcionario', request.url))
    }

    if (role === 'CLIENTE') {
      if (callbackUrl && /^\/empresa\/[^/]+\/agendamento/.test(callbackUrl)) {
        return NextResponse.redirect(new URL(callbackUrl, request.url))
      }
      return NextResponse.redirect(new URL('/admin/cliente', request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/admin/:path*', '/auth', '/empresa/:path*'],
}
