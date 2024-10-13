// src/middleware.ts

import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	authRoutes,
	protectedRoutes,
	publicRoutes,
} from '@/routes'
import NextAuth from 'next-auth'
import createMiddleware from 'next-intl/middleware'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import authConfig from '../auth.config'
import { routing } from './i18n/routing'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
	const { nextUrl } = req
	const isLoggedIn = !!req.auth
	const pathname = nextUrl.pathname

	const langCookie = cookies().get('NEXT_LOCALE')
	const locale = langCookie ? langCookie.value : 'en'

	const isApiAuthRouter = pathname.startsWith(apiAuthPrefix)
	const isPublicRoute = publicRoutes.includes(pathname)
	const isAuthRoute = authRoutes.includes(pathname)
	const isProtectedRoute = protectedRoutes.includes(pathname)

	// Verificar se o pathname já começa com um locale válido #### OK ####
	const localePattern = /^\/(en|pt|ch|ar)\b/
	if (!localePattern.test(pathname)) {
		return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url))
	}
	//

	// Redirecionar para a página de login se não estiver autenticado e a rota não for pública  #### OK ####
	if (
		!isLoggedIn &&
		protectedRoutes.some((route) => pathname.startsWith(`/${locale}${route}`))
	) {
		return NextResponse.redirect(new URL(`/${locale}/auth/login`, nextUrl))
	}
	//

	// Redirecionar usuários logados para o redirecionamento padrão ao tentar acessar rotas de autenticação
	if (
		isLoggedIn &&
		authRoutes.some((route) => pathname.startsWith(`/${locale}${route}`))
	) {
		return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
	}

	// Executar o middleware de internacionalização para outras rotas
	const intlMiddleware = createMiddleware(routing)
	return intlMiddleware(req)
})

export const config = {
	matcher: [
		'/((?!.+\\.[\\w]+$|_next).*)',
		'/',
		'/(api|trpc)(.*)',
		'/(pt|en|ch|ar)/:path*',
	],
}
