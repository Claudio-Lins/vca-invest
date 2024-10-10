import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	authRoutes,
	publicRoutes,
} from '@/routes'
import NextAuth from 'next-auth'
import authConfig from '../auth.config'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
	const { nextUrl } = req
	const isLoggedIn = !!req.auth

	const isApiAuthRouter = nextUrl.pathname.startsWith(apiAuthPrefix)
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
	const isAuthRoute = authRoutes.includes(nextUrl.pathname)

	if (isApiAuthRouter) {
		return undefined
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
		}
		return undefined
	}

	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(new URL('/auth/login', nextUrl))
	}

	return undefined
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
