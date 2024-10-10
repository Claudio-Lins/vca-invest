import { getAccountByUserId } from '@/data/account'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'
import { getUserById } from '@/data/user'
import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { UserRole } from '@prisma/client'
import NextAuth from 'next-auth'
import authConfig from './auth.config'

async function isOAuthAccount(userId: string): Promise<boolean> {
	const account = await getAccountByUserId(userId)
	return (
		typeof account?.provider === 'string' && account.provider !== 'credentials'
	)
}

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},
	events: {
		async linkAccount({ user }) {
			await prisma.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			})
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			// Allow OAuth accounts to sign in without email verification
			if (account?.provider !== 'credentials') return true

			// Check if user has verified their email
			const existingUser = await getUserById(user.id as string)
			if (!existingUser?.emailVerified) return false

			// TODO: Add 2FA check here
			if (existingUser?.isTwoFactorEnabled) {
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
					existingUser.id,
				)

				if (!twoFactorConfirmation) return false

				await prisma.twoFactorConfirmation.delete({
					where: {
						id: twoFactorConfirmation.id,
					},
				})
			}

			return true
		},

		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub
			}

			if (token.role && session.user) {
				session.user.role = token.role as UserRole
			}

			if (session.user) {
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
			}

			if (session.user) {
				session.user.email = token.email as string
				session.user.email = token.email as string
				session.user.isOAuth = token.isOAuth as boolean
			}

			return session
		},

		async jwt({ token }) {
			if (!token.sub) return token

			const existingUser = await getUserById(token.sub)
			if (!existingUser) return token

			token.isOAuth = await isOAuthAccount(existingUser.id)
			token.name = existingUser.name
			token.email = existingUser.email
			token.role = existingUser.role
			token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

			return token
		},
	},
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	...authConfig,
})
