'use server'

import { getUserByEmail } from '@/data/user'
import { getVerificationTokenByToken } from '@/data/verification-token'
import { prisma } from '@/lib/prisma'

export async function newVerification(token: string) {
	const existingToken = await getVerificationTokenByToken(token)
	if (!existingToken) {
		return { error: 'Token does not exist!' }
	}

	const isExpired = new Date(existingToken.expires) < new Date()
	if (isExpired) {
		return { error: 'Token has expired!' }
	}

	const existingUser = await getUserByEmail(existingToken.email)
	if (!existingUser) {
		return { error: 'Email does not exist!' }
	}

	await prisma.user.update({
		where: {
			id: existingUser.id,
		},
		data: {
			emailVerified: new Date(),
			email: existingToken.email,
		},
	})

	await prisma.verificationToken.delete({
		where: {
			id: existingToken.id,
		},
	})

	return { success: 'Email verified successfully!' }
}
