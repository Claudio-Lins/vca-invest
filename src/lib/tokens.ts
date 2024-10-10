import { getPasswordResetTokenByEmail } from '@/data/password-reset-token'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
import { getVerificationTokenByEmail } from '@/data/verification-token'
import crypto from 'node:crypto'
import { v4 as uuidv4 } from 'uuid'
import { prisma } from './prisma'

export async function generateTwoFactorToken(email: string) {
	const token = crypto.randomInt(100_000, 1_000_000).toString()
	const expires = new Date(new Date().getTime() + 5 * 60 * 1000) // 5 minutes

	const existingToken = await getTwoFactorTokenByEmail(email)
	if (existingToken) {
		await prisma.twoFactorToken.delete({
			where: {
				id: existingToken.id,
			},
		})
	}

	const twoFactorToken = await prisma.twoFactorToken.create({
		data: {
			email,
			token,
			expires,
		},
	})

	return twoFactorToken
}

export async function generatePasswordResetToken(email: string) {
	const token = uuidv4()
	const expires = new Date(new Date().getTime() + 3600 * 1000) // 1 hour

	const existingToken = await getPasswordResetTokenByEmail(email)
	if (existingToken) {
		await prisma.passwordResetToken.delete({
			where: {
				id: existingToken.id,
			},
		})
	}

	const passwordResetToken = await prisma.passwordResetToken.create({
		data: {
			email,
			token,
			expires,
		},
	})

	return passwordResetToken
}

export async function generateVerificationToken(email: string) {
	const token = uuidv4()
	const expires = new Date(new Date().getTime() + 3600 * 1000) // 1 hour

	const existingToken = await getVerificationTokenByEmail(email)
	if (existingToken) {
		await prisma.verificationToken.delete({
			where: {
				id: existingToken.id,
			},
		})
	}
	const verificationToken = await prisma.verificationToken.create({
		data: {
			email,
			token,
			expires,
		},
	})

	return verificationToken
}
