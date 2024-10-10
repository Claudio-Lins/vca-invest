'use server'

import { getUserByEmail } from '@/data/user'
import { sendPasswordResetEmail } from '@/lib/mail'
import { prisma } from '@/lib/prisma'
import { generatePasswordResetToken } from '@/lib/tokens'
import { ResetSchema } from '@/schemas'
import type * as z from 'zod'

export async function reset(values: z.infer<typeof ResetSchema>) {
	const validatedFields = ResetSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Invalid email!' }
	}

	const { email } = validatedFields.data

	const existingUser = await getUserByEmail(values.email)
	if (!existingUser) {
		return { error: 'No user found with that email' }
	}

	const passwordResetToken = await generatePasswordResetToken(email)
	await sendPasswordResetEmail(
		passwordResetToken.email,
		passwordResetToken.token,
	)

	return { success: 'Check your email for a reset link' }
}
