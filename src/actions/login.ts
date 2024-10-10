'use server'

import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
import { getUserByEmail } from '@/data/user'
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail'
import { prisma } from '@/lib/prisma'
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/tokens'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schemas'
import { AuthError } from 'next-auth'
import type { z } from 'zod'
import { signIn } from '../../auth'

export async function login(values: z.infer<typeof LoginSchema>) {
	const validatedFields = LoginSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' }
	}

	const { email, password, code } = validatedFields.data

	const existingUser = await getUserByEmail(email)
	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Invalid credentials!' }
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email,
		)

		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token,
		)

		return { success: 'Confirmation email sent!' }
	}

	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		if (code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
			if (!twoFactorToken) {
				return { error: 'Invalid code!' }
			}

			if (twoFactorToken.token !== code) {
				return { error: 'Invalid code!' }
			}

			const hasExpired = new Date(twoFactorToken.expires) < new Date()
			if (hasExpired) {
				return { error: 'Code has expired!' }
			}

			await prisma.twoFactorToken.delete({
				where: {
					id: twoFactorToken.id,
				},
			})

			const existingConfirmation = await getTwoFactorConfirmationByUserId(
				existingUser.id,
			)
			if (existingConfirmation) {
				await prisma.twoFactorConfirmation.delete({
					where: {
						id: existingConfirmation.id,
					},
				})
			}

			await prisma.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id,
				},
			})
		} else {
			const twoFactorToken = await generateTwoFactorToken(existingUser.email)
			await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)

			return { twoFactor: true }
		}
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		})
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid Credentials!' }
				default:
					return { error: 'An error occurred while logging in!' }
			}
		}
		throw error
	}
}
