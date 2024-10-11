import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	authRoutes,
	publicRoutes,
} from '@/routes'
import NextAuth from 'next-auth'
import createMiddleware from 'next-intl/middleware'
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

	// Verificar se o pathname já começa com um locale válido
	const localePattern = /^\/(en|pt|ch|ar)\b/
	if (!localePattern.test(pathname)) {
		// Redirecionar para o locale padrão se o pathname não começar com um locale
		return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url))
	}

	// Permitir rotas públicas e rotas de autenticação
	if (
		isApiAuthRouter ||
		isPublicRoute ||
		pathname.startsWith(`/${locale}/auth`)
	) {
		return undefined
	}

	// Redirecionar usuários logados para o redirecionamento padrão ao tentar acessar rotas de autenticação
	if (isAuthRoute && isLoggedIn) {
		return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
	}

	// Redirecionar para a página de login se não estiver autenticado e a rota não for pública
	if (!isLoggedIn && pathname.startsWith(`/${locale}/(protected)`)) {
		return NextResponse.redirect(new URL(`/${locale}/auth/login`, nextUrl))
	}

	// Executar o middleware de internacionalização para outras rotas
	const intlMiddleware = createMiddleware(routing)
	return intlMiddleware(req as unknown as NextRequest)
})

export const config = {
	matcher: [
		'/((?!.+\\.[\\w]+$|_next).*)',
		'/',
		'/(api|trpc)(.*)',
		'/(pt|en|ch|ar)/:path*',
	],
}
