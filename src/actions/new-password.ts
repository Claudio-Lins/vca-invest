'use server'

import { getPasswordResetTokenByToken } from '@/data/password-reset-token'
import { getUserByEmail } from '@/data/user'
import { prisma } from '@/lib/prisma'
import { NewPasswordSchema } from '@/schemas'
import bcryptjs from 'bcryptjs'
import type { z } from 'zod'

export async function newPassword(
	values: z.infer<typeof NewPasswordSchema>,
	token?: string | null,
) {
	if (!token) {
		return { error: 'No token provided!' }
	}

	const validatedFields = NewPasswordSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'Invalid fields!' }
	}

	const { password } = validatedFields.data

	const existingToken = await getPasswordResetTokenByToken(token)
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

	const hashedPassword = await bcryptjs.hash(password, 10)

	await prisma.user.update({
		where: {
			id: existingUser.id,
		},
		data: {
			password: hashedPassword,
		},
	})

	await prisma.passwordResetToken.delete({
		where: {
			id: existingToken.id,
		},
	})

	return { success: 'Password updated successfully!' }
}
